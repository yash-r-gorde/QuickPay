# 💸 QuickPay - A Basic Paytm-Style Wallet App

QuickPay allows users to sign up, sign in, check balances, and transfer money securely between users. It demonstrates authentication, protected routes, and money transfer logic — all built using the MERN stack.

---

## 🚀 Features

- 🔐 JWT-based sign-up and login
- 🔎 Auth check using `/me` endpoint
- 🧭 Auto-route protection and redirects
- 💸 Transfer money to other users
- 💼 View user balance on dashboard

---

## 🛠️ Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js, MongoDB (Mongoose), JWT, Bcrypt

---

## 📦 Installation

### 🔧 Prerequisites

- Node.js
- npm
- MongoDB (local or Atlas)

### ⚙️ Setup

1. **Clone the repository**

```bash
git clone https://github.com/yash-r-gorde/QuickPay.git
cd quickpay

The React app will run at: http://127.0.0.1:5173/
Backend runs at: http://localhost:3021/  

🔐 Auth Flow
On page load (/), app hits /api/v1/user/me using token from localStorage

If authenticated → redirected to /dashboard

If not → redirected to /signup

📚 API Overview
| Method | Endpoint                    | Description             |
| ------ | --------------------------- | ----------------------- |
| POST   | `/api/v1/user/signup`       | Register new user       |
| POST   | `/api/v1/user/signin`       | Login and get JWT       |
| GET    | `/api/v1/user/me`           | Verify JWT and get user |
| PUT    | `/api/v1/user/`             | Update user info        |
| GET    | `/api/v1/user/bulk?filter=` | Search/filter users     |

🧭 Routes Summary (Frontend)
| Path         | Description                |
| ------------ | -------------------------- |
| `/signup`    | Register new user          |
| `/signin`    | Login screen               |
| `/dashboard` | Shows user balance         |
| `/sendmoney` | Send money to another user |


🤝 Contribution
Feel free to fork, clone, and contribute via pull requests. Open issues if you'd like to suggest features or report bugs.



