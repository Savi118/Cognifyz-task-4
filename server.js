require("dotenv").config();
const express = require("express");
const path = require("path");
const session = require("express-session");
const FileStore = require("session-file-store")(session);

// local module
const homeRouter = require("./routes/homeRoute");
const authRouter = require("./routes/authRoute");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    store: new FileStore({
      path: path.join(__dirname, "sessions"),
      logFn: function () {},
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      sameSite: "lax",
      secure: false,
    },
  })
);
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

app.use("/", homeRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Your server is running on https://localhost:${PORT}`);
});
