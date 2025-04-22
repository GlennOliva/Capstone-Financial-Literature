const db = require('../config/db'); // Make sure db.js connects MySQL using mysql2

// 🔹 Get all budgets for a user
exports.getBudget = (userId, callback) => {
  const sql = `
    SELECT
      b.id,
      b.name,
      b.budget_amount,
      b.budget_type_id,
      b.start_date,
      b.end_date,
      bt.budget_type_name
    FROM tbl_budgets b
    JOIN tbl_budget_type bt ON b.budget_type_id = bt.id
    WHERE b.user_id = ?
  `;
  db.query(sql, [userId], callback);
};

// 🔹 Add a new expense
exports.addBudget = (data, callback) => {
  const sql = `
    INSERT INTO tbl_budgets (user_id, name, budget_amount, budget_type_id, start_date, end_date)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.user_id,
    data.name,
    data.budget_amount,
    data.budget_type_id,
    data.start_date,
    data.end_date
  ];
  db.query(sql, values, callback);
};

// 🔹 Delete an expense by ID
exports.deleteBudget = (id, callback) => {
  const sql = 'DELETE FROM tbl_budgets WHERE id = ?';
  db.query(sql, [id], callback);
};

// 🔹 Update an expense by ID
exports.updateBudget = (id, data, callback) => {
  const sql = `
    UPDATE tbl_budgets
    SET user_id = ?, name = ? , budget_amount = ?, budget_type_id = ?,  start_date = ?, end_date = ?
    WHERE id = ?
  `;
  const values = [
    data.user_id,
    data.name,
    data.budget_amount,
    data.budget_type_id,
    data.start_date,
    data.end_date,
    id
  ];
  db.query(sql, values, callback);
};
