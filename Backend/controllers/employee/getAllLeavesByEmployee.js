const Employee = require('../../models/employeeModel');

// Fetch all leave requests for a specific employee
const getAllLeavesByEmployee = async (req, res) => {
  try {
    const { empId } = req.body;

    if (!empId) {
      return res.status(400).json({ error: 'Employee ID is required' });
    }

    // Find the employee
    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Return all leave requests
    res.status(200).json({ leaves: employee.leaves });
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getAllLeavesByEmployee;
