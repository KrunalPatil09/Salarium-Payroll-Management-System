const Employee = require('../../models/employeeModel');

// Count attendance records for a specific month and year
const countAttendance = async (req, res) => {
  try {
    const { employeeId, month, year } = req.body;

    if (!employeeId || !month || !year) {
      return res.status(400).json({ error: 'Employee ID, month, and year are required' });
    }

    // Validate month and year
    if (!Number.isInteger(parseInt(month)) || month < 1 || month > 12) {
      return res.status(400).json({ error: 'Invalid month. Must be between 1 and 12' });
    }
    if (!Number.isInteger(parseInt(year))) {
      return res.status(400).json({ error: 'Invalid year' });
    }

    // Find the employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Format month and year for comparison
    const monthStr = month.toString().padStart(2, '0');
    const yearStr = year.toString();

    // Filter attendance records for the specified month and year
    const totalAttendance = employee.attendance.filter(date => {
      const [day, month, year] = date.split('/').map(Number);
      return month.toString().padStart(2, '0') === monthStr && year.toString() === yearStr;
    }).length;

    res.status(200).json({ totalAttendance });
  } catch (error) {
    console.error('Error counting attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = countAttendance;
