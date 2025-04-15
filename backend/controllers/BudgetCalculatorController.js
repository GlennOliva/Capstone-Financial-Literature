const BudgetCalculator = require('../models/BudgetCalculatorModel');

// Get all expenses
exports.getBudgetCalculator = (req, res) => {
  BudgetCalculator.getBudgetCalculator(req.params.userId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.addBudgetCalculator = (req, res) => {
    const data = req.body;
  
    // Ensure numeric values
    const income = parseFloat(data.income) || 0;
    const fixed_expenses = parseFloat(data.fixed_expenses) || 0;
  
    // Calculate disposable income
    const disposable_income = income - fixed_expenses;
  
    const budgetData = {
      ...data,
      income,
      fixed_expenses,
      disposable_income
    };
  
    BudgetCalculator.addBudgetCalculator(budgetData, (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: 'Budget Calculator Successfully Added', id: result.insertId });
    });
  };

// Delete expense
exports.deleteBudgetCalculator = (req, res) => {
  BudgetCalculator.deleteBudgetCalculator(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Budget Calculator deleted!' });
  });
};

exports.updateBudgetCalculator = (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
  
    const income = parseFloat(updatedData.income) || 0;
    const fixed_expenses = parseFloat(updatedData.fixed_expenses) || 0;
    const disposable_income = income - fixed_expenses;
  
    const budgetData = {
      ...updatedData,
      income,
      fixed_expenses,
      disposable_income
    };
  
    BudgetCalculator.updateBudgetCalculator(id, budgetData, (err, result) => {
      if (err) return res.status(500).json({ error: err });
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Budget Calculator not found' });
      }
  
      res.json({ message: 'Budget Calculator updated successfully!' });
    });
  };