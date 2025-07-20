Dynamic Data Management Platform (DDMP) – Backend

This project is a backend system for managing dynamic data collections. It allows users to:

* Register and authenticate using JWT
* Define custom collections with flexible schemas
* Perform full CRUD operations on documents inside collections
* Filter, sort, and paginate documents
* Ensure security and authorization for each user’s data

Built using Node.js, Express, MongoDB, and Mongoose.

---

## Features

* User registration and login with hashed passwords and JWT authentication
* Secure access to protected routes using middleware
* Create collections dynamically with JSON-based schema definitions
* CRUD support for documents in user-defined collections
* Filtering, sorting, and pagination when retrieving documents
* Validation of data types during document creation and updates

---

## Folder Structure


Backend/
│
├── controllers/
│   ├── collectionController.js
│   └── documentController.js
│
├── middleware/
│   └── verifyToken.js
│
├── models/
│   ├── User.js
│   └── Collection.js
│
├── routes/
|   |__ profile.js
│   ├── auth.js
│   ├── collections.js
│   └── documents.js
│
├── .env
├── .env.example
|__ package-lock.json
├── package.json
└── server.js


---

## Getting Started

Follow these steps to run the project locally:

1. Clone the repository:

   bash
   git clone https://github.com/Supraja1508/Backend.git
   cd Backend
   

2. Install dependencies:

   bash
   npm install
   

3. Configure environment variables:

   Create a .env file in the root directory:

   
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   

4. Start the server:

   bash
   npm start
   or
   node server.js

The backend server will be running at [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

Auth Routes

* POST /api/auth/register – Register a new user
* POST /api/auth/login – Login and receive a JWT token

Profile

* GET /api/profile – Get logged-in user profile (requires token)

Collection Routes

* POST /collections – Create a new collection with schema
* GET /collections – Get all collections of the logged-in user

Document Routes

* POST /collections/\:collectionId/documents – Add a new document
* GET /collections/\:collectionId/documents – Get all documents with filtering/pagination
* GET /collections/\:collectionId/documents/\:documentId – Get a specific document
* PUT /collections/\:collectionId/documents/\:documentId – Update a document
* DELETE /collections/\:collectionId/documents/\:documentId – Delete a document

---

## Postman Collection

A Postman collection is provided to test all APIs, including:

* Registration & Login
* Collection creation
* Document creation and retrieval
* Token authorization in headers

---

## Technologies Used

* Node.js
* Express.js
* MongoDB & Mongoose
* JSON Web Tokens (JWT)
* dotenv

---

## Author

Supraja
GitHub:(https://github.com/Supraja1508)
