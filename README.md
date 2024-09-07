# Quisine
#harsht
## Overview
This project is a clone of the popular food delivery platform **Swiggy**, developed with **Spring Boot** and **Spring MVC** for the backend, **Angular 11** for the frontend, and **SQL** for database management. The application supports CRUD operations for three main entities: **Restaurant**, **Owner**, and **Admin**, and features an integrated chatbot for enhanced user interaction.

## Features
- **Restaurant Listings:** Display restaurants and their menus.
- **Owner Management:** CRUD operations for restaurant owners to manage their listings.
- **Admin Panel:** CRUD access for admins to oversee the entire system.
- **Food Ordering:** Users can select items, customize orders, and manage their cart.
- **Chatbot:** Provides real-time assistance and interacts with users.
- **Responsive UI:** Designed to work seamlessly on both desktop and mobile devices.

## Tech Stack
- **Frontend:** Angular 11
- **Backend:** Spring Boot, Spring MVC
- **Database:** SQL (for managing data related to users, restaurants, and orders)
- **Chatbot:** Integrated for user interaction

## Setup Instructions
### Prerequisites
- Install **Java**, **Angular CLI**, **SQL database** (e.g., MySQL), and **Node.js**.

### Backend (Spring Boot)
1. Clone the repository: `git clone https://github.com/your-username/Swiggy-Clone.git`
2. Navigate to the backend directory and open it in your IDE (e.g., IntelliJ or Eclipse).
3. Configure the SQL database and update `application.properties` with your database credentials.
4. Build and run the Spring Boot application.

### Frontend (Angular 11)
1. Navigate to the `frontend` folder: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Angular development server: `ng serve --open`

### Database Setup
1. Execute the SQL scripts from the `db` folder to set up the necessary tables (users, restaurants, orders, etc.).
2. Ensure that the SQL server is running and properly connected to the application.

### Chatbot Integration
1. Follow the setup instructions provided in the `chatbot` directory to integrate and configure the chatbot.

## License
This project is open-source and available under the [MIT License](LICENSE).
