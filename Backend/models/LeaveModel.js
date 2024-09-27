const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define the schema for leave requests
const leaveSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  numberOfDays: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  adminMsg: {
    type: String,
    default: null
  },
  status: {
    type: String,
    default: 'pending'
  }
}, {
  _id: false
});

module.exports = leaveSchema;
  