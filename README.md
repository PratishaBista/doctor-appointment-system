 <p align="center">

      <img src="./Frontend/src/assets/HealthSolutionLogo.png" alt="Project Logo" width="150" />

    </p><h1 align="center">Doctor Appointment System</h1>
    
> A collaborative development project as part of university coursework  
> Module: Collaborative Development (5CS024)  
> BSc (Hons) Computer Science – Year 2, 2025  

## **About the Project**

This repository contains the source code for a **Doctor Appointment System** developed as a team project for our university module on Collaborative Development. It represents a realistic simulation of working in a cross-functional software team, with assigned roles such as developers, a project manager, and a business analyst.

> **Note**: This project is still under development and has not been deployed yet. While much of the core functionality has been implemented, further refinements and deployment steps remain.

## Purpose

This system is not intended for public use or open-source contribution. It has been created **strictly for academic purposes**, to help us develop and apply our skills in software engineering, version control, project management, and teamwork.

## Team Structure

* **4 Developers** – Worked on frontend/backend implementation, dashboard features, and integration.
* **1 Project Manager** – Facilitated sprints, prioritized tasks, and ensured alignment with project goals.
* **1 Business Analyst** – Helped define requirements, test features, and guide the overall functionality.

Their combined effort, especially in maintaining clarity of scope and validating the application, was critical to the progress we made.

## Features (Current Scope)

The system includes role-based access for:

* **Admin** – Manages all users and oversees system operations.
* **Patient** – Books appointments, views test results and prescriptions.
* **Doctor** – Manages scheduled appointments through a dedicated dashboard.
* **Pathologist** – Uploads lab reports for doctors and patients.

Each role has been developed with its own UI section and access logic, though the full feature set is still evolving.

## Project Status

* This project is **not currently deployed online**.
* As a result, the project will not run immediately upon cloning without additional configuration.

If you are a teammate or instructor evaluating this project and would like to run it locally:
  
### Getting Started (For Developers/PMs/BAs)

1. **Clone the Repository**

   * HTTPS:
     ```bash
     git clone https://github.com/your-username/doctor-appointment-system.git
     ```

   * SSH:
     ```bash
     git clone git@github.com:your-username/doctor-appointment-system.git
     ```

2. **Request Environment Variables**  

    The project depends on various environment variables (e.g., database URI, JWT secrets, third-party service keys).  
    These are **not committed to the repo** for security reasons.
    Please contact one of the developers to receive the `.env` files required for both backend and frontend.

2. **Run the Application Locally**
   
    **Backend Setup (Node + Express + MongoDB)**
    - Navigate to the backend directory:
        ```bash
        cd backend
        ```

    - Install dependencies:
        ```bash
        npm install
        ```

    - Start the server:
        ```bash
        npm run server
        ```

        _(Alternatively, use `npm start` if `server` script isn’t available)_

    **Frontend Setup (React + Vite)**
    - Navigate to the frontend directory:
        ```bash
        cd frontend
        ```

    - Install dependencies:
        ```bash
        npm install
        ```

    - Start the frontend development server:
        ```bash
        npm run dev
        ```

   Open the link (localhost URL) to view the app in your browser.

## Final Reflection

This project has served as a significant learning experience, helping us apply real-world development practices in a team setting. It has laid a strong foundation for further development and potential scaling in the future.