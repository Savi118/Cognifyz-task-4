const express = require("express");
const authRouter = express.Router();

const authController = require("../controllers/authController");

authRouter.get("/signup", authController.getSignup);
authRouter.get("/login", authController.getLogin);
authRouter.post("/login", authController.handleLogin);
authRouter.post("/signup", authController.handleSignup);
authRouter.get("/logout", authController.handleLogout);

module.exports = authRouter;
