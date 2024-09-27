const express = require("express");

const adminMiddleware = require("../middleware/adminMiddleware");
const empMiddleware = require("../middleware/empMiddleware");

const loginEmployee = require("../controllers/employee/loginEmployee");
const createEmployee = require("../controllers/employee/createEmployee");
const addAttendance = require("../controllers/employee/attendance");
const countAttendance = require("../controllers/employee/countAttendance");
const calculateAbsentDays = require("../controllers/employee/calculateAbsentDays");
const editEmployee = require("../controllers/employee/editEmployee");
const getOneEmployeeById = require("../controllers/employee/getOneEmployeeById");
const getAllEmployees = require("../controllers/employee/getAllEmployees");
const deleteEmployeeByEmail = require("../controllers/employee/deleteEmployeeByEmail");
const applyleave = require("../controllers/employee/applyleave");
const updateLeaveRequest = require("../controllers/employee/updateLeaveRequest");
const getAllLeavesByEmployee = require("../controllers/employee/getAllLeavesByEmployee");
const getAllPendingLeaves = require("../controllers/employee/getAllPendingLeaves");
const generateSalarySlip = require("../controllers/employee/generateSalarySlip");
const fetchEmployeeSalarySlips = require("../controllers/employee/fetchEmployeeSalarySlips");
const countPastSixMonthsAttendance = require("../controllers/employee/countPastSixMonthsAttendance");
const calculatePastSixMonthsInHandSalary = require("../controllers/employee/calculatePastSixMonthsInHandSalary");

const router = express.Router();

router.post("/create", adminMiddleware, createEmployee);
router.post("/login", loginEmployee);

router.post("/addattendance", empMiddleware, addAttendance);
router.get("/countAttendance", countAttendance);
router.get("/calculateAbsentDays", calculateAbsentDays);
router.patch("/editEmployee", adminMiddleware, editEmployee);
router.get("/getOneEmployeeById", getOneEmployeeById);
router.get("/getAllEmployees", adminMiddleware, getAllEmployees);
router.delete("/deleteEmployeeByEmail", adminMiddleware, deleteEmployeeByEmail);
router.post("/applyleave", empMiddleware, applyleave);
router.patch("/updateLeaveRequest", adminMiddleware, updateLeaveRequest);
router.get("/getAllLeavesByEmployee", empMiddleware, getAllLeavesByEmployee);
router.get("/getAllPendingLeaves", adminMiddleware, getAllPendingLeaves);
router.post("/generateSalarySlip", adminMiddleware, generateSalarySlip);
router.get(
  "/fetchEmployeeSalarySlips",
  empMiddleware,
  fetchEmployeeSalarySlips
);
router.get(
  "/countPastSixMonthsAttendance",
  empMiddleware,
  countPastSixMonthsAttendance
);
router.get(
  "/calculatePastSixMonthsInHandSalary",
  empMiddleware,
  calculatePastSixMonthsInHandSalary
);

module.exports = router;
