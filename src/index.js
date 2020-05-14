import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import EmployeeList from "./EmployeeList";
import AddEmployee from "./AddEmployee";
import EditEmployee from "./EditEmployee";

const routing = (
  <Router>
    <div>
      <Route path="/" exact component={EmployeeList} />
      <Route path="/add"  component={AddEmployee} />
      <Route path="/edit/:id"  component={EditEmployee} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));
