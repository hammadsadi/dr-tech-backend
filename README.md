````markdown
# 🩺 Doctor–Patient Appointment Management System API

A RESTful API for managing doctor–patient appointments using **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**. This system allows doctors to register and manage services and availability, while patients can browse doctors, view available time slots, and request appointments.

---

## ✅ Features

### 👨‍⚕️ Doctor Module

- Register/Login as Doctor
- Add/Edit/Delete Services
- Set Availability (days + time slots)
- View & Manage Appointments (Accept/Cancel/Complete)

### 👩‍⚕️ Patient Module

- Register/Login as Patient
- View Doctors, Filter by hospital/specialization/service
- View Doctor Details: Services, Availability, Hospital info
- Book Appointments
- Track Appointment Status (Pending, Accepted, Cancelled, Completed)

### 🔐 Authentication & Authorization

- JWT-based authentication
- Role-based Access Control (Doctor/Patient)
- Passwords are securely hashed using **bcryptjs**

---

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB, Mongoose
- **Auth:** JWT + bcryptjs
- **Validation:** Zod
- **Email:** Nodemailer (Mock email on status change)
- **Testing:** Jest, Supertest
- **Linting:** ESLint, Prettier

---

## 📦 API Endpoints

### Auth Routes

| Method | Endpoint               | Description           |
| ------ | ---------------------- | --------------------- |
| POST   | /auth/register-doctor  | Register as Doctor    |
| POST   | /auth/register-patient | Register as Patient   |
| POST   | /auth/login            | Login & get JWT Token |

### Doctor Routes

| Method | Endpoint                        | Description                 |
| ------ | ------------------------------- | --------------------------- |
| POST   | /doctor/services                | Add Service                 |
| PATCH  | /doctor/services/:id            | Edit Service                |
| DELETE | /doctor/services/:id            | Delete Service              |
| POST   | /doctor/availability            | Set Availability            |
| PATCH  | /doctor/appointments/:id/status | Accept/Cancel/Complete      |
| GET    | /doctor/appointments            | View Appointments by status |

### Patient Routes

| Method | Endpoint              | Description                       |
| ------ | --------------------- | --------------------------------- |
| GET    | /doctors              | Browse all Doctors (with filters) |
| GET    | /doctors/:id          | View Doctor Profile               |
| POST   | /appointments         | Book Appointment                  |
| GET    | /patient/appointments | View My Appointments              |

---

## 🗂️ Appointment Workflow

```mermaid
graph TD
    A[Patient books appointment] --> B[Status: Pending]
    B --> C{Doctor action}
    C -->|Accept| D[Slot removed from availability]
    C -->|Cancel| E[Slot added back to availability]
    D --> F[Patient notified]
    E --> F
```
````

---

## 📁 Project Structure

```
/src
├── app/               # Express app configuration
├── modules/           # Feature modules
│   ├── auth/          # Authentication
│   ├── user/          # User models
│   ├── doctor/        # Doctor features
│   ├── patient/       # Patient features
│   ├── service/       # Service management
│   ├── hospital/      # Hospital management
│   ├── special../     # Specialization management
│   ├── appointment/   # Appointment logic
│   └── availability/  # Availability management
├── utils/             # Utility functions
├── middlewares/       # Custom middlewares
├── config/            # Configuration files
├── app.ts             # Main app file
└── server.ts          # Server entry point
```

---

## 🚀 Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB (v4.4+)
- TypeScript (v4.7+)

### 1. Clone the Repository

```bash
git clone https://github.com/hammadsadi/dr-tech-backend.git
cd dr-tech-backend
```

### 2. Install Dependencies

```bash
yarn install
```

### 3. Configure Environment

Create `.env` file:

```bash
cp .env.example .env
```

Then update with your credentials.

### 4. Run the Server

```bash
# Development
yarn dev

# Production build
yarn build
```

---

## 📬 API Documentation

Complete Postman collection with examples:
[Download Postman Collection](#) (Update with actual link)

---

## ✨ Author

**Hammad Sadi**  
📧 Email: [shahisrail134@gmail.com](mailto:shahisrail134@gmail.com)  
🔗 GitHub: [@yourusername](https://github.com/yourusername)

```

```
