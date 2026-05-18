import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

import Navbar from "../components/Navbar";

import EmployeeForm from "../components/EmployeeForm";

import SearchFilter from "../components/SearchFilter";

import EmployeeList from "../components/EmployeeList";

import "./Dashboard.css";

function Dashboard() {

  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [searchDepartment, setSearchDepartment] =
    useState("");

  const [searchName, setSearchName] =
    useState("");


  // FETCH EMPLOYEES
  const fetchEmployees = async () => {

    try {

      const response = await API.get(
        "/employees"
      );

      setEmployees(response.data);

    } catch (error) {

      alert("Failed to fetch employees");

      navigate("/");
    }
  };


  // SEARCH EMPLOYEES
  const searchEmployees = async () => {

    try {

      const response = await API.get(
        `/employees/search?department=${searchDepartment}&name=${searchName}`
      );

      setEmployees(response.data);

    } catch (error) {

      alert("Search Failed");
    }
  };


  useEffect(() => {

    fetchEmployees();

  }, []);


  return (
    <div>

      <Navbar />

      <div className="dashboard-container">

        <h1>
          Employee Dashboard
        </h1>

        <EmployeeForm
          fetchEmployees={fetchEmployees}
        />

        <SearchFilter
          searchDepartment={searchDepartment}
          setSearchDepartment={
            setSearchDepartment
          }
          searchName={searchName}
          setSearchName={setSearchName}
          searchEmployees={searchEmployees}
        />

        <EmployeeList
          employees={employees}
          fetchEmployees={fetchEmployees}
        />

      </div>

    </div>
  );
}

export default Dashboard;