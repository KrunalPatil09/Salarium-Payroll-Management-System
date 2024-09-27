const Employee = require('../../models/employeeModel');

// Add attendance record
const addAttendance = async (req, res) => {
  try {
    const { employeeId, date } = req.body;

    if (!employeeId || !date) {
      return res.status(400).json({ error: 'Employee ID and date are required' });
    }

    // Validate date format
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!datePattern.test(date)) {
      return res.status(400).json({ error: 'Invalid date format. Use "dd/mm/yyyy"' });
    }

    // Find the employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Check if the date already exists in the attendance array
    if (!employee.attendance.includes(date)) {
      employee.attendance.push(date);
      await employee.save();
      res.status(200).json({ message: 'Attendance added successfully' });
    } else {
      res.status(200).json({ message: 'Attendance for this date already exists' });
    }
  } catch (error) {
    console.error('Error adding attendance:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = addAttendance ;
