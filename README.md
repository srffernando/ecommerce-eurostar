# E-Commerce REST API

A lightweight e-commerce REST API built with JavaScript and Express. Users can register, log in to receive a JWT token, and perform authenticated checkouts with cash or credit card payment methods.

## Description

This API provides in-memory user and product management for a simple e-commerce flow. All data lives in memory—no database is required. Authentication uses JWT (JSON Web Tokens), and checkout enforces business rules around payment methods and discounts.

## Installation

1. Clone the repository and switch to the `feature/rest-api` branch.
2. Install dependencies:

```bash
npm install
```

## How to Run

Start the server:

```bash
npm start
```

The API listens on **http://localhost:5432** by default. Set the `PORT` environment variable to use a different port.

For development with auto-restart on file changes:

```bash
npm run dev
```

## Rules

- **Authentication**: Only authenticated users (valid JWT) can perform checkout.
- **Payment methods**: Checkout accepts only `cash` or `credit_card`.
- **Cash discount**: Paying with `cash` applies a **10% discount** on the order subtotal.
- **In-memory storage**: Users and products are stored in memory. Data resets when the server restarts.
- **Endpoints**: The API exposes exactly four endpoints—register, login, checkout, and healthcheck.

## Existent Data

### Users (password for all: `password123`)

| ID | Username | Email              |
|----|----------|--------------------|
| 1  | alice    | alice@example.com  |
| 2  | bob      | bob@example.com    |
| 3  | carol    | carol@example.com  |

### Products

| ID | Name                 | Price   |
|----|----------------------|---------|
| 1  | Wireless Headphones  | $79.99  |
| 2  | Smart Watch          | $149.99 |
| 3  | USB-C Hub            | $34.99  |

## How to Use the Rest API

Base URL: `http://localhost:5432/api`

### 1. Healthcheck

Verify the server is running.

```http
GET /api/healthcheck
```

**Response (200):**

```json
{
  "status": "ok"
}
```

### 2. Register

Create a new user account.

```http
POST /api/register
Content-Type: application/json

{
  "username": "dave",
  "email": "dave@example.com",
  "password": "mypassword"
}
```

**Response (201):**

```json
{
  "user": {
    "id": 4,
    "username": "dave",
    "email": "dave@example.com"
  },
  "token": "<JWT>"
}
```

### 3. Login

Authenticate and receive a JWT token.

```http
POST /api/login
Content-Type: application/json

{
  "email": "alice@example.com",
  "password": "password123"
}
```

**Response (200):**

```json
{
  "user": {
    "id": 1,
    "username": "alice",
    "email": "alice@example.com"
  },
  "token": "<JWT>"
}
```

### 4. Checkout

Place an order (requires authentication). Include the JWT in the `Authorization` header.

```http
POST /api/checkout
Authorization: Bearer <JWT>
Content-Type: application/json

{
  "items": [
    { "productId": 1, "quantity": 2 },
    { "productId": 3, "quantity": 1 }
  ],
  "paymentMethod": "cash"
}
```

**Response (200) — cash payment (10% discount applied):**

```json
{
  "items": [
    {
      "productId": 1,
      "name": "Wireless Headphones",
      "unitPrice": 79.99,
      "quantity": 2,
      "lineTotal": 159.98
    },
    {
      "productId": 3,
      "name": "USB-C Hub",
      "unitPrice": 34.99,
      "quantity": 1,
      "lineTotal": 34.99
    }
  ],
  "paymentMethod": "cash",
  "subtotal": 194.97,
  "discount": 19.5,
  "total": 175.47
}
```

Use `"paymentMethod": "credit_card"` for credit card payments (no discount).

### Error responses

| Status | Scenario                                      |
|--------|-----------------------------------------------|
| 400    | Missing or invalid request body               |
| 401    | Missing, invalid, or expired JWT                |
| 404    | Product not found                               |
| 409    | Email or username already registered            |

## Project Structure

```
src/
├── app.js
├── server.js
├── controllers/
│   ├── authController.js
│   ├── checkoutController.js
│   └── healthController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── products.js
│   └── users.js
├── routes/
│   ├── authRoutes.js
│   ├── checkoutRoutes.js
│   ├── healthRoutes.js
│   └── index.js
└── services/
    ├── authService.js
    └── checkoutService.js
```
