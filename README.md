# E-Commerce MERN Stack Application

A full-featured e-commerce platform built with the MERN stack, featuring modern UI components, comprehensive admin controls, and seamless user experience.

## 🚀 Project Overview

This is a complete e-commerce solution that enables users to browse products, manage their cart, place orders, and provides administrators with powerful tools to manage the entire platform.

## ✨ Key Features

### User Features

- **Product Browsing**: Browse and search products with advanced filtering options
- **User Authentication**: Secure login/register with JWT tokens
- **Shopping Cart**: Add, remove, and manage cart items
- **Order Management**: Place orders and track order history
- **User Profile**: Manage personal information and view order history
- **Forgot Password**: Email-based password recovery system

### Admin Features

- **Admin Dashboard**: Comprehensive overview with charts and analytics
- **Product Management**: CRUD operations for products with image uploads
- **Order Management**: View and update order statuses
- **User Management**: Monitor and manage user accounts
- **Review Management**: Moderate product reviews

### Seller Features

- **Seller Dashboard**: Dedicated interface for sellers
- **Product Reviews**: View and manage product reviews
- **Sales Analytics**: Track seller performance

## 🛠️ Tech Stack

### Frontend

- **React.js** - UI framework
- **Redux** - State management
- **React Router Dom** - Navigation
- **Material-UI (MUI)** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **SCSS** - Enhanced CSS
- **Axios** - HTTP client
- **React Helmet** - Document head management
- **Chart.js** - Data visualization

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Cloudinary** - Image storage
- **Nodemailer** - Email service
- **Multer** - File upload handling

### Additional Tools

- **Docker** - Containerization
- **Nodemon** - Development server

## 📁 Project Structure

```
e-commerce/
├── back/                    # Backend server
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middlewares/        # Custom middlewares
│   ├── models/            # Database models
│   ├── routers/           # API routes
│   └── utils/             # Utility functions
├── front/                  # Frontend React app
│   ├── public/            # Static files
│   └── src/
│       ├── components/    # React components
│       │   ├── admin/     # Admin panel components
│       │   ├── cart/      # Shopping cart
│       │   ├── home/      # Homepage components
│       │   ├── layout/    # Layout components
│       │   ├── order/     # Order management
│       │   ├── product/   # Product components
│       │   ├── search/    # Search functionality
│       │   ├── seller/    # Seller dashboard
│       │   └── user/      # User profile
│       └── redux/         # State management
├── compose.yml            # Docker configuration
└── package.json          # Root dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/rohitp-18/e-commerce.git
   cd e-commerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   cd front
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `back/config/` directory with the following variables:
   ```env
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRE=7d
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_SECRET=your_cloudinary_secret
   CLOUDINARY_KEY=your_cloudinary_key
   SMTP_EMAIL=your_email@gmail.com
   SMTP_EMAIL_PASS=your_email_password
   ```

### Running the Application

#### Development Mode

```bash
# Run backend server
npm run back

# Run frontend (in a new terminal)
npm run front
```

#### Using Docker

```bash
docker-compose up
```

#### Production Build

```bash
# Build frontend
npm run build

# Start production server
npm start
```

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/auth/forgot-password` - Forgot password

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders

- `POST /api/orders` - Create order
- `GET /api/orders/me` - Get user orders
- `GET /api/orders` - Get all orders (Admin)

## 🔧 Environment Variables

| Variable            | Description                     |
| ------------------- | ------------------------------- |
| `PORT`              | Server port number              |
| `MONGO_URL`         | MongoDB connection string       |
| `JWT_SECRET`        | JWT token secret key            |
| `JWT_EXPIRE`        | JWT token expiration time       |
| `CLOUDINARY_NAME`   | Cloudinary cloud name           |
| `CLOUDINARY_SECRET` | Cloudinary API secret           |
| `CLOUDINARY_KEY`    | Cloudinary API key              |
| `SMTP_EMAIL`        | Email for sending notifications |
| `SMTP_EMAIL_PASS`   | Email password/app password     |

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Rohit Patel**

- GitHub: [@rohitp-18](https://github.com/rohitp-18)
