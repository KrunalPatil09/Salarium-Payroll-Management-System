const express = require("express");
// const createAdmin = require("../controllers/admin/createAdmin");
const createAdmin = require("../controllers/admin/createAdmin");
const loginAdmin = require("../controllers/admin/loginAdmin");

const router = express.Router();

// Define the POST route for creating an admin
router.post("/create", createAdmin);
router.post("/login", loginAdmin);


module.exports = router;
