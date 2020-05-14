import React from "react";
import EmployeeFrom from "./component/EmployeeFrom";

function AddEmployee() {
  return (
    <div className="container mt-4">
      <h1>Add Employee</h1>
      <EmployeeFrom mode="add" />
    </div>
  );
}

export default AddEmployee;
