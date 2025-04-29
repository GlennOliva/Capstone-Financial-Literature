import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/style.css';
import Sidebar from '../../components/User/Sidebar';
import Navbar from '../../components/User/Navbar';
import { Snackbar, Alert } from '@mui/material';

interface Goal {
  id: number;
  goal_name: string;
  target_amount: string;
  saved_amount: string;
 status: string;
}

const ManageProgress = () => {
  const [goal, setGoal] = useState<Goal[]>([]);
  const [filteredGoal, setFilteredGoal] = useState<Goal[]>([]); // For filtered results

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
      axios.get(`${apiUrl}/api/goals/${userId}`)
        .then(res => {
          setGoal(res.data);
          setFilteredGoal(res.data); // Initially show all expenses
        })
        .catch(err => console.error('Failed to fetch goals:', err));
    }
  }, [userId, apiUrl]);

//  const progress = (parseFloat(saved_amount) / parseFloat(target_amount)) * 100;

  const handleDelete = (goalId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this Goal Progress?');
    if (isConfirmed) {
      axios.delete(`${apiUrl}/api/goals/${goalId}`)
        .then(() => {
          setGoal(goal.filter((goal) => goal.id !== goalId));
          setSnackbar({
            open: true,
            message: "Goal deleted successfully!",
            severity: "success",
          });
  
          // Reload the page after a successful delete
          setTimeout(() => {
            window.location.reload();
          }, 2000); // Add a delay to allow the snackbar to be displayed before reloading
        })
        .catch(err => {
          console.error('Failed to delete goal:', err);
          setSnackbar({
            open: true,
            message: 'Failed to delete goal. Please try again.',
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
      const filtered = goal.filter(goal =>
        goal.goal_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredGoal(filtered);
    } else {
      setFilteredGoal(goal); // Show all expenses if search is empty
    }
  };

  // Pagination logic
  const indexOfLastGoal = currentPage * itemsPerPage;
  const indexOfFirstGoal = indexOfLastGoal - itemsPerPage;
  const currentGoal = filteredGoal.slice(indexOfFirstGoal, indexOfLastGoal);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Sidebar />
      <section id="content">
        <Navbar />
        <main>
          <h1 className="title">Manage Progress</h1>
          <ul className="breadcrumbs">
            <li><a href="#">Goal</a></li>
            <li className="divider">/</li>
            <li><a href="#" className="active">Manage Goal</a></li>
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


            <table className="efinance-table">
            <thead>
  <tr>
    <th>ID</th>
    <th>Goal Name</th>
    <th>Target Amount</th>
    <th>Save Amount</th>
    <th>Progress (%)</th> {/* New column */}
    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>
<tbody>
  {currentGoal.length > 0 ? (
    currentGoal.map((goal) => {
      const target = parseFloat(goal.target_amount);
      const saved = parseFloat(goal.saved_amount);
      const progress = target > 0 ? (saved / target) * 100 : 0;

      return (
        <tr key={goal.id}>
          <td>{goal.id}</td>
          <td>{goal.goal_name}</td>
          <td>₱{target.toFixed(2)}</td>
          <td>₱{saved.toFixed(2)}</td>
          <td>
  <div className="progress-container">
    <div
      className="progress-bar"
      style={{ width: `${progress}%` }}
    >
      <span className="progress-text">{progress.toFixed(1)}%</span>
    </div>
  </div>
</td>
<td>
  <span
    className={`px-2 py-1 rounded text-white font-medium text-sm ${
      goal.status === 'In Progress' ? 'bg-yellow-400 text-black' :
      goal.status === 'Pending' ? 'bg-orange-400' :
      goal.status === 'Failed' ? 'bg-red-500' :
      goal.status === 'Complete' ? 'bg-green-500' : 'bg-gray-300'
    }`}
  >
    {goal.status}
  </span>
</td>
          <td>
            <button onClick={() => handleDelete(goal.id)} className="btn delete-btn">
              Delete
            </button>
          </td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan={8}>No progress found.</td> {/* updated colSpan from 7 to 8 */}
    </tr>
  )}
</tbody>
            </table>

            <div className="efinance-table-footer">
              <span>Showing {currentGoal.length} entries</span>
              <div className="efinance-pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </button>
                {[...Array(Math.ceil(filteredGoal.length / itemsPerPage))].map((_, index) => (
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
                  disabled={currentPage === Math.ceil(filteredGoal.length / itemsPerPage)}
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


    </div>
  );
};

export default ManageProgress;
