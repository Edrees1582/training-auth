# Task-1: Authentication & Authorization API

A Node.js REST API with user authentication, authorization, and role-based access control (RBAC) system.

## 🚀 Features

- **User Authentication**: Register and login functionality
- **JWT Token-based Authentication**: Secure token-based authentication
- **Role-based Authorization**: Support for different user roles (Admin, Moderator, User)
- **Password Encryption**: Secure password hashing using bcrypt
- **Input Validation**: Email and required field validation
- **Protected Routes**: Role-specific route protection
- **User Profile Management**: Get user profile information

## 🛠️ Tech Stack

- **Node.js** (>=22.15.1)
- **Express.js** - Web framework
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **dotenv** - Environment variable management
- **nodemon** - Development server with auto-reload

## 📁 Project Structure

```
task-1/
├── app/
│   ├── controllers/
│   │   └── authentication.js    # Authentication logic
│   ├── database/
│   │   └── users.js             # User data management
│   ├── middlewares/
│   │   ├── authentication.js    # JWT token verification
│   │   └── authorization.js     # Role-based access control
│   ├── routes/
│   │   ├── admin.js             # Admin-only routes
│   │   ├── authentication.js    # Auth routes (login, register, profile)
│   │   └── moderator.js         # Moderator-only routes
│   └── utils/
│       ├── encryption.js        # Password hashing utilities
│       ├── jwt.js               # JWT token generation
│       └── validators.js        # Input validation utilities
├── server.js                    # Main server file
├── package.json                 # Project dependencies
└── README.md                    # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (version 22.15.1 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-1
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   SERVER_PORT=3000
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Start the server**
   ```bash
   npm start
   ```

   The server will start on `http://localhost:3000` (or the port specified in your `.env` file)

## 📚 API Documentation

### Base URL
```
http://localhost:3000/api
```

### Authentication Endpoints

#### 1. Register User
- **POST** `/auth/register`
- **Description**: Register a new user
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully"
  }
  ```

#### 2. Login User
- **POST** `/auth/login`
- **Description**: Authenticate user and get JWT token
- **Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### 3. Get User Profile
- **GET** `/auth/profile`
- **Description**: Get current user's profile information
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Response**:
  ```json
  {
    "user": {
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
  ```

### Protected Routes

#### Admin Routes
- **GET** `/admin`
- **Description**: Admin-only endpoint
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Required Role**: Admin

#### Moderator Routes
- **GET** `/moderator`
- **Description**: Moderator-only endpoint
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Required Role**: Moderator

## 🔐 Authentication & Authorization

### JWT Token Usage
Include the JWT token in the Authorization header for protected routes:
```
Authorization: Bearer <your_jwt_token>
```

### User Roles
The system supports the following user roles:
- **User**: Basic authenticated user
- **Moderator**: Elevated privileges
- **Admin**: Full system access

### Middleware
- **AuthenticateToken**: Verifies JWT token validity
- **IsAdmin**: Checks if user has admin role
- **IsModerator**: Checks if user has moderator role

## 🧪 Testing the API

You can test the API using tools like:
- **Postman**
- **cURL**
- **Thunder Client** (VS Code extension)

### Example cURL Commands

1. **Register a user**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"user"}'
   ```

2. **Login**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"john@example.com","password":"password123"}'
   ```

3. **Get profile** (replace `<token>` with actual JWT token):
   ```bash
   curl -X GET http://localhost:3000/api/auth/profile \
     -H "Authorization: Bearer <token>"
   ```

## 🔧 Development

### Available Scripts
- `npm start` - Start the development server with nodemon
- `npm test` - Run tests (not implemented yet)

### Adding New Routes
1. Create a new route file in `app/routes/`
2. Import and use the appropriate middleware for authentication/authorization
3. Add the route to `server.js`

## 📝 Notes

- The current implementation uses in-memory storage for users
- JWT tokens should be stored securely on the client side
- Consider implementing refresh tokens for production use
- Add proper error handling and logging for production deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 