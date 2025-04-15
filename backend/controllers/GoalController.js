const Goal = require('../models/GoalModel');

// Get all expenses
exports.getGoal = (req, res) => {
  Goal.getGoal(req.params.userId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Add a new expense
exports.addGoal = (req, res) => {
  const data = req.body;
  Goal.addGoal(data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Goal Success Added', id: result.insertId });
  });
};

// Delete expense
exports.deleteGoal = (req, res) => {
  Goal.deleteGoal(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Goal deleted!' });
  });
};

// ✅ Update expense
exports.updateGoal = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  Goal.updateGoal(id, updatedData, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    res.json({ message: 'Goal updated successfully!' });
  });
};
