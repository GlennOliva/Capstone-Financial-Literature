import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../css/style.css';
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || "";

interface AddBudgetModalProps {
  onClose: () => void;
}

const AddBudgetCalculatorModal: React.FC<AddBudgetModalProps> = ({ onClose }) => {
  const [income, setIncome] = useState<number>();
  const [fixed_expenses, setFixedExpenses] = useState<number>();
  const [disposable_income, setDisposableIncome] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const userId = localStorage.getItem('user_id') || "";

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info" as "success" | "error" | "warning" | "info",
  });

  useEffect(() => {
    if (income !== undefined && fixed_expenses !== undefined) {
      const calcDisposable = income - fixed_expenses;
      setDisposableIncome(calcDisposable);
    } else {
      setDisposableIncome(0); // or undefined if you want it blank
    }
  }, [income, fixed_expenses]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = {
      user_id: userId,
      income,
      fixed_expenses,
      disposable_income,
    };

    try {
      await axios.post(`${apiUrl}/api/budget_calculator/`, data);

      setSnackbar({
        open: true,
        message: "Budget Calculator created successfully!",
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
        message: axios.isAxiosError(error) && error.response?.data?.error
          ? error.response.data.error
          : "Failed to create budget.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="efinance-modal-overlay">
      <div className="efinance-modal-container">
        <h2 className="efinance-modal-title">Add Budget Calculator</h2>

        <form onSubmit={handleSubmit} className="efinance-form">
          <div className="efinance-form-grid">
            <div className="efinance-form-group">
              <label>Income</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <div className="efinance-form-group">
              <label>Fixed Expenses</label>
              <input
                type="number"
                value={fixed_expenses}
                onChange={(e) => setFixedExpenses(parseFloat(e.target.value) || 0)}
                required
              />
            </div>
            <div className="efinance-form-group">
              <label>Disposable Income</label>
              <input
                type="number"
                value={disposable_income}
                readOnly
                className="readonly-input"
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

export default AddBudgetCalculatorModal;
