# Investment Referral Management System

A backend REST API developed using **Node.js**, **Express.js**, and **MongoDB** for managing Investments, ROI Distribution, Referral Income, and Dashboard statistics.

---

# Features

- User Authentication (JWT)
- Register & Login
- Investment Management
- ROI History
- Referral Income
- Dashboard API
- Daily Automatic ROI Distribution
- Referral Income Distribution
- Repository Pattern
- Docker Support
- MongoDB Transactions

---

# Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- node-cron
- Docker
- dotenv

---

# Folder Structure

```
backend
│
├── src
│   ├── config
│   ├── controller
│   ├── cron
│   ├── middleware
│   ├── models
│   ├── repositories
│   ├── routes
│   ├── service
│   ├── test
│   ├── utils
│   ├── validator
│   ├── app.js
│   └── server.js
│
├── .env
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

---

# Modules

## Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes

---

## Investment

- Create Investment
- Get Investment Details
- Get User Investments
- Get Active Investments
- Cancel Investment

---

## ROI History

- Get ROI History
- Get ROI By Investment
- Get Total ROI
- Get Pending ROI
- Get All ROI Records

---

## Referral Income

- Referral Income History
- Total Referral Income
- Referral Details

---

## Dashboard

Dashboard API returns

- Wallet Balance
- Total Investment
- Total ROI Earned
- Total Referral Income
- Active Investments
- Recent ROI History
- Recent Referral History

---

# Background Jobs

## Daily ROI Distribution

Automatically runs every day at **12:00 AM**

Tasks

- Fetch Active Investments
- Calculate Daily ROI
- Create ROI History
- Update User Wallet
- Update Total ROI Earned
- Prevent Duplicate ROI
- Generate Referral Income

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Move inside project

```bash
cd backend
```

Install packages

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRES=1d

JWT_REFRESH_EXPIRES=7d
```

---

# Run Project

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

# Docker

Build Docker Image

```bash
docker-compose up --build
```

---

# API Testing

The complete API collection is available in the attached Postman Collection.

Import the collection into Postman and configure the environment variables before testing.

---

# Authentication

All protected APIs require a JWT Access Token.

Example Header

```
Authorization: Bearer <access_token>
```

---

# Cron Job

The application uses **node-cron** for scheduled tasks.

Current Scheduled Jobs

- Daily ROI Distribution
- Referral Income Distribution

---

# Architecture

The project follows the Repository Pattern.

```
Routes
      │
Controller
      │
Service
      │
Repository
      │
MongoDB
```

---

# Author

**Akash Kumar Dubey**

Full Stack Developer

- Node.js
- Express.js
- MongoDB
- Docker
- JWT Authentication
- Repository Pattern