import React, {  useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../css/style.css'; // Import your CSS file here
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || ""; // Ensure fallback


interface AddGoalModalProps {
  onClose: () => void;
}

const AddExpenseModal: React.FC<AddGoalModalProps> = ({ onClose }) => {
  // Corrected states
  const [goal_name, setGoalName] = useState("");
  const [target_amount, setTargetAmount] = useState("");
  const [saved_amount, setSavedAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
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
      goal_name,
      target_amount,
      saved_amount,
      deadline,
      status
    };

    try {
      await axios.post(`${apiUrl}/api/goals`, data);

      setSnackbar({
        open: true,
        message: "Goals created successfully!",
        severity: "success",
      });

      setTimeout(() => {
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }, 2000);
    } catch (error) {
      console.error("Error creating goal:", error);
      setSnackbar({
        open: true,
        message:
          axios.isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : "Failed to create goal.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }; // <-- this closing brace was missing

  return (
    <div className="efinance-modal-overlay">
      <div className="efinance-modal-container">
        <h2 className="efinance-modal-title">Add Goal</h2>

        <form onSubmit={handleSubmit} className="efinance-form">
          <div className="efinance-form-grid">
            <div className="efinance-form-group">
              <label>Goal Name</label>
              <input
                type="text"
                value={goal_name}
                onChange={(e) => setGoalName(e.target.value)}
                required
              />
            </div>
            <div className="efinance-form-group">
              <label>Target Amount</label>
              <input
                type="number"
                value={target_amount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
              />
            </div>
            <div className="efinance-form-group">
              <label>Saved Amount</label>
              <input
                type="number"
                value={saved_amount}
                onChange={(e) => setSavedAmount(e.target.value)}
                required
              />
            </div>
           
            <div className="efinance-form-group">
              <label>Deadline</label>
              <input
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
            <div className="efinance-form-group full-width">
  <label>Status</label>
  <select value={status} onChange={(e) => setStatus(e.target.value)} required>
    <option value="">Select Status</option>
    <option value="In Progress">In Progress</option>
    <option value="Pending">Pending</option>
    <option value="Complete">Complete</option>
    <option value="Failed">Failed</option>
  </select>
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

export default AddExpenseModal;
