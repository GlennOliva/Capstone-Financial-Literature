import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../css/style.css';
import axios from 'axios';

const userId = localStorage.getItem('user_id');
const apiUrl = import.meta.env.VITE_API_URL || "";

interface Category {
  id: number;
  category_name: string;
}

interface Expense {
  id: number;
  name: string;
  amount: string;
  category_id: number;
  expense_date: string;
  notes: string;
}

interface UpdateExpenseModalProps {
  onClose: () => void;
  expense: Expense;
}

const UpdateExpenseModal: React.FC<UpdateExpenseModalProps> = ({ onClose, expense }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState(expense.name);
  const [amount, setAmount] = useState(expense.amount);
  const [expenseDate, setExpenseDate] = useState(expense.expense_date.slice(0, 10));
  const [notes, setNotes] = useState(expense.notes);
  const [selectedCategory, setSelectedCategory] = useState(expense.category_id.toString());
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info' as "success" | "error" | "warning" | "info",
  });

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/category/${userId}`)
      .then((res) => setCategories(res.data))
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    if (!selectedCategory) {
      setSnackbar({
        open: true,
        message: "Please select a Category",
        severity: "error",
      });
      setIsSubmitting(false);
      return;
    }
  
    const data = {
      user_id: userId,
      category_id: selectedCategory,
      name,
      amount,
      expense_date: expenseDate,
      notes,
    };
  
    try {
      await axios.put(`${apiUrl}/api/expenses/${expense.id}`, data); // JSON request
  
      setSnackbar({
        open: true,
        message: "Expense updated successfully!",
        severity: "success",
      });
  
      setTimeout(() => {
        onClose();
        setTimeout(() => window.location.reload(), 500);
      }, 2000);
    } catch (error) {
      console.error("Error updating expense:", error);
      setSnackbar({
        open: true,
        message:
          axios.isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : "Failed to update expense.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="efinance-modal-overlay">
      <div className="efinance-modal-container">
        <h2 className="efinance-modal-title">Update Expense</h2>

        <form onSubmit={handleSubmit} className="efinance-form">
          <div className="efinance-form-grid">
            <div className="efinance-form-group">
              <label>Expense Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="efinance-form-group">
              <label>Amount</label>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div className="efinance-form-group">
              <label>Category</label>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} required>
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.category_name}</option>
                ))}
              </select>
            </div>
            <div className="efinance-form-group">
              <label>Expense Date</label>
              <input type="date" value={expenseDate} onChange={(e) => setExpenseDate(e.target.value)} required />
            </div>
            <div className="efinance-form-group full-width">
              <label>Notes</label>
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
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

export default UpdateExpenseModal;
