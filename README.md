# 🦷 BrightSmile Dental Clinic App

## Description
BrightSmile Dental Clinic is a comprehensive, full-stack web application built using the MERN stack (MongoDB, Express, React, Node.js). It streamlines clinic operations by providing a patient-facing portal for booking appointments and a staff-facing dashboard for managing daily schedules and patient directories.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Features
* **Patient Portal**: Secure user registration and authentication for patients to book, view, and manage their upcoming dental visits.
* **Staff Dashboard**: A protected staff view to monitor the daily schedule, manage patient directories, and cancel appointments.
* **Smart Scheduling**: Real-time availability checks that automatically filter out booked time slots.
* **Double-Booking Prevention**: Database-level unique indexing prevents race conditions and scheduling conflicts.
* **Secure Authentication**: JSON Web Token (JWT) based authentication with encrypted passwords via bcrypt.

## 🛠️ Technologies Used
**Client:**
* React 18 & React Router
* Vite
* Axios for API requests
* Date-fns for date manipulation

**Server:**
* Node.js & Express.js
* MongoDB & Mongoose
* JSON Web Token (JWT)
* Bcrypt for password hashing

## ⚙️ Installation

### Prerequisites
* Node.js installed on your local machine
* A local or cloud MongoDB instance (MongoDB Atlas)

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/dental-clinic-app.git](https://github.com/your-username/dental-clinic-app.git)
cd dental-clinic-app
```

### 2. Server Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `/server` directory and configure the following required variables:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

*(Optional)* Seed the database with mock staff, patients, and appointments:
```bash
npm run data:import
```

Start the backend server:
```bash
npm run dev
```

### 3. Client Setup
Open a new terminal window, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Create a `.env` file in the `/client` directory:
```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend development server:
```bash
npm run dev
```

## 💻 Usage
Once both servers are running, open your browser and navigate to `http://localhost:5173`. 
* **Patients:** Can browse services, register an account, and book time slots. 
* **Staff:** Can log in using staff credentials to view the day's appointments and the complete patient directory.

## 📁 Project Structure
The repository is split into two distinct workspaces:
* `/client`: Contains the Vite + React frontend application, UI components, state management (Context API), and API service wrappers.
* `/server`: Contains the Express REST API, Mongoose models, authentication middleware, and database configuration.

## 🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
1. Fork the project.
2. Create your feature branch (`git checkout -b feature/AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.
