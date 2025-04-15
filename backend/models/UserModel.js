const db = require('../config/db'); // Make sure db.js connects MySQL using mysql2

// 🔹 Get all expenses for a user
exports.getUser = (userId, callback) => {
  const sql = 'SELECT * FROM tbl_user';
  db.query(sql, [userId], callback);
};

// 🔹 Add a new expense
exports.addUser = (data, callback) => {
  const sql = `
    INSERT INTO tbl_user (full_name , email , password , image , address)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [
    data.full_name,
    data.email,
    data.password,
    data.image,
    data.address
  ];
  db.query(sql, values, callback);
};

// 🔹 Update an expense by ID
exports.updateUser = (id, data, callback) => {
  const sql = `
    UPDATE tbl_user
    SET full_name = ? , email = ? , password = ? , image = ? , address = ?
    WHERE id = ?
  `;
  const values = [
    data.full_name,
    data.email,
    data.password,
    data.image,
    data.address
  ];
  db.query(sql, values, callback);
};


// 🔐 Login function
exports.loginUser = (email, password, callback) => {
    const sql = `SELECT * FROM tbl_user WHERE email = ? AND password = ?`;
    db.query(sql, [email, password], callback);
  };
  