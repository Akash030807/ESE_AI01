const Employee = require("../models/Employee");


// ADD EMPLOYEE
const addEmployee = async (req, res) => {

  try {

    const {
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
    } = req.body;


    // VALIDATION
    if (
      !name ||
      !email ||
      !department ||
      !skills ||
      performanceScore === undefined ||
      experience === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }


    // DUPLICATE EMAIL CHECK
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({
        message: "Employee with this email already exists",
      });
    }


    // CREATE EMPLOYEE
    const employee = await Employee.create({
      name,
      email,
      department,
      skills,
      performanceScore,
      experience,
    });

    res.status(201).json({
      message: "Employee added successfully",
      employee,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// GET ALL EMPLOYEES
const getEmployees = async (req, res) => {

  try {

    const employees = await Employee.find().sort({
      performanceScore: -1,
    });

    res.status(200).json(employees);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// SEARCH EMPLOYEE
const searchEmployees = async (req, res) => {

  try {

    const { department, name } = req.query;

    let query = {};

    if (department) {
      query.department = department;
    }

    if (name) {
      query.name = {
        $regex: name,
        $options: "i",
      };
    }

    const employees = await Employee.find(query);

    res.status(200).json(employees);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// UPDATE EMPLOYEE
const updateEmployee = async (req, res) => {

  try {

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      updatedEmployee,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};



// DELETE EMPLOYEE
const deleteEmployee = async (req, res) => {

  try {

    const employee = await Employee.findById(req.params.id);

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Employee deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  searchEmployees,
  updateEmployee,
  deleteEmployee,
};