---

````markdown
---

## 📘 API Usage

### 🔐 Auth Routes

#### ➕ Register Doctor

**POST** `/auth/register-doctor`

```json
{
  "name": "Dr. Hammad",
  "email": "hammad@dr.com",
  "phone": "01700000000",
  "password": "123456",
  "specialization": "Cardiology",
  "hospitalName": "City Hospital",
  "hospitalFloor": "3rd Floor"
}
```

````

#### ➕ Register Patient

**POST** `/auth/register-patient`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "01800000000",
  "password": "123456",
  "age": 30,
  "gender": "Male"
}
```

#### 🔑 Login

**POST** `/auth/login`

```json
{
  "email": "john@example.com",
  "password": "123456"
}
```

Returns: `{ "token": "JWT_TOKEN_HERE" }`

---

### 🩺 Doctor Routes

#### ➕ Add Service

**POST** `/doctor/services`

**Headers:**

```json
Authorization: Bearer YOUR_JWT_TOKEN
```

**Body:**

```json
{
  "title": "Heart Checkup",
  "description": "Basic heart checkup",
  "price": 800,
  "duration": 30
}
```

#### 📅 Set Availability

**POST** `/doctor/availability`

```json
{
  "service": "SERVICE_ID",
  "day": "Monday",
  "slots": ["10:00 AM", "11:00 AM", "2:00 PM"]
}
```

#### 🗂 View Appointments by Status

**GET** `/doctor/appointments?status=pending`

#### ✅ Update Appointment Status

**PATCH** `/doctor/appointments/:id/status`

```json
{
  "status": "accepted"
}
```

---

### 👤 Patient Routes

#### 📋 View All Doctors

**GET** `/doctors`

Optional Filters:

- `?hospital=City Hospital`
- `?specialization=Cardiology`
- `?service=Heart Checkup`

#### 👀 View Doctor Profile

**GET** `/doctors/:id`

#### 📆 Book Appointment

**POST** `/appointments`

```json
{
  "doctorId": "DOCTOR_ID",
  "serviceId": "SERVICE_ID",
  "selectedDate": "2025-06-30",
  "timeSlot": "10:00 AM"
}
```

#### 🧾 View My Appointments

**GET** `/patient/appointments`

---

## 🧪 Sample Data

Create a file named `sample-data.json` or use Postman to import these examples:

### 🩺 Sample Doctor

```json
{
  "name": "Dr. Hammad",
  "email": "hammad@dr.com",
  "phone": "01700000000",
  "password": "123456",
  "specialization": "Cardiology",
  "hospitalName": "City Hospital",
  "hospitalFloor": "3rd Floor"
}
```

### 💼 Sample Services

```json
[
  {
    "title": "Heart Checkup",
    "description": "Basic heart checkup",
    "price": 800,
    "duration": 30
  },
  {
    "title": "Eye Consultation",
    "description": "Vision testing and eye health evaluation",
    "price": 700,
    "duration": 30
  }
]
```

---

You can also write a `seed.ts` script to import these into your MongoDB database.

---

## 🧪 Test via Postman

Make sure to:

1. Import your Postman collection
2. Set `{{base_url}}` as `http://localhost:5000`
3. Use JWT tokens in Authorization headers for protected routes

👉 Postman Download Link: \[Add link here]

---

```

এই অংশটুকু তোমার `README.md`-এর শেষে অথবা "📦 API Endpoints" এর নিচে যুক্ত করলেই সম্পূর্ণ হয়ে যাবে।

🔔 চাইলে আমি তোমার জন্য `seed.ts` ফাইল বা Postman collection export করে দেওয়ার গাইডলাইনও দিতে পারি। বলো কিভাবে সাহায্য করতে পারি।
```
````
