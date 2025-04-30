const express = require('express');
const router = express.Router();
const controller = require('../controllers/DashboardController');

router.get('/total_expense/:id', controller.getTotalExpenseByID);
router.get('/total_budget/:id', controller.getTotalBudgetByID);
router.get('/no_goals/:id', controller.getCountGoalByID);
router.get('/no_budget_type/:id', controller.getCountBudgetTypeByID);
router.get('/pie_chart_category/:id', controller.getPieChartCategoryByID);
router.get('/bar_chart_expense_month/:id', controller.getBarChartExpensePerMonthByID);



module.exports = router;
