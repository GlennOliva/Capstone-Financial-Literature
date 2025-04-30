import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/style.css';
import Sidebar from '../../components/User/Sidebar';
import Navbar from '../../components/User/Navbar';

import { Snackbar, Alert } from '@mui/material';
import AddBudgetCalculatorModal from '../../components/User/AddBudgetCalculatorModal';

interface BudgetCalculator {
  id: number;
  income: string;
  fixed_expenses: string;
  disposable_income: string;
  created_at: string;
}

const ManageBudgetCalculator = () => {
  const [budgetcalculator, setBudgetCalculator] = useState<BudgetCalculator[]>([]);
  const [filteredBudgetCalculator, setFilteredBudgetCalculator] = useState<BudgetCalculator[]>([]); // For filtered results
  const [isAddBudgetCalculatorOpen, setIsAddBudgetCalculatorOpen] = useState(false);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');

  const userId = localStorage.getItem('user_id');
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (userId) {
      axios.get(`${apiUrl}/api/budget_calculator/${userId}`)
        .then(res => {
          setBudgetCalculator(res.data);
          setFilteredBudgetCalculator(res.data); // Initially show all expenses
        })
        .catch(err => console.error('Failed to fetch budget calculator:', err));
    }
  }, [userId, apiUrl]);



  const handleDelete = (budgetcalculatorId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this budget calculator?');
    if (isConfirmed) {
      axios.delete(`${apiUrl}/api/budget_calculator/${budgetcalculatorId}`)
        .then(() => {
          setBudgetCalculator(budgetcalculator.filter((budgetcalculator) => budgetcalculator.id !== budgetcalculatorId));
          setSnackbar({
            open: true,
            message: "Budget Calculator deleted successfully!",
            severity: "success",
          });
  
          // Reload the page after a successful delete
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Add a delay to allow the snackbar to be displayed before reloading
        })
        .catch(err => {
          console.error('Failed to delete budget calculator:', err);
          setSnackbar({
            open: true,
            message: 'Failed to delete budget calculator. Please try again.',
            severity: 'error',
          });
        });
    }
  };
  

  const closeSnackbar = () => {
    setSnackbar({
      open: false,
      message: '',
      severity: 'info',
    });
  };

  // Handle search filter
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value) {
      const numericValue = Number(value);
    
      // Optional: Check if numericValue is a valid number
      if (!isNaN(numericValue)) {
        const filtered = budgetcalculator.filter(item =>
          item.income.toString().includes(numericValue.toString()) // 'contains' logic
        );
    
        setFilteredBudgetCalculator(filtered);
      } else {
        // If input is not a valid number, show all
        setFilteredBudgetCalculator(budgetcalculator);
      }
    } else {
      setFilteredBudgetCalculator(budgetcalculator); // Reset to all if input is cleared
    }
    
  };

  // Pagination logic
  const indexOfLastBudgetCalculator = currentPage * itemsPerPage;
  const indexOfFirstBudgetCalculator = indexOfLastBudgetCalculator - itemsPerPage;
  const currentBudgetCalculator = filteredBudgetCalculator.slice(indexOfFirstBudgetCalculator, indexOfLastBudgetCalculator);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Sidebar />
      <section id="content">
        <Navbar />
        <main>
          <h1 className="title">Budget Calculator</h1>
          <ul className="breadcrumbs">
            <li><a href="#">Budget Calculator</a></li>
            <li className="divider">/</li>
            <li><a href="#" className="active">Budget Calculator</a></li>
          </ul>

          <div className="efinance-table-container">
            <div className="efinance-table-controls">
              <input
                type="text"
                className="efinance-table-search"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="action-buttons">
              <button onClick={() => setIsAddBudgetCalculatorOpen(true)} className="btn add-btn">
                Add Calculations
              </button>
            </div>

            <table className="efinance-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Income</th>
                  <th>Fixed Expenses</th>
                  <th>Disposable Income</th>
                  <th>Created at</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBudgetCalculator.length > 0 ? (
                  currentBudgetCalculator.map((budgetcalculator) => (
                    <tr key={budgetcalculator.id}>
                      <td>{budgetcalculator.id}</td>
                      <td>₱{parseFloat(budgetcalculator.income).toFixed(2)}</td>
                      <td>₱{parseFloat(budgetcalculator.fixed_expenses).toFixed(2)}</td>
                      <td>₱{parseFloat(budgetcalculator.disposable_income).toFixed(2)}</td>
                      <td>{new Date(budgetcalculator.created_at).toLocaleDateString()}</td>
                      <td>
              
                        <button onClick={() => handleDelete(budgetcalculator.id)} className="btn delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No Budget Calculator found.</td>
                  </tr>
                )}
              </tbody>
            </table>

                       <div
  className="efinance-table-footer"
  style={{
    width: '100%',
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'space-between',
    padding: '10px',
    marginTop: '20px',
    gap: '10px'
  }}
>
  <span>Showing {currentBudgetCalculator.length} entries</span>
  <div
    className="efinance-pagination"
    style={{
      display: 'flex',
      gap: '6px'
    }}
  >
    <button
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
      style={{
        margin: '0 4px',
        padding: '6px 10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#f3f4f6',
        cursor: 'pointer'
      }}
    >
      Previous
    </button>
    {[...Array(Math.ceil(filteredBudgetCalculator.length / itemsPerPage))].map((_, index) => (
      <button
        key={index}
        onClick={() => paginate(index + 1)}
        style={{
          margin: '0 4px',
          padding: '6px 10px',
          border: 'none',
          borderRadius: '4px',
          backgroundColor: currentPage === index + 1 ? '#3b82f6' : '#f3f4f6',
          color: currentPage === index + 1 ? 'white' : 'black',
          cursor: 'pointer'
        }}
      >
        {index + 1}
      </button>
    ))}
    <button
      onClick={() => paginate(currentPage + 1)}
      disabled={currentPage === Math.ceil(filteredBudgetCalculator.length / itemsPerPage)}
      style={{
        margin: '0 4px',
        padding: '6px 10px',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: '#f3f4f6',
        cursor: 'pointer'
      }}
    >
      Next
    </button>
  </div>
</div>
          </div>
        </main>
      </section>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Modals */}
      {isAddBudgetCalculatorOpen && <AddBudgetCalculatorModal onClose={() => setIsAddBudgetCalculatorOpen(false)} />}
  
    </div>
  );
};

export default ManageBudgetCalculator;
