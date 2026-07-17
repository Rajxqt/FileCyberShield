# 🔐 FileCyberShield 

### File Integrity Monitoring & Security Event Dashboard

FileCyberShield is a lightweight cybersecurity project that detects unauthorised changes to important files by verifying file integrity using SHA-256 hashing.

The system monitors files, detects changes, records security events, and displays the results through an Express.js dashboard.

---

## 🚀 Features

- 🔍 SHA-256 file integrity verification
- ⚠️ Detect modified files
- 🆕 Detect newly added files
- ❌ Detect removed files
- 📊 Security monitoring dashboard
- 📝 Security event logging with MySQL

---


The system compares the current file hash against the stored hash. Any differences are recorded as security events.

---

## 🛠️ Technologies Used

- Node.js
- Express.js
- EJS
- MySQL
- SHA-256 Hashing

---

## ⚙️ Setup

### Install dependencies

```bash
npm install
```

### Configure database

Run database.sql in your MySQL Workbench.

Update your MySQL credentials in:

```
database.js
```

### Run application

```bash
node app.js
```
---

## 📚 Learning Outcomes

Through this project, I gained practical experience in:

- Cryptographic hashing
- File integrity monitoring
- Security event tracking
- Database-driven security solutions
- Building cybersecurity tools with web technologies

---

## 🔮 Future Improvements

- Real-time file monitoring
- User authentication
- Automated security alerts
- Incident report generation
- Multi-device monitoring

---

## 👨‍💻 Author

Raj Veer Singh  
Cyber Security & Digital Forensics Student @ Republic Polytechnic