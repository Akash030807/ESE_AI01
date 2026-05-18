import { useState } from "react";

import API from "../services/api";

import "./EmployeeForm.css";

function EmployeeForm({ fetchEmployees }) {

  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    department: "",
    skills: "",
    performanceScore: "",
    experience: "",
  });

  const changeHandler = (e) => {

    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };


  const submitHandler = async (e) => {

    e.preventDefault();

    try {

      const payload = {
        ...employeeData,

        skills: employeeData.skills
          .split(",")
          .map((skill) => skill.trim()),

        performanceScore: Number(
          employeeData.performanceScore
        ),

        experience: Number(
          employeeData.experience
        ),
      };

      await API.post(
        "/employees",
        payload
      );

      alert("Employee Added Successfully");

      setEmployeeData({
        name: "",
        email: "",
        department: "",
        skills: "",
        performanceScore: "",
        experience: "",
      });

      fetchEmployees();

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to add employee"
      );
    }
  };


  return (
    <div className="employee-form-container">

      <h2>Add Employee</h2>

      <form
        className="employee-form"
        onSubmit={submitHandler}
      >

        <input
          type="text"
          name="name"
          placeholder="Employee Name"
          value={employeeData.name}
          onChange={changeHandler}
        />

        <input
          type="email"
          name="email"
          placeholder="Employee Email"
          value={employeeData.email}
          onChange={changeHandler}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employeeData.department}
          onChange={changeHandler}
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={employeeData.skills}
          onChange={changeHandler}
        />

        <input
          type="number"
          name="performanceScore"
          placeholder="Performance Score"
          value={employeeData.performanceScore}
          onChange={changeHandler}
        />

        <input
          type="number"
          name="experience"
          placeholder="Years of Experience"
          value={employeeData.experience}
          onChange={changeHandler}
        />

        <button type="submit">
          Add Employee
        </button>

      </form>

    </div>
  );
}

export default EmployeeForm;