const db = require('../config/db'); // Ensure this is mysql2/promise or callback-based mysql2

exports.getTotalExpenseByID = (userId, callback) => {
    const sql = `SELECT SUM(amount) AS total_expense FROM tbl_expenses WHERE user_id = ?`;
    db.query(sql, [userId], (error, results) => {
        if (error) return callback(error, null);
        callback(null, results);
    });
};

exports.getTotalBudgetByID = (userId, callback) => {
    const sql = `SELECT SUM(budget_amount) AS total_budget FROM tbl_budgets WHERE user_id = ?`;
    db.query(sql, [userId], (error, results) => {
        if (error) return callback(error, null);
        callback(null, results);
    });
};

exports.getCountGoalByID = (userId, callback) => {
    const sql = `SELECT COUNT(*) AS no_goals FROM tbl_goals WHERE user_id = ?`;
    db.query(sql, [userId], (error, results) => {
        if (error) return callback(error, null);
        callback(null, results);
    });
};

exports.getCountBudgetTypeByID = (userId, callback) => {
    const sql = `SELECT COUNT(*) AS no_budget_type FROM tbl_budget_type WHERE user_id = ?`;
    db.query(sql, [userId], (error, results) => {
        if (error) return callback(error, null);
        callback(null, results);
    });
};


exports.getPieChartCategoryByID = (userId, callback) => {
    const sql = `
      SELECT category_name
      FROM tbl_category
      WHERE user_id = ?
    `;
    db.query(sql, [userId], (error, results) => {
      if (error) return callback(error, null);
      // Ensure the result is an array of objects
      callback(null, results);
    });
 };
 

 exports.getBarChartExpensePerMonthByID = (userId, callback) => {
    const sql = `
      SELECT DATE_FORMAT(expense_date, '%Y-%m') AS month, 
             SUM(amount) AS total_expense,
             name
      FROM tbl_expenses
      WHERE user_id = ?
      GROUP BY month, name
      ORDER BY month ASC
    `;
    db.query(sql, [userId], (error, results) => {
      if (error) return callback(error, null);
      callback(null, results);
    });
  };
  
  
  
  
  