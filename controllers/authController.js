const User = require("../models/user");

exports.getSignup = (req, res) => {
  res.render("pages/signup", { pageTitle: "Register" });
};
exports.getLogin = (req, res) => {
  res.render("pages/login", { pageTitle: "Login" });
};

exports.handleSignup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.redirect("/auth/signup?error=empty");
  }

  if (password !== confirmPassword) {
    return res.redirect("/auth/signup?error=password_mismatch");
  }

  const existing = await User.findOne({ email });
  if (existing) return res.redirect("/auth/signup?error=user_exist");

  const newUser = new User({ name, email, password });
  await newUser.save();

  req.session.user = { name, email };
  res.redirect("/");
};

exports.handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.redirect("/auth/login?error=empty");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.redirect("/auth/login?error=not_found");
  }

  if (user.password !== password) {
    return res.redirect("/auth/login?error=wrong_pass");
  }

  req.session.user = { name: user.name, email: user.email };
  res.redirect("/");
};

exports.handleLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
