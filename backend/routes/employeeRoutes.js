const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  addEmployee,
  getEmployees,
  searchEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");


// ADD EMPLOYEE
router.post("/", authMiddleware, addEmployee);


// GET ALL EMPLOYEES
router.get("/", authMiddleware, getEmployees);


// SEARCH EMPLOYEE
router.get("/search", authMiddleware, searchEmployees);


// UPDATE EMPLOYEE
router.put("/:id", authMiddleware, updateEmployee);


// DELETE EMPLOYEE
router.delete("/:id", authMiddleware, deleteEmployee);

module.exports = router;