const { name } = require("ejs");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/questions.json");
const resultsFile = path.join(__dirname, "../data/results.json");

function loadResults() {
  if (!fs.existsSync(resultsFile)) return [];

  const data = fs.readFileSync(resultsFile, "utf8").trim();
  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch (err) {
    console.error("❌ Corrupted results.json. Resetting file.");
    fs.writeFileSync(resultsFile, "[]");
    return [];
  }
}

function saveResultsFile(data) {
  fs.writeFileSync(resultsFile, JSON.stringify(data, null, 2));
}

exports.getHome = (req, res) => {
  res.render("pages/home", { pageTitle: "Home", ...res.locals });
};

exports.getPlay = (req, res) => {
  const level = req.query?.level || null;
  res.render("pages/play", {
    ...res.locals,
    pageTitle: "Play",
    level,
  });
  console.log("GET PLAY — user session:", req.session.user);
};

exports.handleLevel = (req, res) => {
  const level = req.body.level;
  return res.redirect(`/play?level=${level}`);
};

exports.getQuestions = (req, res) => {
  const level = req.query.level;

  const data = JSON.parse(fs.readFileSync(filePath));

  if (!data[level]) {
    return res.status(400).json({ error: "Invalid level" });
  }

  res.json(data[level]);
};

exports.saveResult = (req, res) => {
  const { level, score } = req.body;
  const user = req.session.user;
  if (!user) {
    return res.status(401).json({ error: "Not logged in" });
  }

  const results = loadResults();

  results.push({
    name: user.name,
    level,
    score,
    date: new Date(),
  });

  saveResultsFile(results);
  res.json({ success: true });
  console.log("SAVE RESULT — user session:", req.session.user);
};

exports.getResults = (req, res) => {
  const results = loadResults().slice(-20).reverse();
  res.render("pages/results", {
    results,
    pageTitle: "Leaderboards",
    ...res.locals,
  });
};

exports.getAbout = (req, res) => {
  res.render("pages/about", { pageTitle: "About", ...res.locals });
};
