const db = require("../config/db");

// CREATE RECORD
exports.createRecord = (req, res) => {
  const { amount, type, category, date, note } = req.body;

  if (!amount || !type) {
    return res.status(400).json({ message: "Amount and type required" });
  }

  db.query(
    "INSERT INTO records (amount, type, category, date, note) VALUES (?, ?, ?, ?, ?)",
    [amount, type, category, date, note],
    (err) => {
      if (err) return res.status(500).json(err);
      res.status(201).json({ message: "Record added successfully ✅" });
    }
  );
};

// GET ALL RECORDS
exports.getRecords = (req, res) => {
  db.query("SELECT * FROM records", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// GET RECORD BY ID
exports.getRecordById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM records WHERE id=?", [id], (err, result) => {
    if (err) return res.status(500).json(err);

    if (result.length === 0) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(result[0]);
  });
};

// UPDATE RECORD
exports.updateRecord = (req, res) => {
  const { id } = req.params;
  const { amount, type, category, date, note } = req.body;

  db.query(
    "UPDATE records SET amount=?, type=?, category=?, date=?, note=? WHERE id=?",
    [amount, type, category, date, note, id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Record updated ✅" });
    }
  );
};

// DELETE RECORD
exports.deleteRecord = (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM records WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Record deleted ✅" });
  });
};

// TOTAL INCOME
exports.getTotalIncome = (req, res) => {
  db.query(
    "SELECT IFNULL(SUM(amount),0) AS totalIncome FROM records WHERE type='income'",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

// TOTAL EXPENSE
exports.getTotalExpense = (req, res) => {
  db.query(
    "SELECT IFNULL(SUM(amount),0) AS totalExpense FROM records WHERE type='expense'",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

// NET BALANCE
exports.getNetBalance = (req, res) => {
  db.query(
    `
    SELECT 
      IFNULL(SUM(CASE WHEN type='income' THEN amount ELSE 0 END),0) -
      IFNULL(SUM(CASE WHEN type='expense' THEN amount ELSE 0 END),0) 
      AS netBalance
    FROM records
    `,
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result[0]);
    }
  );
};

// CATEGORY SUMMARY
exports.getCategorySummary = (req, res) => {
  db.query(
    "SELECT category, IFNULL(SUM(amount),0) AS total FROM records GROUP BY category",
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};