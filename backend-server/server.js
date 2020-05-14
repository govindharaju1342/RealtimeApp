const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const db = require("monk")("localhost:27017/socket");

const empCollection = db.get("employees");
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  console.log("New client connected" + socket.id);
  socket.on("initData", () => {
    empCollection.find({}).then((docs) => {
      io.sockets.emit("getAllData", docs);
    });
  });
  socket.on("insertEmp", (empDetails) => {
    empCollection.insert(empDetails).then(() => {
      io.sockets.emit("changeData");
    });
  });
  socket.on("getEditData", (empId) => {
    empCollection.find({ _id: empId }).then((docs) => {
      io.sockets.emit("getOneEditEmpData", docs);
    });
  });
  socket.on("editEmp", (data) => {
    empCollection
      .findOneAndUpdate({ _id: data.id }, { $set: data.empData })
      .then(() => {
        io.sockets.emit("changeData");
      });
  });
  socket.on("deleteEmp", (empId) => {
    empCollection.remove({ _id: empId }).then(() => {
      io.sockets.emit("changeData");
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("server is up and running");
});

server.listen(port, () => console.log(`Listening on port ${port}`));
