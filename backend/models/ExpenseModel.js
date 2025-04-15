const db = require('../config/db'); // Make sure db.js connects MySQL using mysql2

// 🔹 Get all expenses for a user
exports.getExpenses = (userId, callback) => {
  const sql = 'SELECT * FROM tbl_expenses WHERE user_id = ? ORDER BY expense_date DESC';
  db.query(sql, [userId], callback);
};

// 🔹 Add a new expense
exports.addExpense = (data, callback) => {
  const sql = `
    INSERT INTO tbl_expenses (user_id, name, amount, category_id, expense_date, notes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.user_id,
    data.name,
    data.amount,
    data.category_id,
    data.expense_date,
    data.notes
  ];
  db.query(sql, values, callback);
};

// 🔹 Delete an expense by ID
exports.deleteExpense = (id, callback) => {
  const sql = 'DELETE FROM tbl_expenses WHERE id = ?';
  db.query(sql, [id], callback);
};

// 🔹 Update an expense by ID
exports.updateExpense = (id, data, callback) => {
  const sql = `
    UPDATE tbl_expenses 
    SET user_id = ?, name = ?, amount = ?, category_id = ?, expense_date = ?, notes = ?
    WHERE id = ?
  `;
  const values = [
    data.user_id,
    data.name,
    data.amount,
    data.category_id,
    data.expense_date,
    data.notes,
    id
  ];
  db.query(sql, values, callback);
};
