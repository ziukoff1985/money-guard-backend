<div align="center">
    <img src="https://i.imgur.com/GuI9t8v.png" width="250" height="250">
</div>
<div align="center">

# 🔥 FLAME - Fullstack League for Asset Management & Encryption

</div>

### A REST API backend for managing personal finances and securing user data.

---

## 📄 Project Description

**This project is suitable for:**

- Providing a secure and scalable backend for personal finance management
- Enabling seamless integration with frontend for budget tracking and financial planning

## ✨ Key Features

- REST API for managing income and expense transactions (create, read, update, delete)
- Detailed transaction summaries by period with category titles
- Ability to upload user avatar using Cloudinary and Multer
- Secure user authentication and authorization with JWT
- API documentation via [Swagger UI](https://money-guard-backend-ulen.onrender.com/api-docs/).
- Input validation with Joi
- Error handling with custom HTTP errors
- MongoDB for efficient data storage and retrieval
- Based on secure and scalable architecture

---

## ⚙️ Technologies Used

**The following tools and libraries were used:**

- [Node.js](https://nodejs.org/) — Runtime environment
- [Express](https://expressjs.com/) — Web framework
- [MongoDB](https://www.mongodb.com/) — NoSQL database
- [Mongoose](https://mongoosejs.com/) — MongoDB ORM
- [Swagger](https://swagger.io/) ([swagger-ui-express](https://www.npmjs.com/package/swagger-ui-express)) — API documentation
- [Cloudinary](https://cloudinary.com/) — Cloud storage for images
- [Multer](https://www.npmjs.com/package/multer) — File upload middleware
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) — JWT authentication
- [Joi](https://joi.dev/) — Input validation
- [http-errors](https://www.npmjs.com/package/http-errors) — Custom error handling
- [Cors](https://www.npmjs.com/package/cors) — Cross-Origin Resource Sharing
- [bcrypt](https://www.npmjs.com/package/bcrypt) — Password hashing
- [cookie-parser](https://www.npmjs.com/package/cookie-parser) — Cookie parsing middleware
- [dotenv](https://www.npmjs.com/package/dotenv) — Environment variable management
- [pino-http](https://www.npmjs.com/package/pino-http) — HTTP request logging

---

## 🚀 How to Launch the Project

### 1. Clone the repository:

```bash
git clone https://github.com/ziukoff1985/money-guard-backend.git
```

### 2. Navigate to the project folder:

```bash
cd money-guard-backend
```

### 3. Install dependencies:

```bash
npm install
```

### 4. Run the project:

```bash
npm run dev
```

**Make sure you have Node.js (version 16 or later) installed.**

---

## 👥 Team Members

- **Team Leader**: [Borys Ziukov](https://github.com/ziukoff1985)
- **Scrum Master**: [Khrystyna Storozhuk](https://github.com/kris9899)
- **Developers:**
  - [Yelyzaveta Apostol](https://github.com/llizzokk) — Transactions
  - [Alina Ponomarenko](https://github.com/perpera) — Authentication and Authorization
  - [Viacheslav Skrypnyk](https://github.com/Seresun) — Categories
  - [Khrystyna Storozhuk](https://github.com/kris9899) — User photo uploading
  - [Borys Ziukov](https://github.com/ziukoff1985) — orchestrator and team leader, all basic backend settings and initial structure (server, database, dependencies), user and summary statistics endpoints, documentation, swagger settings

---

## 🌐️ Live Demo

Check out the API documentation: [Money Guard API](https://money-guard-backend-ulen.onrender.com/api-docs/)

---

## 📜 License

This project is licensed under the **MIT License**.
