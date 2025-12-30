# Soil – Full-Stack Grocery Platform

**React · Node.js · Express · Sequelize · MySQL · GraphQL**

Soil is a full-stack grocery web application focused on organic products. It includes a public user-facing storefront and a separate admin dashboard for moderation and analytics. The project demonstrates real-world patterns such as REST and GraphQL APIs, shared databases, content moderation, and data visualisation.



---

## Key Features

### User Platform
- Browse products and categories
- User authentication and session handling
- Shopping cart and order workflow
- Submit product reviews

### Admin Platform
- Admin dashboard built with React and Apollo Client
- Review moderation with real-time updates (GraphQL subscriptions)
- Analytics dashboard for ratings and engagement
- Admin-only data access and actions

---

## Technical Architecture

- **Frontend (User):** React (Create React App)
- **Frontend (Admin):** React + Apollo Client
- **Backend (User):** Express REST API
- **Backend (Admin):** Apollo GraphQL API with subscriptions
- **Database:** MySQL (shared across services via Sequelize ORM)

User React App
↓ REST
Express API
↓
MySQL
↑
Admin GraphQL API
↑ GraphQL + WebSockets
Admin React Dashboard

---

## Notable Engineering Work

### Review Moderation System
- User reviews are checked using the `obscenity` library to detect inappropriate language
- Flagged reviews are visually highlighted for administrators
- Admins can review and delete inappropriate content
- New reviews are pushed to the admin dashboard in real time using GraphQL subscriptions

### Analytics & Metrics
- Average product rating over time (line chart)
- Number of reviews per product (bar chart)
- Implemented using `react-chartjs-2` to support data-driven insights for admins

---

## Project Structure

express/ # REST backend (Express + Sequelize)
admin-graphql/ # GraphQL backend (Apollo + subscriptions)
soil/ # Public React frontend
admin-front-end/ # Admin React dashboard

---

## Running Locally

### Prerequisites
- Node.js (v16+ recommended)
- npm
- MySQL (local or hosted, e.g. Railway)

### Setup

1. Configure environment variables for MySQL connection  
   (`.env` files for `express/` and `admin-graphql/`)

2. Start backend services:

```bash
cd express
npm install
npm start

cd ../admin-graphql
npm install
npm start
Start frontend applications:
cd ../soil
npm install
npm start

cd ../admin-front-end
npm install
npm start
Libraries Used
obscenity – profanity detection for review moderation
react-chartjs-2 – charts for analytics dashboard
Sequelize – ORM for MySQL
Apollo Server / Client – GraphQL APIs and subscriptions
