import React, { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../css/style.css';
import axios from 'axios';

const userId = localStorage.getItem('user_id');
const apiUrl = import.meta.env.VITE_API_URL || "";

interface BudgetType {
  id: number;
  user_id: number;
 budget_type_name : string;
}

interface UpdateBudgetTypeModalProps {
  onClose: () => void;
  budget_type: BudgetType;
}

const UpdateBudgetTypeModal: React.FC<UpdateBudgetTypeModalProps> = ({ onClose, budget_type }) => {
  const [budget_type_name, setBudgetTypeName] = useState(budget_type.budget_type_name);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as "success" | "error" | "warning" | "info",
  });

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
   
  
    const data = {
      user_id: userId,
      budget_type_name
    };
  
    try {
      await axios.put(`${apiUrl}/api/budget_type/${budget_type.id}`, data); // JSON request
  
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
      console.error("Error updating budget type:", error);
      setSnackbar({
        open: true,
        message:
          axios.isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : "Failed to update budget type.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="efinance-modal-overlay">
      <div className="efinance-modal-container">
        <h2 className="efinance-modal-title">Update Budget Type</h2>

        <form onSubmit={handleSubmit} className="efinance-form">
          <div className="efinance-form-grid">
            <div className="efinance-form-group">
              <label>Budget Type  Name</label>
              <input type="text" value={budget_type_name} onChange={(e) => setBudgetTypeName(e.target.value)} required />
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

export default UpdateBudgetTypeModal;
