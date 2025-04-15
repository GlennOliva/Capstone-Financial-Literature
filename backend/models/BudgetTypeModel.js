const db = require('../config/db'); // Make sure db.js connects MySQL using mysql2

// 🔹 Get all expenses for a user
exports.getBudgetType = (userId, callback) => {
  const sql = 'SELECT * FROM tbl_budget_type WHERE user_id = ? ';
  db.query(sql, [userId], callback);
};

// 🔹 Add a new expense
exports.addBudgetType = (data, callback) => {
  const sql = `
    INSERT INTO tbl_budget_type (user_id, budget_type_name)
    VALUES (?, ?)
  `;
  const values = [
    data.user_id,
    data.budget_type_name
  ];
  db.query(sql, values, callback);
};

// 🔹 Delete an expense by ID
exports.deleteBudgetType = (id, callback) => {
  const sql = 'DELETE FROM tbl_budget_type WHERE id = ?';
  db.query(sql, [id], callback);
};

// 🔹 Update an expense by ID
exports.updateBudgetType = (id, data, callback) => {
  const sql = `
    UPDATE tbl_budget_type
    SET user_id = ?,  budget_type_name = ?
    WHERE id = ?
  `;
  const values = [
    data.user_id,
    data.budget_type_name,
    id
  ];
  db.query(sql, values, callback);
};
