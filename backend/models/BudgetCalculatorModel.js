const db = require('../config/db'); // Make sure db.js connects MySQL using mysql2

// 🔹 Get all expenses for a user
exports.getBudgetCalculator = (userId, callback) => {
  const sql = 'SELECT * FROM tbl_calculations WHERE user_id = ? ';
  db.query(sql, [userId], callback);
};

// 🔹 Add a new expense
exports.addBudgetCalculator = (data, callback) => {
  const sql = `
    INSERT INTO tbl_calculations (user_id, income, fixed_expenses, disposable_income, created_at)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [
    data.user_id,
    data.income,
    data.fixed_expenses,
    data.disposable_income,
    data.created_date
  ];
  db.query(sql, values, callback);
};

// 🔹 Delete an expense by ID
exports.deleteBudgetCalculator = (id, callback) => {
  const sql = 'DELETE FROM tbl_calculations WHERE id = ?';
  db.query(sql, [id], callback);
};

// 🔹 Update an expense by ID
exports.updateBudgetCalculator = (id, data, callback) => {
  const sql = `
    UPDATE tbl_calculations
    SET user_id = ?, income = ?, fixed_expenses = ?, disposable_income = ?, created_at = ?
    WHERE id = ?
  `;
  const values = [
    data.user_id,
    data.income,
    data.fixed_expenses,
    data.disposable_income,
    data.created_date,
    id
  ];
  db.query(sql, values, callback);
};
