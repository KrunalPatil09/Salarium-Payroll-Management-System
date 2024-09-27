const Employee = require('../../models/employeeModel');

// Edit employee information
const editEmployee = async (req, res) => {
  try {
    const { employeeId } = req.body;
    const updateData = req.body;

    if (!employeeId) {
      return res.status(400).json({ error: 'Employee ID is required' });
    }

    // Remove employeeId from updateData to prevent overriding it
    delete updateData.employeeId;

    // Validate the presence of at least one field to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No fields to update provided' });
    }

    // Find and update the employee
    const updatedEmployee = await Employee.findByIdAndUpdate(employeeId, updateData, {
      new: true, // Return the updated document
      runValidators: true // Validate the data against the schema
    });

    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully', updatedEmployee });
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = editEmployee;
