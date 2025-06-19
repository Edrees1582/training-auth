# Task-1: Authentication & Authorization API

A TypeScript-based Node.js REST API with user authentication, authorization, and role-based access control (RBAC) system.

## 🚀 Features

- **User Authentication**: Register and login functionality
- **JWT Token-based Authentication**: Secure token-based authentication
- **Role-based Authorization**: Support for different user roles (Admin, Moderator, User)
- **Password Encryption**: Secure password hashing using bcrypt
- **Advanced Input Validation**: Comprehensive validation using express-validator
- **TypeScript Support**: Full type safety and better development experience
- **Database Integration**: SQLite database with Sequelize ORM
- **Protected Routes**: Role-specific route protection
- **User Profile Management**: Get user profile information
- **Strong Password Requirements**: Enforced password strength validation

## 🛠️ Tech Stack

- **Node.js** (>=22.15.1)
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **express-validator** - Input validation and sanitization
- **Sequelize** - SQL ORM for database management
- **SQLite** - Lightweight database
- **dotenv** - Environment variable management
- **nodemon** - Development server with auto-reload

## 📁 Project Structure

```
task-1/
├── app/
│   ├── controllers/
│   │   └── authentication.ts      # Authentication logic
│   ├── database/
│   │   ├── db.ts                  # Database connection setup
│   │   └── users.ts               # User data operations
│   ├── middlewares/
│   │   ├── authentication.ts      # JWT token verification
│   │   ├── authorization.ts       # Role-based access control
│   │   └── validation.middleware.ts # Validation middleware
│   ├── models/
│   │   └── User.ts                # User model and interface
│   ├── routes/
│   │   ├── admin.ts               # Admin-only routes
│   │   ├── authentication.ts      # Auth routes (login, register, profile)
│   │   └── moderator.ts           # Moderator-only routes
│   ├── utils/
│   │   ├── encryption.ts          # Password hashing utilities
│   │   └── jwt.ts                 # JWT token generation
│   ├── validators/
│   │   └── authentication.ts      # Input validation schemas
│   └── server.ts                  # Main server file
├── dist/                          # Compiled JavaScript output
├── tsconfig.json                  # TypeScript configuration
├── package.json                   # Project dependencies
└── README.md                      # This file
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

4. **Build and Start the server**
   ```bash
   # Build TypeScript to JavaScript
   npm run watch
   
   # In another terminal, start the server
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
- **Description**: Register a new user with validation
- **Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "StrongPass123!",
    "role": 2
  }
  ```
- **Validation Rules**:
  - Name: Minimum 3 characters
  - Email: Valid email format
  - Password: Strong password (8+ chars, uppercase, lowercase, number, special char)
  - Role: Must be 0 (Admin), 1 (Moderator), or 2 (User)
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
    "password": "StrongPass123!"
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
      "role": 2
    }
  }
  ```

### Protected Routes

#### Admin Routes
- **GET** `/admin`
- **Description**: Admin-only endpoint
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Required Role**: Admin (0)

#### Moderator Routes
- **GET** `/moderator`
- **Description**: Moderator-only endpoint
- **Headers**: `Authorization: Bearer <jwt_token>`
- **Required Role**: Moderator (1)

## 🔐 Authentication & Authorization

### JWT Token Usage
Include the JWT token in the Authorization header for protected routes:
```
Authorization: Bearer <your_jwt_token>
```

### User Roles
The system supports the following user roles (enum values):
- **Admin (0)**: Full system access
- **Moderator (1)**: Elevated privileges
- **User (2)**: Basic authenticated user

### Middleware
- **AuthenticateToken**: Verifies JWT token validity
- **IsAdmin**: Checks if user has admin role
- **IsModerator**: Checks if user has moderator role
- **Validation Middleware**: Handles express-validator results

### Validation Features
- **Email Validation**: Ensures valid email format
- **Password Strength**: Requires strong passwords with:
  - Minimum 8 characters
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one number
  - At least one special character
- **Name Validation**: Minimum 3 characters
- **Role Validation**: Must be valid enum value

## 🗄️ Database

### SQLite with Sequelize
The application uses SQLite as the database with Sequelize ORM for:
- **User Management**: Store user credentials and roles
- **Data Persistence**: Persistent user data across server restarts
- **Type Safety**: TypeScript integration with Sequelize models

### Database Schema
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role INTEGER NOT NULL,
  createdAt DATETIME,
  updatedAt DATETIME
);
```

## 🧪 Testing the API

You can test the API using tools like:
- **Postman**
- **cURL**

### Example cURL Commands

1. **Register a user**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{"name":"John Doe","email":"john@example.com","password":"StrongPass123!","role":2}'
   ```

2. **Login**:
   ```bash
   curl -X POST http://localhost:3000/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"john@example.com","password":"StrongPass123!"}'
   ```

3. **Get profile** (replace `<token>` with actual JWT token):
   ```bash
   curl -X GET http://localhost:3000/api/auth/profile \
     -H "Authorization: Bearer <token>"
   ```

## 🔧 Development

### Available Scripts
- `npm run watch` - Watch and compile TypeScript files
- `npm start` - Start the development server with nodemon

### TypeScript Configuration
The project uses TypeScript with the following key configurations:
- **Target**: ES2022
- **Module**: ESNext
- **Output Directory**: `./dist`
- **Root Directory**: `./app`

### Adding New Routes
1. Create a new route file in `app/routes/` with `.ts` extension
2. Import and use the appropriate middleware for authentication/authorization
3. Add validation schemas in `app/validators/` if needed
4. Add the route to `app/server.ts`

## 📝 Notes

- The application now uses SQLite database for persistent data storage
- JWT tokens should be stored securely on the client side
- Consider implementing refresh tokens for production use
- Add proper error handling and logging for production deployment
- TypeScript provides compile-time type checking for better code quality
- Validation errors are returned in a structured format for better error handling
- Database file is stored locally and will be created automatically on first run

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure TypeScript compilation passes
5. Test thoroughly
6. Submit a pull request

## 📄 License

This project is licensed under the ISC License. 