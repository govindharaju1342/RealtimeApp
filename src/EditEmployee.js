import React from "react";
import EmployeeFrom from "./component/EmployeeFrom";

function EditEmployee(props) {
  const { id } = props.match.params;
  return (
    <div className="container mt-4">
      <h1>Edit Employee</h1>
      <EmployeeFrom mode="edit" id={id} />
    </div>
  );
}

export default EditEmployee;
