const Category = require('../models/CategoryModel');

// Get all expenses
exports.getCategory = (req, res) => {
  Category.getCategory(req.params.userId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

// Add a new expense
exports.addCategory = (req, res) => {
  const data = req.body;
  Category.addCategory(data, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Category Success Added', id: result.insertId });
  });
};

// Delete expense
exports.deleteCategory = (req, res) => {
  Category.deleteCategory(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Category Type deleted!' });
  });
};

// ✅ Update expense
exports.updateCategory = (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  Category.updateCategory(id, updatedData, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category Type updated successfully!' });
  });
};
