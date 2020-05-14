import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:5000/");
const changeData = () => socket.emit("initData");
const socketEvent = {
  initEmpData: (getData) => {
    socket.emit("initData");
    socket.on("getAllData", getData);
    socket.on("changeData", changeData);
  },
  insertEmp: (empData) => {
    socket.emit("insertEmp", empData);
  },
  getEditEmpData: (empId, getData) => {
    socket.emit("getEditData", empId);
    socket.on("getOneEditEmpData", getData);
  },
  editEmp: (id, empData) => {
    socket.emit("editEmp", {
      id,
      empData,
    });
  },
  deleteEmp: (empId) => {
    socket.emit("deleteEmp", empId);
  },
};

export default socketEvent;
