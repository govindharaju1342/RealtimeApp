import React, { Component } from "react";
import socketEvent from "../../socket";

class EmployeeFrom extends Component {
  constructor() {
    super();
    this.state = {
      empData: null,
    };
    this.empId = React.createRef();
    this.name = React.createRef();
    this.gender = React.createRef();
    this.email = React.createRef();
    this.mobile = React.createRef();
    this.costCenter = React.createRef();
  }
  componentDidMount() {
    const { mode, id } = this.props;
    if (mode === "edit") {
      socketEvent.getEditEmpData(id, this.getData);
    }
  }
  getData = (empData) => {
    this.setState(
      {
        empData,
      },
      () => {
        this.gender.current.value = empData[0].gender;
      }
    );
  };
  empAction = () => {
    const { mode, id } = this.props;
    const empDetails = {
      empId: this.empId.current.value.trim(),
      name: this.name.current.value.trim(),
      gender: this.gender.current.value.trim(),
      emailId: this.email.current.value.trim(),
      mobile: this.mobile.current.value.trim(),
      costCenter: this.costCenter.current.value.trim(),
    };
    if (mode === "edit") {
      socketEvent.editEmp(id, empDetails);
    } else {
      socketEvent.insertEmp(empDetails);
    }
  };

  render() {
    const { mode } = this.props;
    const { empData } = this.state;
    return (
      <form>
        <div className="form-group">
          <label>Emp ID</label>
          <input
            type="text"
            defaultValue={!!empData ? empData[0].empId : ""}
            className="form-control"
            ref={this.empId}
          />
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            defaultValue={!!empData ? empData[0].name : ""}
            className="form-control"
            ref={this.name}
          />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select className="form-control" ref={this.gender}>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="Email"
            className="form-control"
            defaultValue={!!empData ? empData[0].emailId : ""}
            ref={this.email}
          />
        </div>
        <div className="form-group">
          <label>Mobile</label>
          <input
            type="text"
            className="form-control"
            defaultValue={!!empData ? empData[0].mobile : ""}
            ref={this.mobile}
          />
        </div>
        <div className="form-group">
          <label>Cost Center</label>
          <input
            type="text"
            className="form-control"
            defaultValue={!!empData ? empData[0].costCenter : ""}
            ref={this.costCenter}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={this.empAction}
        >
          {mode === "edit" ? "Edit" : "Add"}
        </button>
      </form>
    );
  }
}

export default EmployeeFrom;
