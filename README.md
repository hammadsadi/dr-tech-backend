---

```markdown
# 🩺 Doctor–Patient Appointment Management System API

A RESTful API for managing doctor–patient appointments using **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**. This system allows doctors to register and manage services and availability, while patients can browse doctors, view available time slots, and request appointments.

---

## ✅ Features

### 👨‍⚕️ Doctor Module

- Register/Login as Doctor
- Add/Edit/Delete Services
- Set Availability (days + time slots)
- View & Manage Appointments (Accept / Cancel / Complete)

### 👩‍⚕️ Patient Module

- Register/Login as Patient
- View Doctors, Filter by hospital/specialization/service
- View Doctor Details: Services, Availability, Hospital info
- Book Appointments
- Track Appointment Status (Pending, Accepted, Cancelled, Completed)

### 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based Access Control (Doctor / Patient)
- Passwords are securely hashed using **bcryptjs**

---

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB, Mongoose
- **Auth:** JWT + bcryptjs
- **Validation:** Zod
- **Email:** Nodemailer (Mock email on status change)

---

## 📦 API Endpoints

### Auth Routes

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| POST   | /auth/register-doctor  | Register as Doctor    |
| POST   | /auth/register-patient | Register as Patient   |
| POST   | /auth/login            | Login & get JWT Token |

---

### Doctor Routes

| Method | Endpoint                        | Description                 |
| ------ | ------------------------------- | --------------------------- |
| POST   | /doctor/services                | Add Service                 |
| PATCH  | /doctor/services/:id            | Edit Service                |
| DELETE | /doctor/services/:id            | Delete Service              |
| POST   | /doctor/availability            | Set Availability            |
| PATCH  | /doctor/appointments/:id/status | Accept / Cancel / Complete  |
| GET    | /doctor/appointments            | View Appointments by status |

---

### Patient Routes

| Method | Endpoint              | Description                       |
| ------ | --------------------- | --------------------------------- |
| GET    | /doctors              | Browse all Doctors (with filters) |
| GET    | /doctors/:id          | View Doctor Profile               |
| POST   | /appointments         | Book Appointment                  |
| GET    | /patient/appointments | View My Appointments              |

---

## 🗂️ Appointment Workflow

```

Patient books appointment → Status = Pending
↓
Doctor accepts or cancels
↓
If Accepted → Slot removed from availability
If Cancelled → Slot added back to availability
↓
Patient receives email notification with updated status

```

---

## 📁 Project Structure (Simplified)

```

/src
├── app/
├── modules/
│ ├── auth/
│ ├── user/
│ ├── doctor/
│ ├── patient/
│ ├── service/
│ ├── appointment/
│ └── availability/
├── utils/
├── middlewares/
├── config/
├── app.ts
└── server.ts

```

---

## 📌 Sample Data

- Sample Doctors, Services & Availability included in `seed/` folder
- You can import test data via Postman or using your seeder logic

---

## 📬 Postman Collection

A complete Postman collection with authentication and all endpoints:
👉 [Download Postman Collection](#) <!-- replace with actual link -->

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/doctor-appointment-api.git
cd doctor-appointment-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file and configure:

```
PORT=5000
DB_URI=your_mongodb_connection
JWT_ACCESS_TOKEN_SECRET=your_jwt_secret
JWT_ACCESS_EXPIRES_IN=5d
BCRYPT_SALT_ROUNDS=10
NODE_ENV=development
SM_PASS=your_gmail_app_password
```

### 4. Run the Server

```bash
npm run dev
```

---

## 🔗 Live Link (Optional)

If deployed:
[https://dr-tech-api.vercel.app](https://your-live-link.com)

---

## 📅 Deadline

> 📆 **Submission Date:** 29 June, 8:00 PM
> 📧 **Contact:** [shahisrail134@gmail.com](mailto:shahisrail134@gmail.com)

---

## 👏 Bonus Features (Optional)

- Admin Dashboard with statistics (doctors, patients, appointments)
- Image Upload via Cloudinary
- Pagination for Appointment List
- Email Notifications for appointment status updates

---

## ✨ Author

Developed by **Hammad Sadi**

---
