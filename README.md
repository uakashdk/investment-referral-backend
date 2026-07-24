# Investment Management System API

A RESTful backend application built with **Node.js**, **Express.js**, and **MongoDB** for managing users, investments, ROI generation, referral income, and dashboards.

---

# Features

- JWT Authentication
- User Registration & Login
- Investment Management
- Daily ROI Calculation
- ROI History
- Referral Income System
- Dashboard API
- Background Cron Jobs
- MongoDB Transactions
- Repository Pattern Architecture
- Error Handling
- Docker Support
- Postman Collection Included

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

# Project Structure

```
src
│
├── config
├── controller
├── cron
├── middleware
├── models
├── repositories
├── routes
├── service
├── utils
├── app.js
└── server.js
```

---

# Installation

Clone the repository

```bash
git clone <repository-url>
```

Go inside project

```bash
cd investment-backend
```

Install dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file.

```env
PORT=5000

MONGODB_URI=your_mongodb_connection

JWT_ACCESS_SECRET=your_access_secret

JWT_REFRESH_SECRET=your_refresh_secret

JWT_ACCESS_EXPIRE=1d

JWT_REFRESH_EXPIRE=7d
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

# API Modules

## Authentication

- Register User
- Login User
- Get Logged-in User

---

## Investment

- Create Investment
- Get Investment By ID
- Get User Investments
- Get Active Investments
- Cancel Investment
- Complete Investment

---

## ROI History

- Get ROI By ID
- Get Logged User ROI History
- Get Investment ROI History
- Get Pending ROI
- Get Total ROI
- Get All ROI History

---

## Referral Income

- Get Referral By ID
- Get Referral History
- Get Total Referral Income
- Get All Referral Income
- Delete Referral Record

---

## Dashboard

Dashboard API returns

- Total Wallet Balance
- Total Investment
- Total ROI Earned
- Total Referral Income
- Active Investments
- Recent ROI History
- Recent Referral Income

---

# Background Jobs

The application includes automated cron jobs.

## Daily ROI Distribution

Runs every day at **12:00 AM**

Responsibilities

- Fetch Active Investments
- Calculate Daily ROI
- Credit User Wallet
- Update Total ROI Earned
- Create ROI History
- Prevent Duplicate ROI Generation
- Credit Referral Income (Level 1)

---

# Security

- JWT Authentication
- Password Hashing (bcrypt)
- Protected APIs
- Input Validation
- Centralized Error Handling

---

# Testing

The project includes a complete Postman Collection for testing every API.

---

# Docker

Run using Docker

```bash
docker-compose up --build
```

---

# Author

Akash Kumar Dubey

Backend Developer

Node.js • Express.js • MongoDB