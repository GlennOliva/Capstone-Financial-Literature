import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../css/style.css';
import axios from 'axios';

const userId = localStorage.getItem('user_id');
const apiUrl = import.meta.env.VITE_API_URL || "";

interface BudgetType {
  id: number;
  budget_type_name: string;
}

interface Budget {
  id: number;
  name: string;
  budget_amount: string;
  budget_type_id: number;
  start_date: string;
  end_date: string;
}

interface UpdateBudgetModalProps {
  onClose: () => void;
  budget: Budget;
}

const UpdateBudgetModal: React.FC<UpdateBudgetModalProps> = ({ onClose, budget }) => {
  const [budget_type, setBudgetType] = useState<BudgetType[]>([]);
  const [name, setName] = useState(budget.name);
  const [budget_amount, setBudgetAmount] = useState(budget.budget_amount);
  const [startDate, setStartDate] = useState(budget.start_date.slice(0, 10));
  const [endDate, setEndDate] = useState(budget.end_date.slice(0, 10));
  const [selectedBudgetType, setSelectedBudgetType] = useState(budget.budget_type_id.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as "success" | "error" | "warning" | "info",
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/budget_type/${userId}`)
      .then((res) => setBudgetType(res.data))
      .catch((err) => console.error('Error fetching budget type:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (!selectedBudgetType) {
      setSnackbar({
        open: true,
        message: "Please select a Budget Type",
        severity: "error",
      });
      setIsSubmitting(false);
      return;
    }
  
    const data = {
      user_id: userId,
      budget_type_id: selectedBudgetType, // ✅ Match backend
      name,
      budget_amount,
      start_date: startDate,              // ✅ Match backend
      end_date: endDate                   // ✅ Match backend
    };
    
  
    try {
      await axios.put(`${apiUrl}/api/budget/${budget.id}`, data); // JSON request
  
      setSnackbar({
        open: true,
        message: "Budget updated successfully!",
        severity: "success",
      });
  
      setTimeout(() => {
        onClose();
        setTimeout(() => window.location.reload(), 500);
      }, 2000);
    } catch (error) {
      console.error("Error updating budget:", error);
      setSnackbar({
        open: true,
        message:
          axios.isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : "Failed to update budget.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="efinance-modal-overlay">
      <div className="efinance-modal-container">
        <h2 className="efinance-modal-title">Update Budget</h2>

        <form onSubmit={handleSubmit} className="efinance-form">
          <div className="efinance-form-grid">
            <div className="efinance-form-group">
              <label>Budget Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="efinance-form-group">
              <label>Budget Amount</label>
              <input type="number" value={budget_amount} onChange={(e) => setBudgetAmount(e.target.value)} required />
            </div>
            <div className="efinance-form-group">
              <label>Budget Type</label>
              <select value={selectedBudgetType} onChange={(e) => setSelectedBudgetType(e.target.value)} required>
                <option value="">Select a budget type</option>
                {budget_type.map((budget_type) => (
                  <option key={budget_type.id} value={budget_type.id}>{budget_type.budget_type_name}</option>
                ))}
              </select>
            </div>
            <div className="efinance-form-group">
              <label>Start Date</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div className="efinance-form-group">
              <label>End Date</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
          </div>

          <div className="efinance-button-group">
            <button type="button" onClick={onClose} className="efinance-btn cancel">Cancel</button>
            <button type="submit" disabled={isSubmitting} className="efinance-btn submit">
              {isSubmitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};

export default UpdateBudgetModal;
