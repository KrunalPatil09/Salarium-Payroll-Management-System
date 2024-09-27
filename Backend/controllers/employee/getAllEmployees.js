const Employee = require('../../models/employeeModel');

// Get all employees
const getAllEmployees = async (req, res) => {
  try {
    // Find all employees
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getAllEmployees;
