const Employee = require('../../models/employeeModel');
const bcrypt = require('bcryptjs');
const  createEmployeeSchema  = require('../../config/validateData');

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    //Validate request data
    const { error } = createEmployeeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { name, email, password, jobRole, salary, joinDate } = req.body;

    // Check if the employee already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ error: 'Employee already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee

    // const attendanceDates = [
    //   "01/02/2024",
    //   "15/02/2024",
    //   "28/02/2024"
    // ];
    const newEmployee = new Employee({
      name,
      email,
      password: hashedPassword,
      jobRole,
      salary,
      joinDate,
      // attendance: attendanceDates,
    });

    // Save the employee to the database
    await newEmployee.save();

    res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
  } catch (err) {
    console.error('Error creating employee:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports =  createEmployee; // Export the createEmployee function along with loginEmployee
