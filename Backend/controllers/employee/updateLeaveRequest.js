const Employee = require('../../models/employeeModel');

// Function to parse date from "dd/mm/yyyy" to Date object
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  return new Date(`${year}-${month}-${day}`);
};

// Update a leave request
const updateLeaveRequest = async (req, res) => {
  try {
    const { empId, leaveId, startDate, endDate, reason, adminMsg, status } = req.body;

    if (!empId || !leaveId) {
      return res.status(400).json({ error: 'Employee ID and leave ID are required' });
    }

    // Find the employee
    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Find the leave request within the employee's leaves array
    const leave = employee.leaves.id(leaveId);
    if (!leave) {
      return res.status(404).json({ error: 'Leave request not found' });
    }

    // Update only the fields that were provided
    if (startDate) leave.startDate = startDate;
    if (endDate) leave.endDate = endDate;
    if (startDate && endDate) {
      const start = parseDate(startDate);
      const end = parseDate(endDate);
      const timeDiff = Math.abs(end.getTime() - start.getTime());
      leave.numberOfDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Include both start and end dates
    }
    if (reason) leave.reason = reason;
    if (adminMsg) leave.adminMsg = adminMsg;
    if (status) leave.status = status;

    // Save the updated employee document
    await employee.save();

    res.status(200).json({ message: 'Leave request updated successfully', leave });
  } catch (error) {
    console.error('Error updating leave request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = updateLeaveRequest;
