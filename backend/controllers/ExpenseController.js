const Expense = require('../models/ExpenseModel');

// Get all expenses
exports.getExpenses = (req, res) => {
  Expense.getExpenses(req.params.userId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Add a new expense
exports.addExpense = (req, res) => {
  const data = req.body;
  Expense.addExpense(data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Expense added!', id: result.insertId });
  });
};

// Delete expense
exports.deleteExpense = (req, res) => {
  Expense.deleteExpense(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Expense deleted!' });
  });
};

// ✅ Update expense
exports.updateExpense = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  Expense.updateExpense(id, updatedData, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.json({ message: 'Expense updated successfully!' });
  });
};
