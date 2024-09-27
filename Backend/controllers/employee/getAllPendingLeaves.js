const Employee = require('../../models/employeeModel');

// Fetch all pending leave requests with employee details
const getAllPendingLeaves = async (req, res) => {
  try {
    // Find all employees with at least one pending leave request
    const employees = await Employee.find({ 'leaves.status': 'pending' }, 'name jobRole leaves');

    // Filter out only the pending leaves and format the response
    const pendingLeaves = employees.map(employee => {
      const pending = employee.leaves.filter(leave => leave.status === 'pending');
      return pending.map(leave => ({
        empId: employee._id,
        name: employee.name,
        jobRole: employee.jobRole,
        leaveId: leave._id,
        startDate: leave.startDate,
        endDate: leave.endDate,
        numberOfDays: leave.numberOfDays,
        reason: leave.reason,
        adminMsg: leave.adminMsg,
        status: leave.status
      }));
    }).flat();

    res.status(200).json({ pendingLeaves });
  } catch (error) {
    console.error('Error fetching pending leave requests:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = getAllPendingLeaves;
