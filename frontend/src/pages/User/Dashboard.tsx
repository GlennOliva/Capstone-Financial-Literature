import '../../css/style.css';
import Sidebar from '../../components/User/Sidebar';
import Navbar from '../../components/User/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CategoryPieChart from '../../components/User/CategoryPieChart';
import ExpenseBarChart from '../../components/User/ExpenseBarChart';

const Dashboard = () => {
  const [totalExpense, setTotalExpense] = useState<number | null>(null);
  const [totalBudget, setTotalBudget] = useState<number | null>(null);
  const [countGoals, setCountGoals] = useState<number | null>(null);
  const [countBudgetType, setCountBudgetType] = useState<number | null>(null);
  const apiUrl = import.meta.env.VITE_API_URL || "";  // Ensure this URL is correct
  const userId = localStorage.getItem('user_id') || "";
  // Fetch teacher count
  useEffect(() => {
    axios.get(`${apiUrl}/total_expense/${userId}`)
      .then((response) => {
        setTotalExpense(response.data.total_expense);
      })
      .catch((error) => {
        console.error("Error fetching total_expense:", error);
      });
  }, [apiUrl, userId]);

  useEffect(() => {
    axios.get(`${apiUrl}/total_budget/${userId}`)
      .then((response) => {
        setTotalBudget(response.data.total_budget);
      })
      .catch((error) => {
        console.error("Error fetching total_expense:", error);
      });
  }, [apiUrl, userId]);


  useEffect(() => {
    axios.get(`${apiUrl}/no_goals/${userId}`)
      .then((response) => {
        setCountGoals(response.data.no_goals);
      })
      .catch((error) => {
        console.error("Error fetching Count Goals:", error);
      });
  }, [apiUrl, userId]);

  useEffect(() => {
    axios.get(`${apiUrl}/no_budget_type/${userId}`)
      .then((response) => {
        setCountBudgetType(response.data.no_budget_type);
      })
      .catch((error) => {
        console.error("Error fetching Count Budget Type:", error);
      });
  }, [apiUrl, userId]);
  

  return (
    <div>
      <Sidebar />
      <section id="content">
        <Navbar />
        <main>
          <h1 className="title">Dashboard</h1>
          <ul className="breadcrumbs">
            <li><a href="#">Home</a></li>
            <li className="divider">/</li>
            <li><a href="#" className="active">Dashboard</a></li>
          </ul>
          <div className="info-data">
 
            <div className="card">
              <div className="head">
                <div>
                   <h2>{totalExpense !== null ? totalExpense.toLocaleString() : 'Loading...'}</h2> 
                  <p>TOTAL EXPENSES</p>
                </div>
                <i className='bx bx-group icon'></i>
              </div>
            </div>

            {/* Students Card */}
            <div className="card">
              <div className="head">
                <div>
                  <h2>{totalBudget !== null ? totalBudget.toLocaleString() : 'Loading...'}</h2> 
                  <p>TOTAL BUDGET</p>

                </div>
                <i className='bx bx-group icon'></i>
              </div>
            </div>

             {/* Students Card */}
             <div className="card">
              <div className="head">
                <div>
                  <h2>{countGoals !== null ? countGoals.toLocaleString() : 'Loading...'}</h2> 
                  <p>NO. GOALS</p>
                </div>
                <i className='bx bx-group icon'></i>
              </div>
            </div>

            {/* Students Card */}
            <div className="card">
              <div className="head">
                <div>
                <h2>{countBudgetType !== null ? countBudgetType.toLocaleString() : 'Loading...'}</h2>
                  <p>NO. BUDGET TYPE</p>
                </div>
                <i className='bx bx-group icon'></i>
              </div>
            </div>
		
				</div>

            

                <div className="data">
  <div className="content-data">
    <div className="head">
      <h3>PIE CHART OF CATEGORIES</h3>
      <div className="menu">
        <i className='bx bx-dots-horizontal-rounded icon'></i>
        <ul className="menu-link">
          <li><a href="#">Edit</a></li>
          <li><a href="#">Save</a></li>
          <li><a href="#">Remove</a></li>
        </ul>
      </div>
    </div>
    <div className="chart">
      <CategoryPieChart/>
    </div>
  </div>

  <div className="content-data">
    <div className="head">
      <h3>BAR CHART EXPENSES PER MONTH</h3>
      <div className="menu">
        <i className='bx bx-dots-horizontal-rounded icon'></i>
        <ul className="menu-link">
          <li><a href="#">Edit</a></li>
          <li><a href="#">Save</a></li>
          <li><a href="#">Remove</a></li>
        </ul>
      </div>
    </div>
    <div className="chart">
      <ExpenseBarChart />
    </div>
  </div>
</div>

        </main>
      </section>
    </div>
  );
};

export default Dashboard;
