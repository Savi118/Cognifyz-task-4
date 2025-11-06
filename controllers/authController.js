const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "../data/user.json");

const loadUsers = () => {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile, "utf8"));
};

const saveUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

exports.getSignup = (req, res) => {
  res.render("pages/signup", { pageTitle: "Register" });
};
exports.getLogin = (req, res) => {
  res.render("pages/login", { pageTitle: "Login" });
};

exports.handleSignup = (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.redirect("/auth/signup?error=empty");
  }

  if (password !== confirmPassword) {
    return res.redirect("/auth/signup?error=password_mismatch");
  }

  let users = loadUsers();

  if (users.find((u) => u.email === email)) {
    return res.redirect("/auth/signup?error=exists");
  }

  users.push({ name, email, password });
  saveUsers(users);

  req.session.user = { name, email };

  return res.redirect("/");
};

exports.handleLogin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect("/auth/login?error=empty");
  }

  const users = loadUsers();

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.redirect("/auth/login?error=not_found");
  }

  if (user.password !== password) {
    return res.redirect("/auth/login?error=wrong_pass");
  }

  req.session.user = { name: user.name, email: user.email };
  req.session.save(() => {
    res.redirect("/");
  });
};

exports.handleLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
