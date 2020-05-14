import React, { Component } from "react";
import { Link } from "react-router-dom";
import socketEvent from "./socket";

class EmployeeList extends Component {
  constructor() {
    super();
    this.state = {
      empData: null,
    };
  }
  componentDidMount() {
    socketEvent.initEmpData(this.getData);
  }
  getData = (empData) => {
    this.setState({
      empData,
    });
  };
  getTableHeader = () => {
    return (
      <thead className="thead-dark">
        <tr>
          <th>Emp ID</th>
          <th>Name</th>
          <th>Gender</th>
          <th>Email</th>
          <th>Mobile</th>
          <th>Cost Center</th>
          <th>Action</th>
        </tr>
      </thead>
    );
  };
  deleteData = (empId) => {
    socketEvent.deleteEmp(empId);
  };
  getTableData = () => {
    const { empData } = this.state;
    if (!!empData) {
      return empData.map((data) => {
        return (
          <tr key={data._id}>
            <td>{data.empId}</td>
            <td>{data.name}</td>
            <td>{data.gender}</td>
            <td>{data.emailId}</td>
            <td>{data.mobile}</td>
            <td>{data.costCenter}</td>
            <td style={{ cursor: "pointer" }}>
              <Link to={`/edit/${data._id}`}>
                <span className="badge badge-secondary mr-2">Edit</span>
              </Link>
              <span
                className="badge badge-danger"
                onClick={this.deleteData.bind(this, data._id)}
              >
                Delete
              </span>
            </td>
          </tr>
        );
      });
    } else {
      return (
        <tr>
          <td colSpan="8">Loading...</td>
        </tr>
      );
    }
  };
  render() {
    return (
      <div className="container mt-4">
        <Link to="/add">
          <button
            type="button"
            className="btn btn-primary mb-2 float-right btn-sm"
          >
            Add Employee
          </button>
        </Link>
        <table className="table">
          {this.getTableHeader()}
          <tbody>{this.getTableData()}</tbody>
        </table>
      </div>
    );
  }
}

export default EmployeeList;
