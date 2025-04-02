# Food Delivery Application

A full-stack MERN (MongoDB, Express, React, Node.js) application for food delivery services.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally or a remote connection)

### Installation

1. Clone the repository
2. Install dependencies:
   bash
   npm install
   

3. Create a .env file in the root directory with the following variables:
   
   MONGODB_URI=mongodb://localhost:27017/food-delivery
   JWT_SECRET=your_secure_jwt_secret_here
   PORT=5000
   

   Replace these values with your actual configuration:
   - MONGODB_URI: Your MongoDB connection string
   - JWT_SECRET: A secure random string for JWT token generation
   - PORT: The port number for the backend server (default: 5000)

### Running the Application

1. Start both the backend server and frontend development server:
   bash
   npm start
   

   This will concurrently run:
   - Backend server on http://localhost:5000
   - Frontend development server on http://localhost:5173

2. Access the application at http://localhost:5173

## Features

- User authentication (register, login, logout)
- Browse restaurants and menu items
- Search functionality
- Add items to cart
- Checkout process
- Order history
- Responsive design

## API Endpoints

### Authentication
- POST /api/auth/register - Register a new user
- POST /api/auth/login - Login a user

### Restaurants
- GET /api/restaurants - Get all restaurants
- GET /api/restaurants/:id - Get a specific restaurant
- GET /api/restaurants/:id/menu - Get menu items for a restaurant

### Orders
- POST /api/orders - Create a new order
- GET /api/orders - Get all orders for the authenticated user

## Database Models

### User
- name: String (required)
- email: String (required, unique)
- password: String (required)
- phone: String
- address: [String]
- role: String (enum: 'user', 'admin', 'restaurant', default: 'user')

### Restaurant
- name: String (required)
- description: String (required)
- cuisineType: [String] (required)
- address: Object (street, city, state, zipCode, coordinates)
- owner: ObjectId (ref: 'User')
- rating: Number
- reviewCount: Number
- priceRange: String (enum: 'low', 'medium', 'high')
- openingHours: [Object] (day, open, close)
- images: [String]
- isActive: Boolean

### MenuItem
- name: String (required)
- description: String (required)
- price: Number (required)
- restaurant: ObjectId (ref: 'Restaurant')
- category: String (required)
- image: String
- isVegetarian: Boolean
- isSpicy: Boolean
- customization: [Object]
- isAvailable: Boolean
- preparationTime: Number

### Order
- user: ObjectId (ref: 'User')
- restaurant: ObjectId (ref: 'Restaurant')
- items: [Object] (menuItem, quantity, customizations, price)
- totalAmount: Number (required)
- deliveryAddress: Object (street, city, state, zipCode)
- status: String (enum: ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'])
- paymentStatus: String (enum: ['pending', 'completed', 'failed'])
- paymentMethod: String (enum: ['card', 'cash', 'upi'])#​ ​F​o​o​d​-​D​e​l​i​v​e​r​y​-​A​p​p
