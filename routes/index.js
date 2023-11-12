const express = require("express");
const route = express.Router();
const authRoute = require("./auth-route");

route.get("/", (req, res) => {
    res.json("ToDoList API with Express & Sequelize");
});

route.use("/auth", authRoute);

module.exports = route;
