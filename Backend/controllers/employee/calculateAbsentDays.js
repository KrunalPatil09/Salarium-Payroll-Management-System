const Employee = require("../../models/employeeModel");

// Calculate absent days for a specific month and year without updating the database
const calculateAbsentDays = async (req, res) => {
  try {
    const { employeeId, month, year } = req.body;

    if (!employeeId || !month || !year) {
      return res
        .status(400)
        .json({ error: "Employee ID, month, and year are required" });
    }

    // Validate month and year
    if (!Number.isInteger(parseInt(month)) || month < 1 || month > 12) {
      return res
        .status(400)
        .json({ error: "Invalid month. Must be between 1 and 12" });
    }
    if (!Number.isInteger(parseInt(year))) {
      return res.status(400).json({ error: "Invalid year" });
    }

    // Get the total days in the given month and year
    const totalDaysInMonth = new Date(year, month, 0).getDate();

    // Find the employee
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    // Format month and year for comparison
    const monthStr = month.toString().padStart(2, "0");
    const yearStr = year.toString();

    // Filter attendance records for the specified month and year
    const totalAttendance = employee.attendance.filter((date) => {
      const [day, month, year] = date.split("/").map(Number);
      return (
        month.toString().padStart(2, "0") === monthStr &&
        year.toString() === yearStr
      );
    }).length;

    // Calculate absent days
    const absentDays = totalDaysInMonth - totalAttendance;

    res.status(200).json({ absentDays });
  } catch (error) {
    console.error("Error calculating absent days:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = calculateAbsentDays;
