const Admin = require('../../models/adminModel');
const generateToken = require('../../config/generateToken');


const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if the password is correct using the matchPassword method
    const isPasswordValid = await admin.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token using generateToken function
    const token = generateToken(admin._id);

    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error logging in admin:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = loginAdmin;
