const express = require("express");
const homeRouter = express.Router();

const homeController = require("../controllers/homeController");

homeRouter.get("/", homeController.getHome);
homeRouter.get("/play", homeController.getPlay);
homeRouter.post("/play", homeController.handleLevel);
homeRouter.get("/api/questions", homeController.getQuestions);
homeRouter.post("/results/save", homeController.saveResult);
homeRouter.get("/results", homeController.getResults);
homeRouter.get("/about", homeController.getAbout);

module.exports = homeRouter;
