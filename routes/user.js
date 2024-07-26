const express = require("express");

const userController = require("../controllers/user");
const indexController = require("../controllers/index");

const fetchUsers = require("../middleware/fetchUsers");

const route = express.Router();


route.get("/", indexController.getIndexPage);
route.post("/login", fetchUsers, userController.postLoginUser);
route.get("/logout", userController.getLogoutUser);

module.exports = route;