# BDA Lab Website (Big Data Analytics)

A Node.js and MongoDB-based lab website designed to showcase BDA research projects, publications, and provide secure document management for registered users.

## 📌 Project Summary

This project was developed as part of the Big Data Analytics Lab in August 2023. It enables lab members to:

- View details about current projects and publications
- Upload and manage paper records (for authorized users only)
- Receive email notifications on uploads
- Access a private dashboard securely

---

## 🔐 Key Features

- User authentication and role-based access
- File upload system with confidentiality controls
- Secure project and paper record access for PhD students
- Modern UI with HTML, CSS, JS frontend
- MongoDB database for record storage

---

## 🛠️ Tech Stack

| Layer     | Technology              |
|-----------|--------------------------|
| Frontend  | HTML, CSS, JavaScript    |
| Backend   | Node.js, Express.js      |
| Database  | MongoDB (Mongoose)       |
| Auth      | JWT (or similar), Private routing |
| Email     | NodeMailer / SMTP (if included) |

---

## 📂 Folder Structure

```
Se-Project-main/
├── index.js
├── package.json
├── private.js
├── middlewars/
├── model/
├── Routes/
├── static/         # CSS and JS assets
├── views/          # Handlebars or EJS templates
```

---

##  How to Run Locally

1. **Install dependencies**  
   ```
   npm install
   ```

2. **Start the server**  
   ```
   node index.js
   ```

3. **Visit**  
   ```
   http://localhost:3000
   ```

> ⚠️ Configure MongoDB URI and secrets in `private.js` before running.

---

## 📜 License

This repository is intended for academic and learning purposes.
