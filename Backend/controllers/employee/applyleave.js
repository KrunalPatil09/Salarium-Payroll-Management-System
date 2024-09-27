// const Employee = require('../../models/employeeModel');

// // Create a leave request
// const applyleave = async (req, res) => {
//   try {
//     const { empId, startDate, endDate, reason } = req.body;

//     if (!empId || !startDate || !endDate || !reason) {
//       return res.status(400).json({ error: 'Employee ID, start date, end date, and reason are required' });
//     }

//     const start = new Date(startDate);
//     const end = new Date(endDate);
//     const timeDiff = Math.abs(end.getTime() - start.getTime());
//     const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Include both start and end dates

//     const leave = {
//       startDate,
//       endDate,
//       numberOfDays: diffDays,
//       reason,
//       adminMsg: null
//     };

//     const employee = await Employee.findById(empId);
//     if (!employee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }

//     employee.leaves.push(leave);
//     await employee.save();

//     res.status(201).json({ message: 'Leave request created successfully', leave });
//   } catch (error) {
//     console.error('Error creating leave request:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = applyleave;

// const Employee = require('../../models/employeeModel');



// // Function to parse date from "dd/mm/yyyy" to Date object
// const parseDate = (dateStr) => {
//   const [day, month, year] = dateStr.split('/');
//   return new Date(`${year}-${month}-${day}`);
// };

// // Create a leave request
// const applyleave = async (req, res) => {
//   try {
//     const { empId, startDate, endDate, reason } = req.body;

//     if (!empId || !startDate || !endDate || !reason) {
//       return res.status(400).json({ error: 'Employee ID, start date, end date, and reason are required' });
//     }

//     const start = parseDate(startDate);
//     const end = parseDate(endDate);
//     const timeDiff = Math.abs(end.getTime() - start.getTime());
//     const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Include both start and end dates

//     const leave = {
//       startDate,
//       endDate,
//       numberOfDays: diffDays,
//       reason,
//       adminMsg: null
//     };

//     const employee = await Employee.findById(empId);
//     if (!employee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }

//     employee.leaves.push(leave);
//     await employee.save();

//     res.status(201).json({ message: 'Leave request created successfully', leave });
//   } catch (error) {
//     console.error('Error creating leave request:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports = applyleave;


const mongoose = require('mongoose');
const Employee = require('../../models/employeeModel');

// Function to parse date from "dd/mm/yyyy" to Date object
const parseDate = (dateStr) => {
  const [day, month, year] = dateStr.split('/');
  return new Date(`${year}-${month}-${day}`);
};

// Create a leave request
const applyleave = async (req, res) => {
  try {
    const { empId, startDate, endDate, reason } = req.body;

    if (!empId || !startDate || !endDate || !reason) {
      return res.status(400).json({ error: 'Employee ID, start date, end date, and reason are required' });
    }

    const start = parseDate(startDate);
    const end = parseDate(endDate);
    const timeDiff = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1; // Include both start and end dates

    const leave = {
      _id: new mongoose.Types.ObjectId(),
      startDate,
      endDate,
      numberOfDays: diffDays,
      reason,
      adminMsg: null,
      status: 'pending'
    };

    const employee = await Employee.findById(empId);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    employee.leaves.push(leave);
    await employee.save();

    res.status(201).json({ message: 'Leave request created successfully', leave });
  } catch (error) {
    console.error('Error creating leave request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports =  applyleave;
