import { useState } from "react";

import API from "../services/api";

import "./EmployeeList.css";

function EmployeeList({
  employees,
  fetchEmployees,
}) {

  const [editingId, setEditingId] =
    useState(null);

  const [updatedScore, setUpdatedScore] =
    useState("");


  // DELETE
  const deleteEmployee = async (id) => {

    try {

      await API.delete(`/employees/${id}`);

      alert("Employee Deleted");

      fetchEmployees();

    } catch (error) {

      alert("Delete Failed");
    }
  };


  // UPDATE SCORE
  const updateEmployeeScore =
    async (id) => {

      try {

        await API.put(
          `/employees/${id}`,
          {
            performanceScore:
              Number(updatedScore),
          }
        );

        alert(
          "Performance Updated"
        );

        setEditingId(null);

        fetchEmployees();

      } catch (error) {

        alert("Update Failed");
      }
    };


  return (
    <div className="employee-list">

      {employees.map((employee) => (

        <div
          className="employee-card"
          key={employee._id}
        >

          <h3>{employee.name}</h3>

          <p>
            <strong>Email:</strong>
            {" "}
            {employee.email}
          </p>

          <p>
            <strong>Department:</strong>
            {" "}
            {employee.department}
          </p>

          <p>
            <strong>Skills:</strong>
            {" "}
            {employee.skills.join(", ")}
          </p>

          <p>
            <strong>Performance:</strong>
            {" "}
            {employee.performanceScore}
          </p>

          <p>
            <strong>Experience:</strong>
            {" "}
            {employee.experience} years
          </p>


          {
            editingId === employee._id ? (

              <div className="update-section">

                <input
                  type="number"
                  placeholder="New Score"
                  value={updatedScore}
                  onChange={(e) =>
                    setUpdatedScore(
                      e.target.value
                    )
                  }
                />

                <button
                  className="save-btn"
                  onClick={() =>
                    updateEmployeeScore(
                      employee._id
                    )
                  }
                >
                  Save
                </button>

              </div>

            ) : (

              <button
                className="update-btn"
                onClick={() => {
                  setEditingId(
                    employee._id
                  );

                  setUpdatedScore(
                    employee.performanceScore
                  );
                }}
              >
                Update Score
              </button>
            )
          }


          <button
            className="delete-btn"
            onClick={() =>
              deleteEmployee(employee._id)
            }
          >
            Delete
          </button>

        </div>
      ))}

    </div>
  );
}

export default EmployeeList;