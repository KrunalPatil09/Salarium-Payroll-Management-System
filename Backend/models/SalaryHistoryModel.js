const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a salary slip
const salarySlipSchema = new Schema({
  empName: {
    type: String,
    required: true
  },
  empEmail: {
    type: String,
    required: true
  },
  jobRole: {
    type: String,
    required: true
  },
  baseSalary: {
    type: Number,
    required: true
  },
  monthOfSalaryIssue: {
    type: String, // Format: "mm/yyyy"
    required: true
  },
  presentDays: {
    type: Number,
    required: true
  },
  absentDays: {
    type: Number,
    required: true
  },
  inHandSalary: {
    type: Number,
    required: true
  }
}, {
  _id: false
});

// Define the schema for salary history
const salaryHistorySchema = new Schema({
  empId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    unique: true,
    required: true
  },
  salarySlips: {
    type: [salarySlipSchema],
    default: []
  }
}, {
  timestamps: true
});

const SalaryHistory = mongoose.model('SalaryHistory', salaryHistorySchema);
module.exports = SalaryHistory;
