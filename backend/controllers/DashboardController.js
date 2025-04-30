const Dashboard = require('../models/DashboardModel');

// 🔍 Get a specific user by ID
exports.getTotalExpenseByID = (req, res) => {
    const userId = req.params.id;
  
    Dashboard.getTotalExpenseByID(userId, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(result[0]);
    });
  }; 


  exports.getTotalBudgetByID = (req, res) => {
    const userId = req.params.id;
  
    Dashboard.getTotalBudgetByID(userId, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(result[0]);
    });
  }; 


  exports.getCountGoalByID = (req, res) => {
    const userId = req.params.id;
  
    Dashboard.getCountGoalByID(userId, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(result[0]);
    });
  }; 

  exports.getCountBudgetTypeByID = (req, res) => {
    const userId = req.params.id;
  
    Dashboard.getCountBudgetTypeByID(userId, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(result[0]);
    });
  }; 


  exports.getPieChartCategoryByID = (req, res) => {
    const userId = req.params.id;
    Dashboard.getPieChartCategoryByID(userId, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
      // Return the result as an array of category names
      res.status(200).json(result);
    });
 };
 


 exports.getBarChartExpensePerMonthByID = (req, res) => {
    const userId = req.params.id;
  
    Dashboard.getBarChartExpensePerMonthByID(userId, (err, result) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
  
      if (result.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(result); // Send the array of results
    });
  };
  