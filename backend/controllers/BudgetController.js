const Budget = require('../models/BudgetModel');

// Get all expenses
exports.getBudget = (req, res) => {
  Budget.getBudget(req.params.userId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Add a new expense
exports.addBudget = (req, res) => {
  const data = req.body;
  Budget.addBudget(data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Budget Success Added', id: result.insertId });
  });
};

// Delete expense
exports.deleteBudget = (req, res) => {
  Budget.deleteBudget(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Budget deleted!' });
  });
};

// ✅ Update expense
exports.updateBudget = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  Budget.updateBudget(id, updatedData, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json({ message: 'Budget updated successfully!' });
  });
};
