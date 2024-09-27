const Employee = require("../../models/employeeModel");

// Delete an employee by email
const deleteEmployeeByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Employee email is required" });
    }

    // Find the employee by email and delete
    const employee = await Employee.findOneAndDelete({ email });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = deleteEmployeeByEmail;
