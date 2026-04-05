const express = require("express");
const router = express.Router();

const checkRole = require("../middleware/authMiddleware");

const {
  createRecord,
  getRecords,
  getRecordById,
  updateRecord,
  deleteRecord,
  getTotalIncome,
  getTotalExpense,
  getNetBalance,
  getCategorySummary,
} = require("../controllers/recordController");

// CREATE (Admin only)
router.post("/", checkRole(["admin"]), createRecord);

// READ ALL (All roles)
router.get("/", checkRole(["admin", "analyst", "viewer"]), getRecords);

// 🔥 DASHBOARD ROUTES (MUST COME BEFORE :id)
router.get("/income", checkRole(["admin", "analyst"]), getTotalIncome);
router.get("/expense", checkRole(["admin", "analyst"]), getTotalExpense);
router.get("/balance", checkRole(["admin", "analyst"]), getNetBalance);
router.get("/category", checkRole(["admin", "analyst"]), getCategorySummary);

// READ BY ID (All roles)
router.get("/:id", checkRole(["admin", "analyst", "viewer"]), getRecordById);

// UPDATE (Admin only)
router.put("/:id", checkRole(["admin"]), updateRecord);

// DELETE (Admin only)
router.delete("/:id", checkRole(["admin"]), deleteRecord);

module.exports = router;