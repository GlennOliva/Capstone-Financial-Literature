const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db.js');
const expenseRoutes = require('./routes/ExpenseRoutes');
const budgetRoutes = require('./routes/BudgetRoutes.js');
const userRoutes = require('./routes/UserRoutes');
const budgetTypeRoutes = require('./routes/BudgetTypeRoute.js');
const CategoryRoutes = require('./routes/CategoryRoutes.js');
const BudgetCalculatorRoutes = require('./routes/BudgetCalculatorRoutes.js');
const GoalRoutes = require("./routes/GoalRoutes.js")
const DashboardRoutes = require("./routes/DashboardRoutes.js")



app.use(cors()); // ✅ Allow all origins (for development)


app.use(express.json());
app.use('/api/expenses', expenseRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/user', userRoutes);
app.use('/api/budget_type', budgetTypeRoutes);
app.use('/api/category', CategoryRoutes);
app.use('/api/budget_calculator', BudgetCalculatorRoutes);
app.use('/uploads', express.static('uploads'));
app.use('/api/goals', GoalRoutes);
app.use(DashboardRoutes);


const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get('/', (request, response)=> {
    return response.json("Starting Node Server..");
})