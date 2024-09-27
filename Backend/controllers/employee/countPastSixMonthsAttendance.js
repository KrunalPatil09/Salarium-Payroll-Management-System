const Employee = require('../../models/employeeModel');

const countPastSixMonthsAttendance = async (req, res) => {
    try {
      const { empId } = req.body;
  
      if (!empId) {
        return res.status(400).json({ error: 'Employee ID is required' });
      }
  
      // Find the employee by ID
      const employee = await Employee.findById(empId);
      if (!employee) {
        return res.status(404).json({ error: 'Employee not found' });
      }
  
      const attendanceByMonth = {};
  
      // Get the current date
      const currentDate = new Date();
      let currentMonth = currentDate.getMonth() + 1; // months are zero-indexed in JS Date (0 = Jan)
      const currentYear = currentDate.getFullYear();
  
      // Function to get the month name from the month number
      const getMonthName = (monthNumber) => {
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        return months[monthNumber - 1];
      };
  
      // Iterate over the past six months, excluding the current month
      for (let i = 1; i <= 6; i++) {
        const month = currentMonth - i;
  
        // If month is less than or equal to 0, go to the previous year
        const adjustedMonth = month <= 0 ? 12 + month : month;
        const year = month <= 0 ? currentYear - 1 : currentYear;
  
        // Format the month and year for comparison
        const monthYear = `${adjustedMonth.toString().padStart(2, '0')}/${year}`;
  
        // Count the attendance for this month
        const attendanceCount = employee.attendance.filter(date => {
          const [day, month, year] = date.split('/');
          return `${month}/${year}` === monthYear;
        }).length;
  
        // Store the result
        attendanceByMonth[getMonthName(adjustedMonth)] = attendanceCount;
      }
  
      res.status(200).json({ attendanceByMonth });
    } catch (error) {
      console.error('Error counting past six months attendance:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
module.exports = countPastSixMonthsAttendance;
