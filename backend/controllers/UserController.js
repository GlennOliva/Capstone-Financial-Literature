const User = require('../models/UserModel');

// Get all expenses
exports.getUser = (req, res) => {
  User.getUser(req.params.userId, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};


exports.addUser = (req, res) => {
    try {
      const { full_name, email, password, address } = req.body;
      const image = req.file ? req.file.filename : null;
  
      if (!full_name || !email || !password || !address) {
        return res.status(400).json({ error: 'All fields are required' });
      }
  
      if (!image) {
        return res.status(400).json({ error: 'Image is required' });
      }
  
      const userData = {
        full_name,
        email,
        password,
        image,
        address
      };
  
      User.addUser(userData, (err, result) => {
        if (err) {
          console.error('Database Error:', err);
          return res.status(500).json({ error: err });
        }
        res.status(201).json({
          message: 'User Successfully Registered',
          id: result.insertId
        });
      });
    } catch (error) {
      console.error('Internal Server Error:', error);
      res.status(500).json({ error: 'Server error occurred' });
    }
  };
  



  exports.updateUser = (req, res) => {
    const id = req.params.id;
    const { full_name, email, password, address } = req.body;
    const image = req.file ? req.file.filename : null;
  
    // Build updated data object
    const updatedData = {
      full_name,
      email,
      password,
      address,
      image
    };
  
    // Remove image field if no new image was uploaded
    if (!image) delete updatedData.image;
  
    // Call the model function to update the user
    User.updateUser(id, updatedData, (err, result) => {
      if (err) {
        console.error('Update error:', err);
        return res.status(500).json({ error: 'Failed to update user' });
      }
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'User updated successfully!' });
    });
  };
  

// 🔐 Login user
exports.loginUser = (req, res) => {
    const { email, password } = req.body;
  
    User.loginUser(email, password, (err, results) => {
      if (err) return res.status(500).json({ error: err });
  
      if (results.length === 0) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      res.json({ message: 'Login successful', user: results[0] });
    });
  };