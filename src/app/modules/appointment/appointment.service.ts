import AppError from '../../errors/AppError';
import { sendEmail } from '../../utils/sendMail';
import { Availability } from '../availability/availability.mode';
import { Doctor } from '../doctor/doctor.model';
import { Service } from '../service/service.model';
import { Appointment } from './appointment.model';
import { TAppointment, TPopulatedAppointment } from './appointment.type';

const bookAppointment = async (payload: TAppointment, patientId: string) => {
  const { doctorId, serviceId, selectedDate, timeSlot } = payload;
  // Check Doctor
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) throw new AppError(404, 'Doctor not found');

  // Check Service
  const service = await Service.findOne({ _id: serviceId, doctor: doctorId });
  if (!service) throw new AppError(404, 'Service not found for this doctor');

  // Validate Slot availability on that day
  const dayOfWeek = new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
  });
  const availability = await Availability.findOne({
    doctor: doctorId,
    service: serviceId,
    day: dayOfWeek,
    slots: timeSlot,
  });

  if (!availability) {
    throw new AppError(400, 'Time slot is not available for this day');
  }

  // Check if already booked
  const isBooked = await Appointment.findOne({
    doctorId,
    serviceId,
    selectedDate,
    timeSlot,
    status: { $in: ['pending', 'accepted'] },
  });

  if (isBooked) {
    throw new AppError(400, 'This slot is already booked');
  }

  // Create Appointment
  const appointment = await Appointment.create({
    doctorId,
    patientId,
    serviceId,
    selectedDate,
    timeSlot,
    status: 'pending',
  });

  return appointment;
};

// Update Appointment For Doctor
const updateAppointment = async (
  doctorId: string,
  appointmentId: string,
  payload: { status: 'accepted' | 'cancelled' | 'completed' },
) => {
  // Get Doctor Info
  const doctor = await Doctor.findOne({ userId: doctorId });

  //  Find the appointment
  const appointment = await Appointment.findOne({
    _id: appointmentId,
    doctorId: doctor?._id,
  });

  if (!appointment) {
    throw new AppError(404, 'Appointment not found');
  }

  // Prevent changing completed appointment
  if (appointment.status === 'completed') {
    throw new AppError(400, 'Completed appointment cannot be changed');
  }

  // Get the day name from the selectedDate
  const dayOfWeek = new Date(appointment.selectedDate).toLocaleDateString(
    'en-US',
    { weekday: 'long' },
  );

  // Manage slot availability based on new status
  if (payload.status === 'accepted') {
    await Availability.findOneAndUpdate(
      {
        doctor: doctor?._id,
        day: dayOfWeek,
        service: appointment.serviceId,
      },
      {
        $pull: { slots: appointment.timeSlot },
      },
    );
  }

  if (appointment.status === 'accepted' && payload.status === 'cancelled') {
    await Availability.findOneAndUpdate(
      {
        doctor: doctor?._id,
        day: dayOfWeek,
        service: appointment.serviceId,
      },
      {
        $addToSet: { slots: appointment.timeSlot },
      },
    );
  }

  // Update the appointment
  const updatedAppointment = await Appointment.findByIdAndUpdate(
    appointmentId,
    { status: payload.status },
    { new: true },
  )
    .populate({
      path: 'doctorId',
      model: 'Doctor',
      select: 'phone',
      populate: {
        path: 'userId',
        model: 'User',
        select: 'name email',
      },
    })
    .populate({
      path: 'patientId',
      model: 'User',
      select: 'name email',
    })
    .populate({
      path: 'serviceId',
      model: 'Service',
      select: 'title',
    });

  if (!updatedAppointment) {
    throw new AppError(500, 'Failed to update appointment');
  }

  // Define color map
  const statusColorMap: Record<
    'accepted' | 'cancelled' | 'completed' | 'pending',
    string
  > = {
    accepted: '#2ecc71',
    cancelled: '#e74c3c',
    completed: '#3498db',
    pending: '#f39c12',
  };

  //  Extract populated fields
  const doctorName = (updatedAppointment.doctorId as any)?.userId?.name;

  const patient = updatedAppointment.patientId as any;
  const patientName = patient?.name;
  const patientEmail = patient?.email;
  const serviceTitle = (updatedAppointment.serviceId as any)?.title;
  const statusColor = statusColorMap[updatedAppointment.status];

  // Email HTML template
  const emailTemplate = `
  <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Appointment Status Update</title>
</head>
<body style="font-family: Arial, sans-serif; background-color: #f4f6f8; padding: 20px;">
  <table style="max-width: 600px; margin: auto; background-color: #fff; border-radius: 8px; padding: 20px;">
    <tr>
      <td>
        <h2 style="color: #2c3e50;">Hello ${patientName},</h2>
        <p style="font-size: 16px; color: #34495e;">
          Your appointment with <strong>${doctorName}</strong> regarding <strong>${serviceTitle}</strong> 
          scheduled on <strong>${updatedAppointment.selectedDate}</strong> at <strong>${updatedAppointment.timeSlot}</strong> has been
          <strong style="color: ${statusColor};">${updatedAppointment.status}</strong>.
        </p>

        <hr style="margin: 20px 0;"/>

        <p style="font-size: 15px; color: #555;">
          <strong>Appointment Details:</strong><br/>
          <strong>Doctor:</strong> ${doctorName}<br/>
          <strong>Service:</strong> ${serviceTitle}<br/>
          <strong>Date:</strong> ${updatedAppointment.selectedDate}<br/>
          <strong>Time:</strong> ${updatedAppointment.timeSlot}<br/>
          <strong>Status:</strong> <span style="color: ${statusColor};">${updatedAppointment.status}</span>
        </p>

        <p style="font-size: 14px; color: #888;">
          If you have any questions, please feel free to contact us.
        </p>

        <p style="font-size: 15px; color: #2c3e50;">
          Thank you,<br/>
          <strong>Dr. Tech Team</strong>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
`;

  // Send Email
  if (patientEmail) {
    await sendEmail(
      patientEmail,
      'Appointment Status Update',
      'Your appointment status has been updated.',
      emailTemplate,
    );
  }

  return updatedAppointment;
};

export const AppointmentServices = {
  bookAppointment,
  updateAppointment,
};
