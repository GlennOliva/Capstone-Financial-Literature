import React, {  useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../css/style.css'; // Import your CSS file here
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || ""; // Ensure fallback

interface AddBudgetTypeModalProps {
  onClose: () => void;
}

const AddBudgetTypeModal: React.FC<AddBudgetTypeModalProps> = ({ onClose }) => {
  // Corrected states
  const [budget_type_name, setBudgetTypeName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Submit status
  const userId = localStorage.getItem('user_id') || "";
  // Snackbar state
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "error" | "warning" | "info";
  }>({
    open: false,
    message: "",
    severity: "info",
  });



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

   

    const data = {
      user_id: userId,
      budget_type_name
    };

    try {
      await axios.post(`${apiUrl}/api/budget_type`, data);

      setSnackbar({
        open: true,
        message: "Budget Type created successfully!",
        severity: "success",
      });

      setTimeout(() => {
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }, 2000);
    } catch (error) {
      console.error("Error creating budget type:", error);
      setSnackbar({
        open: true,
        message:
          axios.isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : "Failed to create budget type.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }; // <-- this closing brace was missing

  return (
    <div className="efinance-modal-overlay">
      <div className="efinance-modal-container">
        <h2 className="efinance-modal-title">Add Budget Type</h2>

        <form onSubmit={handleSubmit} className="efinance-form">
          <div className="efinance-form-grid">
            <div className="efinance-form-group">
              <label>Budget Type Name</label>
              <input
                type="text"
                value={budget_type_name}
                onChange={(e) => setBudgetTypeName(e.target.value)}
                required
              />
            </div>
          
          </div>

          <div className="efinance-button-group">
            <button type="button" onClick={onClose} className="efinance-btn cancel">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="efinance-btn submit">
              {isSubmitting ? 'Submitting...' : 'Submit'}
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

export default AddBudgetTypeModal;
