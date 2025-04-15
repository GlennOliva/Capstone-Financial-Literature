const db = require('../config/db'); // Make sure db.js connects MySQL using mysql2

// 🔹 Get all expenses for a user
exports.getCategory = (userId, callback) => {
  const sql = 'SELECT * FROM tbl_category WHERE user_id = ? ';
  db.query(sql, [userId], callback);
};

// 🔹 Add a new expense
exports.addCategory = (data, callback) => {
  const sql = `
    INSERT INTO tbl_category (user_id, category_name)
    VALUES (?, ?)
  `;
  const values = [
    data.user_id,
    data.category_name
  ];
  db.query(sql, values, callback);
};

// 🔹 Delete an expense by ID
exports.deleteCategory = (id, callback) => {
  const sql = 'DELETE FROM tbl_category WHERE id = ?';
  db.query(sql, [id], callback);
};

// 🔹 Update an expense by ID
exports.updateCategory = (id, data, callback) => {
  const sql = `
    UPDATE tbl_category
    SET user_id = ?,  category_name = ?
    WHERE id = ?
  `;
  const values = [
    data.user_id,
    data.category_name,
    id
  ];
  db.query(sql, values, callback);
};
