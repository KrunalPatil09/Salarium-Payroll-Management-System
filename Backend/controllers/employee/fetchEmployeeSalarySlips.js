const SalaryHistory = require('../../models/SalaryHistoryModel');

// Function to fetch all salary slips for a specific employee
const fetchEmployeeSalarySlips = async (req, res) => {
  try {
    const { empId } = req.body;

    if (!empId) {
      return res.status(400).json({ error: 'Employee ID is required' });
    }

    // Find the salary history document for the employee
    const salaryHistory = await SalaryHistory.findOne({ empId: empId });

    if (!salaryHistory) {
      return res.status(404).json({ error: 'Salary history not found for the employee' });
    }

    res.status(200).json({ salarySlips: salaryHistory.salarySlips });
  } catch (error) {
    console.error('Error fetching salary slips:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = fetchEmployeeSalarySlips;
