# 🛍️ Alfa Store – Professional eCommerce Platform

A modern and elegant eCommerce web application built with **React 19**, **Vite**, and **Ant Design**. Alfa Store focuses on delivering high-quality user experience for online shopping of **electronics**, **clothing**, and **jewelry**. Built for performance, scalability, and simplicity.

![screenshot](https://alfastorereact.netlify.app/screenshot.png) <!-- Replace with your actual screenshot -->

---

## ✨ Features

- 🧾 **Product Listings** using FakeStore API (Electronics, Clothes, Jewelry)
- 🔍 **Search and Filter** products by category and price
- 🛒 **Cart Management** with item quantity updates and removal
- 💳 **Checkout Page** with support for shipping, payment, and discount options
- 👤 **Authentication System** (Username, Email, Password)
- 🔐 **Custom JWT Auth** stored securely With HS256
- 🧩 **Account Dashboard** with collapsible sections (Settings, Orders, Cart items)
- 📦 **Order QR Codes** for scanning and printing tracking process
- 🖨️ **PDF Shipping Labels** with QR support for shipping 
- 🌙 **Responsive UI** for all devices

---

## 🛠️ Tech Stack

- ⚛️ **React 19** – Modern UI framework
- ⚡ **Vite** – Lightning-fast dev server and bundler
- 🧱 **Ant Design** – Elegant, professional UI components
- 🛒 **FakeStore API** – Product data source
- 🛡️ **Zustand** – State management
- 📦 **Axios** – API requests
- 🔐 **JWT** – Custom authentication logic
- 📄 **jsPDF + QRCode** – PDF label generation with QR support

---

## 🚀 Getting Started

```bash
git clone https://github.com/zeiadsalhin/Alfa-Store--React-Version-.git
cd Alfa-Store--React-Version-
npm install
npm run dev
```

## 🧩 Folder Structure

```bash
.
├── dist/                    # Production build output
├── node_modules/            # Project dependencies
├── public/                  # Static assets
├── src/                     # Application source code
│   ├── admin/               # Admin dashboard and related features
│   ├── assets/              # Images, icons, fonts
│   ├── components/          # Reusable UI components
│   ├── data/                # Static or mock data
│   ├── hooks/               # Custom React hooks
│   ├── middleware/          # Route guards or auth middleware
│   ├── pages/               # Page-level components (Home, Product, etc.)
│   ├── store/               # Zustand stores for global state
│   ├── utils/               # Utility functions and helpers
│   ├── App.jsx              # Main App component
│   ├── index.css            # Global CSS styles
│   └── main.jsx             # App entry point
├── .env                     # Environment variables
├── .gitignore               # Git ignored files
├── eslint.config.js         # ESLint configuration
├── index.html               # HTML template
├── package-lock.json        # Exact dependency versions
├── package.json             # Project metadata and scripts
├── re-store.code-workspace # VS Code workspace settings
├── README.md                # Project documentation
└── vite.config.js           # Vite configuration
```

## ✅ Completed Features

- 🔐 **Custom Authentication System** (Username, Email, Password)
- 📦 **Product Categories**: Electronics, Clothing, and Jewelry
- 🛒 **Shopping Cart** with dynamic updates
- 💳 **Checkout Page** with:
  - Multiple payment options
  - Discount codes
  - Shipping selection
- 🛍️ **Product Pages** with image, description, and rating
- 🧾 **Order Summary** and confirmation
- 📦 **QR Code Generation** for order tracking (scannable and printable)
- 👤 **User Account Dashboard**:
  - Email & Password change
  - 2FA Settings
  - Order history
- 🛡 **Protected Routes** for user and admin areas
- 🎨 **Responsive Design** for mobile and desktop
- 🔔 **Toast Notifications** for cart, auth, and actions
- ⚙️ **Admin Dashboard UI** for managing orders, branches, managers, printing reports, and tracking customers orders

---

## 🌍 Live Demo

[🔗 Visit Alfa Store](https://alfastorereact.netlify.app/) <!-- Replace with your actual live demo URL -->

---

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This project is licensed under the MIT License.

---

## 🙌 Credits

- 🧠 Powered by [FakeStoreAPI](https://fakestoreapi.com/)
- 💾 State Management with [Zustand](https://zustand-demo.pmnd.rs/)
- 🧩 UI Components via [Ant Design](https://ant.design/)
- ⚡ Built with [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- 🛠 Icons by [Simple Icons](https://simpleicons.org/)
- 📦 QR Code generation via [qrcode.react](https://www.npmjs.com/package/qrcode.react)

Developed with ❤️ by [Zeiad Abdeltawab](https://github.com/zeiadsalhin)
