const Employee = require('../../models/employeeModel');
const SalaryHistory = require('../../models/SalaryHistoryModel');

// Function to generate and store a salary slip
const generateSalarySlip = async (req, res) => {
  try {
    const { empId, monthOfSalaryIssue } = req.body;

    if (!empId || !monthOfSalaryIssue) {
      return res.status(400).json({ error: 'Employee ID and month of salary issue are required' });
    }

    // Find the employee
    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    // Calculate the present days and absent days
    const presentDays = employee.attendance.filter(date => {
      const [day, month, year] = date.split('/');
      return `${month}/${year}` === monthOfSalaryIssue;
    }).length;

    const totalDaysInMonth = new Date(monthOfSalaryIssue.split('/')[1], monthOfSalaryIssue.split('/')[0], 0).getDate();
    const absentDays = totalDaysInMonth - presentDays;

    // Calculate the in-hand salary
    const inHandSalary = (employee.salary / totalDaysInMonth) * presentDays;

    // Create the salary slip
    const salarySlip = {
      empName: employee.name,
      empEmail: employee.email,
      jobRole: employee.jobRole,
      baseSalary: employee.salary,
      monthOfSalaryIssue,
      presentDays,
      absentDays,
      inHandSalary
    };

    // Find or create the salary history document for the employee
    let salaryHistory = await SalaryHistory.findOne({ empId: empId });
    if (!salaryHistory) {
      salaryHistory = new SalaryHistory({ empId: empId });
    }

    // Add the new salary slip to the salary history
    salaryHistory.salarySlips.push(salarySlip);

    // Update the employee's total salary paid
    employee.salaryPaid += inHandSalary;

    // Save the updated employee and salary history documents
    await employee.save();
    await salaryHistory.save();

    res.status(201).json({ message: 'Salary slip generated and stored successfully', salarySlip });
  } catch (error) {
    console.error('Error generating salary slip:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = generateSalarySlip;
