import React, {  useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../css/style.css';
import axios from 'axios';

const userId = localStorage.getItem('user_id');
const apiUrl = import.meta.env.VITE_API_URL || "";



interface Goal {
  id: number;
  goal_name: string;
  target_amount: string;
  saved_amount: string;
  deadline: string;
  status: string;
}

interface UpdateGoalModalProps {
  onClose: () => void;
  goal: Goal;
}

const UpdateGoalModal: React.FC<UpdateGoalModalProps> = ({ onClose, goal }) => {

  const [goal_name, setGoalName] = useState("");
  const [target_amount, setTargetAmount] = useState("");
  const [saved_amount, setSavedAmount] = useState("");
  const [deadline, setDeadline] = useState("");
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as "success" | "error" | "warning" | "info",
  });


  useEffect(() => {
    if (goal) {
      setGoalName(goal.goal_name || "");
      setTargetAmount(goal.target_amount || "");
      setSavedAmount(goal.saved_amount || "");
      setDeadline(goal.deadline || "");
      setStatus(goal.status || "");
    }
  }, [goal]);
  

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
      await axios.put(`${apiUrl}/api/goals/${goal.id}`, data); // JSON request
  
      setSnackbar({
        open: true,
        message: "Goal updated successfully!",
        severity: "success",
      });
  
      setTimeout(() => {
        onClose();
        setTimeout(() => window.location.reload(), 500);
      }, 2000);
    } catch (error) {
      console.error("Error updating goal:", error);
      setSnackbar({
        open: true,
        message:
          axios.isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : "Failed to update goal.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="efinance-modal-overlay">
      <div className="efinance-modal-container">
        <h2 className="efinance-modal-title">Update Goal</h2>

        <form onSubmit={handleSubmit} className="efinance-form">
          <div className="efinance-form-grid">
            <div className="efinance-form-group">
              <label>Goal Name</label>
              <input type="text" value={goal_name} onChange={(e) => setGoalName(e.target.value)} required />
            </div>
            <div className="efinance-form-group">
              <label>Target Amount</label>
              <input type="number" value={target_amount} onChange={(e) => setTargetAmount(e.target.value)} required />
            </div>
            <div className="efinance-form-group">
              <label>Saved Amount</label>
              <input type="number" value={saved_amount} onChange={(e) => setSavedAmount(e.target.value)} required />
            </div>
            
            <div className="efinance-form-group">
              <label>Goal Deadline</label>
              <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} required />
            </div>
            <div className="efinance-form-group full-width">
              <label>Notes</label>
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

export default UpdateGoalModal;
