import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/style.css';
import Sidebar from '../../components/User/Sidebar';
import Navbar from '../../components/User/Navbar';
import AddExpenseModal from '../../components/User/AddExpenseModal';
import UpdateExpenseModal from '../../components/User/UpdateExpenseModal';
import { Snackbar, Alert } from '@mui/material';

interface Expense {
  id: number;
  name: string;
  amount: string;
  category_id: number;
  category_name: string;
  expense_date: string;
  notes: string;
}

const ManageExpense = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]); // For filtered results
  const [selectedExpense, setSelectedExpense] = useState<Expense | null>(null);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
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
      axios.get(`${apiUrl}/api/expenses/${userId}`)
        .then(res => {
          setExpenses(res.data);
          setFilteredExpenses(res.data); // Initially show all expenses
        })
        .catch(err => console.error('Failed to fetch expenses:', err));
    }
  }, [userId, apiUrl]);

  const handleUpdate = (expenseId: number) => {
    const expenseToUpdate = expenses.find((expense) => expense.id === expenseId);
    setSelectedExpense(expenseToUpdate || null);
  };

  const handleDelete = (expenseId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this expense?');
    if (isConfirmed) {
      axios.delete(`${apiUrl}/api/expenses/${expenseId}`)
        .then(() => {
          setExpenses(expenses.filter((expense) => expense.id !== expenseId));
          setSnackbar({
            open: true,
            message: "Expense deleted successfully!",
            severity: "success",
          });
  
          // Reload the page after a successful delete
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Add a delay to allow the snackbar to be displayed before reloading
        })
        .catch(err => {
          console.error('Failed to delete expense:', err);
          setSnackbar({
            open: true,
            message: 'Failed to delete expense. Please try again.',
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
      const filtered = expenses.filter(expense =>
        expense.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredExpenses(filtered);
    } else {
      setFilteredExpenses(expenses); // Show all expenses if search is empty
    }
  };

  // Pagination logic
  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = filteredExpenses.slice(indexOfFirstExpense, indexOfLastExpense);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Sidebar />
      <section id="content">
        <Navbar />
        <main>
          <h1 className="title">Manage Expense</h1>
          <ul className="breadcrumbs">
            <li><a href="#">Expense</a></li>
            <li className="divider">/</li>
            <li><a href="#" className="active">Manage Expense</a></li>
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
              <button onClick={() => setIsAddExpenseOpen(true)} className="btn add-btn">
                Add Expense
              </button>
            </div>

            <table className="efinance-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Expense Name</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Note</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentExpenses.length > 0 ? (
                  currentExpenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.id}</td>
                      <td>{expense.name}</td>
                      <td>₱{parseFloat(expense.amount).toFixed(2)}</td>
                      <td>{expense.category_name}</td>
                      <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
                      <td>{expense.notes}</td>
                      <td>
                        <button onClick={() => handleUpdate(expense.id)} className="btn update-btn">
                          Update
                        </button>
                        <button onClick={() => handleDelete(expense.id)} className="btn delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No expenses found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="efinance-table-footer">
              <span>Showing {currentExpenses.length} entries</span>
              <div className="efinance-pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </button>
                {[...Array(Math.ceil(filteredExpenses.length / itemsPerPage))].map((_, index) => (
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
                  disabled={currentPage === Math.ceil(filteredExpenses.length / itemsPerPage)}
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
      {isAddExpenseOpen && <AddExpenseModal onClose={() => setIsAddExpenseOpen(false)} />}
      {selectedExpense && (
        <UpdateExpenseModal onClose={() => setSelectedExpense(null)} expense={selectedExpense} />
      )}
    </div>
  );
};

export default ManageExpense;
