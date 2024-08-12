# 🩺 Doctor's Appointment App

Welcome to the **Doctor's Appointment App** repository! This project provides a seamless way to book, manage, and cancel doctor appointments online. Below is a detailed breakdown of the tasks completed and features implemented.

---

[![Doctor's Appointment App](https://github.com/BeaulaEkka/doctor-appointment-frontend/blob/master/public/images/docapp.png)](https://beaula-doctor-appointment-app.vercel.app/)

## 🚀 Features and Progress

### ✔️ Completed Tasks

- **Installation**: Initial setup and dependencies installation.
- **UI Components**: Integrated [Shadcn/ui](https://shadcn.dev/) for UI components.
- **System Architecture**: Designed with [Eraser.io](https://www.eraser.io/).
- **HomeScreen Setup**: Developed the main landing page.
- **UI Sections**:
  - **Header**: Navigation and branding.
  - **Hero Section**: Engaging introduction to the app.
  - **SearchBar**: Enabled search functionality for doctors.
  - **Categories Section**: Categorized medical specializations.
  - **Doctors Section**: Display list of available doctors.
  - **Footer**: Built with [HyperUi](https://hyperui.dev/).
- **Backend**:
  - **Strapi**: Implemented backend with Strapi.
  - **Routing**: Configured app routing.
  - **Authentication**: User login and signup.  
    ![Authentication Flow](https://github.com/BeaulaEkka/doctor-appointment-frontend/blob/master/public/images/authentication%20flow.png)
  - **Middleware**: Custom middleware for route protection.
  - **Booking Appointments**: Appointment scheduling system.
  - **Auto Email Notifications**:
    - [React Email](#sending-out-auto-email-react-email)
    - [Resend](#sending-out-auto-email-resend)
  - **User Booking**: Interface for users to view and manage their bookings.
  - **Cancel Appointment**: Added DELETE API for appointment cancellation.
- **Deployment**:
  - **Backend Deployment**: Deployed on [Render](https://render.com/).
  - **Frontend Deployment**: Live on [Vercel](https://vercel.com/).

---

## 🌐 Deployment

### Frontend

- Deployed on [Vercel](https://vercel.com/). Check out the live demo [https://beaula-doctor-appointment-app.vercel.app/](https://beaula-doctor-appointment-app.vercel.app/).

### Backend

- The Strapi backend is deployed on [Render](https://render.com/).

---

## 🔧 Detailed Features

### Authentication

Authentication is handled with secure flows for both login and signup, ensuring user data protection.

### Middleware

Custom middleware ensures that only authenticated users can access certain routes.

### Booking Appointments

Users can book appointments with their preferred doctors easily through an intuitive interface.

### Sending Out Auto Emails

- **React Email**: Automated emails for appointment confirmations and reminders.
- **Resend**: Integrated for additional email functionalities.

### User Booking Management

Users can view their upcoming appointments, reschedule, or cancel as needed.

### Cancel Appointment

Implemented a DELETE API endpoint allowing users to cancel their appointments.

---

Feel free to explore the repository, and don't hesitate to reach out if you have any questions or suggestions!
