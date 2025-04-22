import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../css/style.css';
import Sidebar from '../../components/User/Sidebar';
import Navbar from '../../components/User/Navbar';
import AddBudgetTypeModal from '../../components/User/AddBudgetTypeModal';
import UpdateBudgetTypeModal from '../../components/User/UpdateBudgetTypeModal';
import { Snackbar, Alert } from '@mui/material';

interface BudgetType {
  id: number;
  user_id: number;
  budget_type_name: string;
}



const ManageBudgetType = () => {
  const [budget_type, setBudgetType] = useState<BudgetType[]>([]);
  const [filteredBudgetType, setFilteredBudgetType] = useState<BudgetType[]>([]); // For filtered results
  const [selectedBudgetType, setSelectedBudgetType] = useState<BudgetType| null>(null);
  const [isAddBudgetTypeOpen, setIsAddBudgetTypeOpen] = useState(false);
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
      axios.get(`${apiUrl}/api/budget_type/${userId}`)
        .then(res => {
          setBudgetType(res.data);
          setFilteredBudgetType(res.data); // Initially show all expenses
        })
        .catch(err => console.error('Failed to fetch category:', err));
    }
  }, [userId, apiUrl]);

  const handleUpdate = (budget_typeId: number) => {
    const budgetTypeToUpdate = budget_type.find((budgetType) => budgetType.id === budget_typeId);
    setSelectedBudgetType(budgetTypeToUpdate || null);
  };

  const handleDelete = (budgetTypeId: number) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this budget type?');
    if (isConfirmed) {
      axios.delete(`${apiUrl}/api/budget_type/${budgetTypeId}`)
        .then(() => {
          setBudgetType(budget_type.filter((bt) => bt.id !== budgetTypeId));
          setFilteredBudgetType(filteredBudgetType.filter((bt) => bt.id !== budgetTypeId));
  
          setSnackbar({
            open: true,
            message: "Budget Type deleted successfully!",
            severity: "success",
          });
        })
        .catch(err => {
          console.error('Failed to delete budget type:', err);
          setSnackbar({
            open: true,
            message: 'Failed to delete budget type . Please try again.',
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
      const filtered = budget_type.filter(budget_type =>
        budget_type.budget_type_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredBudgetType(filtered);
    } else {
      setFilteredBudgetType(budget_type); // Show all expenses if search is empty
    }
  };

  // Pagination logic
  const indexOfLastBudgetType = currentPage * itemsPerPage;
  const indexOfFirstBudgetType = indexOfLastBudgetType - itemsPerPage;
  const currentBudgetType = filteredBudgetType.slice(indexOfFirstBudgetType, indexOfLastBudgetType);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <Sidebar />
      <section id="content">
        <Navbar />
        <main>
          <h1 className="title">Manage Budget Type</h1>
          <ul className="breadcrumbs">
            <li><a href="#">Budget Type</a></li>
            <li className="divider">/</li>
            <li><a href="#" className="active">Manage Budget Type</a></li>
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
              <button onClick={() => setIsAddBudgetTypeOpen(true)} className="btn add-btn">
                Add Budget Type
              </button>
            </div>

            <table className="efinance-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>User_id</th>
                  <th>Budget Type Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBudgetType.length > 0 ? (
                  currentBudgetType.map((budget_type) => (
                    <tr key={budget_type.id}>
                      <td>{budget_type.id}</td>
                      <td>{budget_type.user_id}</td>
                      <td>{budget_type.budget_type_name}</td>
                      <td>
                        <button onClick={() => handleUpdate(budget_type.id)} className="btn update-btn">
                          Update
                        </button>
                        <button onClick={() => handleDelete(budget_type.id)} className="btn delete-btn">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7}>No budget type found.</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="efinance-table-footer">
              <span>Showing {currentBudgetType.length} entries</span>
              <div className="efinance-pagination">
                <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                  Previous
                </button>
                {[...Array(Math.ceil(filteredBudgetType.length / itemsPerPage))].map((_, index) => (
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
                  disabled={currentPage === Math.ceil(filteredBudgetType.length / itemsPerPage)}
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
      {isAddBudgetTypeOpen && <AddBudgetTypeModal onClose={() => setIsAddBudgetTypeOpen(false)} />}
      {selectedBudgetType && (
        <UpdateBudgetTypeModal onClose={() => setSelectedBudgetType(null)} budget_type={selectedBudgetType} />
      )}
    </div>
  );
};

export default ManageBudgetType;
