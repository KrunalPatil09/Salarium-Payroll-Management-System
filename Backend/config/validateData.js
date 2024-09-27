const Joi = require('joi');

// Custom Joi validator for date in "dd/mm/yyyy" format
const dateFormat = (value, helpers) => {
  // Check if the date matches the "dd/mm/yyyy" format
  const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!datePattern.test(value)) {
    return helpers.message('Date must be in dd/mm/yyyy format');
  }

  // Check if the date is valid
  const [day, month, year] = value.split('/').map(Number);
  const isValidDate = new Date(`${year}-${month}-${day}`).getDate() === day;

  if (!isValidDate) {
    return helpers.message('Invalid date');
  }

  return value;
};

// Define the Joi schema for employee creation
const createEmployeeSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  jobRole: Joi.string().required(),
  salary: Joi.number().required(),
  joinDate: Joi.string().custom(dateFormat).required(),
});

module.exports =  createEmployeeSchema ;
