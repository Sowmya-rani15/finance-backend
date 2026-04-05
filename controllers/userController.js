const db = require("../config/db");

// CREATE USER
exports.createUser = (req, res) => {
  const { name, email, role, status } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: "All fields required" });
  }

  const sql =
    "INSERT INTO users (name, email, role, status) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, email, role, status || "active"], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(201).json({ message: "User created successfully ✅" });
  });
};

// GET ALL USERS
exports.getUsers = (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.json(result);
  });
};