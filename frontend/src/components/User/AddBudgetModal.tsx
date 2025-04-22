import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../css/style.css'; // Import your CSS file here
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || ""; // Ensure fallback

interface Budget_Type {
  id: number;
  budget_type_name: string;
}

interface AddBudgetModalProps {
  onClose: () => void;
}

const AddBudgetModal: React.FC<AddBudgetModalProps> = ({ onClose }) => {
  // Corrected states
  const [budget_type, setBudgetType] = useState<Budget_Type[]>([]);
  const [name, setName] = useState("");
  const [budget_amount, setBudgetAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedBudgetType, setSelectedBudgetType] = useState<string>(""); // Use for category selection
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

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/budget_type/${userId}`) // Fixed typo
      .then((res) => setBudgetType(res.data))
      .catch((err) => console.error("Error fetching budget type:", err));
  }, [userId]);

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
      await axios.post(`${apiUrl}/api/budget`, data);

      setSnackbar({
        open: true,
        message: "Budget created successfully!",
        severity: "success",
      });

      setTimeout(() => {
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }, 2000);
    } catch (error) {
      console.error("Error creating budget:", error);
      setSnackbar({
        open: true,
        message:
          axios.isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : "Failed to create budget.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }; // <-- this closing brace was missing

  return (
    <div className="efinance-modal-overlay">
      <div className="efinance-modal-container">
        <h2 className="efinance-modal-title">Add Budget</h2>

        <form onSubmit={handleSubmit} className="efinance-form">
          <div className="efinance-form-grid">
            <div className="efinance-form-group">
              <label>Budget Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="efinance-form-group">
              <label>Budget Amount</label>
              <input
                type="number"
                value={budget_amount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                required
              />
            </div>
            <div className="efinance-form-group">
              <label>Budget Type</label>
              <select
                value={selectedBudgetType}
                onChange={(e) => setSelectedBudgetType(e.target.value)}
                required
              >
                <option value="">Select a budget type</option>
                {budget_type.map((budget_type) => (
                  <option key={budget_type.id} value={budget_type.id}>
                    {budget_type.budget_type_name} {/* Corrected field */}
                  </option>
                ))}
              </select>
            </div>
            <div className="efinance-form-group">
              <label>Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="efinance-form-group">
              <label>End Date</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
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

export default AddBudgetModal;
