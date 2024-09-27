const Admin = require("../../models/adminModel");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.error("Error creating admin:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = createAdmin;
