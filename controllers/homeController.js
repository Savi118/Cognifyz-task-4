const Question = require("../models/question");
const Result = require("../models/results");

exports.getHome = (req, res) => {
  res.render("pages/home", { pageTitle: "Home", ...res.locals });
};

exports.getPlay = (req, res) => {
  const level = req.query?.level || null;
  res.render("pages/play", {
    pageTitle: "Play",
    level,
  });
};

exports.handleLevel = (req, res) => {
  const level = req.body.level;
  return res.redirect(`/play?level=${level}`);
};

exports.getQuestions = async (req, res) => {
  const level = req.query.level;

  try {
    const questions = await Question.find({ level });
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
};

exports.saveResult = async (req, res) => {
  const { level, score } = req.body;
  const user = req.session.user;
  if (!user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  await Result.create({
    user: user.name,
    level,
    score,
  });

  res.json({ success: true });
};

exports.getResults = async (req, res) => {
  const results = await Result.find().sort({ date: -1 }).limit(20);
  res.render("pages/results", {
    results,
    pageTitle: "Leaderboards",
  });
};

exports.getAbout = (req, res) => {
  res.render("pages/about", { pageTitle: "About", ...res.locals });
};
