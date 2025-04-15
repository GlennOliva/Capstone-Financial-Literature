const db = require('../config/db'); // Make sure db.js connects MySQL using mysql2

// 🔹 Get all expenses for a user
exports.getGoal = (userId, callback) => {
  const sql = 'SELECT * FROM tbl_goals WHERE user_id = ? ';
  db.query(sql, [userId], callback);
};

// 🔹 Add a new expense
exports.addGoal = (data, callback) => {
  const sql = `
    INSERT INTO tbl_goals (user_id, goal_name, target_amount, saved_amount, deadline, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.user_id,
    data.goal_name,
    data.target_amount,
    data.saved_amount,
    data.deadline,
    data.status
  ];
  db.query(sql, values, callback);
};

// 🔹 Delete an expense by ID
exports.deleteGoal = (id, callback) => {
  const sql = 'DELETE FROM tbl_goals WHERE id = ?';
  db.query(sql, [id], callback);
};

// 🔹 Update an expense by ID
exports.updateGoal = (id, data, callback) => {
  const sql = `
    UPDATE tbl_goals
    SET user_id = ?, goal_name = ?, target_amount = ?, saved_amount = ?, deadline = ?, status = ?
    WHERE id = ?
  `;
  const values = [
    data.user_id,
    data.goal_name,
    data.target_amount,
    data.saved_amount,
    data.deadline,
    data.status,
    id
  ];
  db.query(sql, values, callback);
};
