const express = require("express");
const router = express.Router();

const checkRole = require("../middleware/authMiddleware");

const {
  createUser,
  getUsers,
} = require("../controllers/userController");

// ADMIN only → create user
router.post("/", checkRole(["admin"]), createUser);

// ADMIN + ANALYST → view users
router.get("/", checkRole(["admin", "analyst"]), getUsers);

module.exports = router;