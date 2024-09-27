// const Employee = require('../../models/employeeModel');
// const generateToken = require('../../config/generateToken');

// const loginEmployee = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Check if the employee exists
//     const employee = await Employee.findOne({ email });
//     if (!employee) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     // Check if the password is correct
//     const isPasswordValid = await employee.matchPassword(password);
//     if (!isPasswordValid) {
//       return res.status(400).json({ error: 'Invalid email or password' });
//     }

//     // Generate a JWT token
//     const token = generateToken(employee._id);

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (err) {
//     console.error('Error logging in employee:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = loginEmployee;


const Employee = require('../../models/employeeModel');
const generateToken = require('../../config/generateToken');

const loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the employee exists
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if the password is correct
    const isPasswordValid = await employee.matchPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = generateToken(employee._id);

    // Return employee details along with the token
    res.status(200).json({
      message: 'Login successful',
      token,
      employee: {
        _id: employee._id,
        name: employee.name,
        email: employee.email,
        jobRole: employee.jobRole,
        salary: employee.salary,
        joinDate: employee.joinDate,
        attendance: employee.attendance,
        salaryPaid: employee.salaryPaid,
        leaves: employee.leaves,
        createdAt: employee.createdAt,
        updatedAt: employee.updatedAt
      }
    });
  } catch (err) {
    console.error('Error logging in employee:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = loginEmployee;
