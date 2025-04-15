const BudgetType = require('../models/BudgetTypeModel');

// Get all expenses
exports.getBudgetType = (req, res) => {
  BudgetType.getBudgetType(req.params.userId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Add a new expense
exports.addBudgetType = (req, res) => {
  const data = req.body;
  BudgetType.addBudgetType(data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Budget Type Success Added', id: result.insertId });
  });
};

// Delete expense
exports.deleteBudgetType = (req, res) => {
  BudgetType.deleteBudgetType(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Budget Type deleted!' });
  });
};

// ✅ Update expense
exports.updateBudgetType = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  BudgetType.updateBudgetType(id, updatedData, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    res.json({ message: 'Budget Type updated successfully!' });
  });
};
