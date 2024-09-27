// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

// const Schema = mongoose.Schema;

// // Define the schema for the employee
// const employeeSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   jobRole: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   salary: {
//     type: Number,
//     required: true,
//   },
//   joinDate: {
//     type: String, // Changed to String
//     required: true,
//   },
//   attendance: {
//     type: [String], // Array of dates in "dd/mm/yyyy" format
//     default: [] // Initialize with an empty array
//   },
//   salaryPaid: {
//     type: Number,
//     default: 0,
//   },
//   absentDayNumber: {
//     type: Number,
//     default: null,
//   }
// }, {
//   timestamps: true
// });

// // Compare provided password with the hashed password
// employeeSchema.methods.matchPassword = async function(enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// // Create a model from the schema
// const Employee = mongoose.model('Employee', employeeSchema);

// module.exports = Employee;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const Schema = mongoose.Schema;
const leaveSchema = require('./LeaveModel');

// Define the schema for the employee
const employeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  jobRole: {
    type: String,
    required: true,
    trim: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  joinDate: {
    type: String, // Changed to String
    required: true,
  },
  attendance: {
    type: [String], // Array of dates in "dd/mm/yyyy" format
    default: [] // Initialize with an empty array
  },
  salaryPaid: {
    type: Number,
    default: 0,
  },
  leaves: {
    type: [leaveSchema],
    default: []
  }
}, {
  timestamps: true
});

// Compare provided password with the hashed password
employeeSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create a model from the schema
const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
