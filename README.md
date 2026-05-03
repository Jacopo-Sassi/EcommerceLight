🛒 E-commerce Light – MERN Stack

Minimal e-commerce application built with the MERN stack to demonstrate full-stack development skills: API design, state management, and database integration.

🎯 Project Goal

This project showcases the ability to build a complete web application from scratch, focusing on:

Clean frontend-backend separation
REST API development
State management in React
Data persistence with MongoDB


🚀 Features
Product Catalog
Dynamic product listing fetched from the backend API
Shopping Cart
Client-side state management for adding/removing items
Mock Checkout
Simulated order submission with persistence in database
Responsive UI
Built with a modern and mobile-friendly experience


🧠 Tech Stack

Frontend

React.js (Vite)
Axios

Backend

Node.js
Express.js

Database

MongoDB (Mongoose ODM)

🗄️ Database Design

Using Mongoose to define structured schemas.

Products Collection
name
description
price
image
category
Orders Collection
customer info
list of product IDs
total amount
timestamp


🔌 API Overview
Method	Endpoint	Description
GET	/products	Get all products
POST	/orders	Create new order


🧩 Future Improvements
Authentication (JWT)
Real payment integration (Stripe)
Admin dashboard
Product filtering & search
Global state management (Redux / Context API)

💡 What I Learned
Building a full-stack app end-to-end
Managing API communication between client and server
Structuring scalable backend architecture
Handling real-world application flow (cart → order)