import React, { useEffect, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import '../../css/style.css'; // Import your CSS file here
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL || ""; // Ensure fallback

interface Category {
  id: number;
  category_name: string;
}

interface AddExpenseModalProps {
  onClose: () => void;
}

const AddExpenseModal: React.FC<AddExpenseModalProps> = ({ onClose }) => {
  // Corrected states
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [notes, setNotes] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(""); // Use for category selection
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
      .get(`${apiUrl}/api/category/${userId}`) // Fixed typo
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, [userId]);

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
      await axios.post(`${apiUrl}/api/expenses`, data);

      setSnackbar({
        open: true,
        message: "Expense created successfully!",
        severity: "success",
      });

      setTimeout(() => {
        onClose();
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }, 2000);
    } catch (error) {
      console.error("Error creating expense:", error);
      setSnackbar({
        open: true,
        message:
          axios.isAxiosError(error) && error.response?.data?.error
            ? error.response.data.error
            : "Failed to create expense.",
        severity: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }; // <-- this closing brace was missing

  return (
    <div className="efinance-modal-overlay">
      <div className="efinance-modal-container">
        <h2 className="efinance-modal-title">Add Expense</h2>

        <form onSubmit={handleSubmit} className="efinance-form">
          <div className="efinance-form-grid">
            <div className="efinance-form-group">
              <label>Expense Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="efinance-form-group">
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <div className="efinance-form-group">
              <label>Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category_name} {/* Corrected field */}
                  </option>
                ))}
              </select>
            </div>
            <div className="efinance-form-group">
              <label>Expense Date</label>
              <input
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
                required
              />
            </div>
            <div className="efinance-form-group full-width">
              <label>Notes</label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
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

export default AddExpenseModal;
