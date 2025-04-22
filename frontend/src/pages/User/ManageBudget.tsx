import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/style.css';
import Sidebar from '../../components/User/Sidebar';
import Navbar from '../../components/User/Navbar';
import AddBudgetModal from '../../components/User/AddBudgetModal';
import UpdateBudgetModal from '../../components/User/UpdateBudgetModal';
import { Snackbar, Alert } from '@mui/material';

interface Budget {
  id: number;
  name: string;
  budget_amount: string;
  budget_type_id: number;
  start_date: string;
  end_date: string;
  budget_type_name: string;
}

const ManageBudget = () => {
  const [budget, setBudget] = useState<Budget[]>([]);
  const [filteredBudget, setFilteredBudget] = useState<Budget[]>([]); // For filtered results
  const [selectedBudget, setSelectedBudget] = useState<Budget | null>(null);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
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
      axios.get(`${apiUrl}/api/budget/${userId}`)
        .then(res => {
          setBudget(res.data);
          setFilteredBudget(res.data); // Initially show all expenses
        })
        .catch(err => console.error('Failed to fetch budget:', err));
    }
  }, [userId, apiUrl]);

  const handleUpdate = (budgetId: number) => {
    const budgetToUpdate = budget.find((budget) => budget.id === budgetId);
    setSelectedBudget(budgetToUpdate || null);
  };

  const handleDelete = (budgetId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this budget?');
    if (isConfirmed) {
      axios.delete(`${apiUrl}/api/budget/${budgetId}`)
        .then(() => {
          setBudget(budget.filter((budget) => budget.id !== budgetId));
          setSnackbar({
            open: true,
            message: "Budget deleted successfully!",
            severity: "success",
          });
  
          // Reload the page after a successful delete
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Add a delay to allow the snackbar to be displayed before reloading
        })
        .catch(err => {
          console.error('Failed to delete budget:', err);
          setSnackbar({
            open: true,
            message: 'Failed to delete budget. Please try again.',
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
      const filtered = budget.filter(budget =>
        budget.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBudget(filtered);
    } else {
      setFilteredBudget(budget); // Show all expenses if search is empty
    }
  };

  // Pagination logic
  const indexOfLastBudget = currentPage * itemsPerPage;
  const indexOfFirstBudget = indexOfLastBudget - itemsPerPage;
  const currentBudget = filteredBudget.slice(indexOfFirstBudget, indexOfLastBudget);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Sidebar />
      <section id="content">
        <Navbar />
        <main>
          <h1 className="title">Manage Budget</h1>
          <ul className="breadcrumbs">
            <li><a href="#">Budget</a></li>
            <li className="divider">/</li>
            <li><a href="#" className="active">Manage Budget</a></li>
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
              <button onClick={() => setIsAddBudgetOpen(true)} className="btn add-btn">
                Add Budget
              </button>
            </div>

            <table className="efinance-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Budget Name</th>
                  <th>Budget Amount</th>
                  <th>Budget Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBudget.length > 0 ? (
                  currentBudget.map((budget) => (
                    <tr key={budget.id}>
                      <td>{budget.id}</td>
                      <td>{budget.name}</td>
                      <td>₱{parseFloat(budget.budget_amount).toFixed(2)}</td>
                      <td>{budget.budget_type_name}</td>
                      <td>{new Date(budget.start_date).toLocaleDateString()}</td>
                      <td>{new Date(budget.end_date).toLocaleDateString()}</td>
                      <td>
                        <button onClick={() => handleUpdate(budget.id)} className="btn update-btn">
                          Update
                        </button>
                        <button onClick={() => handleDelete(budget.id)} className="btn delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No budget found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="efinance-table-footer">
              <span>Showing {currentBudget.length} entries</span>
              <div className="efinance-pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </button>
                {[...Array(Math.ceil(filteredBudget.length / itemsPerPage))].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => paginate(index + 1)}
                    className={currentPage === index + 1 ? 'active' : ''}
                  >
                    {index + 1}
                  </button>
                ))}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === Math.ceil(filteredBudget.length / itemsPerPage)}
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
      {isAddBudgetOpen && <AddBudgetModal onClose={() => setIsAddBudgetOpen(false)} />}
      {selectedBudget && (
        <UpdateBudgetModal onClose={() => setSelectedBudget(null)} budget={selectedBudget} />
      )}
    </div>
  );
};

export default ManageBudget;
