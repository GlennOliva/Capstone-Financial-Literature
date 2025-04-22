import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/style.css';
import Sidebar from '../../components/User/Sidebar';
import Navbar from '../../components/User/Navbar';
import AddGoalModal from '../../components/User/AddGoalModal';
import UpdateGoalModal from '../../components/User/UpdateGoalModal';
import { Snackbar, Alert } from '@mui/material';

interface Goal {
  id: number;
  goal_name: string;
  target_amount: string;
  saved_amount: string;
  deadline: string;
 status: string;
}

const ManageGoal = () => {
  const [goal, setGoal] = useState<Goal[]>([]);
  const [filteredGoal, setFilteredGoal] = useState<Goal[]>([]); // For filtered results
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
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

  const handleUpdate = (goalId: number) => {
    const goalToUpdate = goal.find((goal) => goal.id === goalId);
    setSelectedGoal(goalToUpdate || null);
  };

  const handleDelete = (goalId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this Goals?');
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
          <h1 className="title">Manage Goals</h1>
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

            <div className="action-buttons">
              <button onClick={() => setIsAddGoalOpen(true)} className="btn add-btn">
                Add Goal
              </button>
            </div>

            <table className="efinance-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Goal Name</th>
                  <th>Target Amount</th>
                  <th>Save Amount</th>
                  <th>Deadline</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentGoal.length > 0 ? (
                  currentGoal.map((goal) => (
                    <tr key={goal.id}>
                        <td>{goal.id}</td>
                      <td>{goal.goal_name}</td>
                      <td>₱{parseFloat(goal.target_amount).toFixed(2)}</td>
                      <td>₱{parseFloat(goal.saved_amount).toFixed(2)}</td>
                      <td>{new Date(goal.deadline).toLocaleDateString()}</td>
                      <td>{goal.status}</td>
                      <td>
                        <button onClick={() => handleUpdate(goal.id)} className="btn update-btn">
                          Update
                        </button>
                        <button onClick={() => handleDelete(goal.id)} className="btn delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No goal found.</td>
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

      {/* Modals */}
      {isAddGoalOpen && <AddGoalModal onClose={() => setIsAddGoalOpen(false)} />}
      {selectedGoal && (
        <UpdateGoalModal onClose={() => setSelectedGoal(null)} goal={selectedGoal} />
      )}
    </div>
  );
};

export default ManageGoal;
