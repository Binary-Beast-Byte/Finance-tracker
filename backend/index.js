const express = require("express");

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

const passport = require("passport");
const cookieSession = require("cookie-session");

// const session = require('express-session')
require("./passport");

require('./models/User.model')

require("dotenv").config();

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;

//multer path
const db = require("./models");

const cors = require("cors");

app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:5173", "http://localhost:3001"];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header("Access-Control-Allow-Methods", [
    "GET",
    "OPTIONS",
    "UPDATE",
    "POST",
    "DELETE",
  ]);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, accesstoken"
  );
  res.header("Access-Control-Allow-Credentials", true);
  return next();
});

const authRoute = require('./routes/auth.routes')
app.use('/auth', authRoute)

app.get("/auth/checkAuth", (req, res) => {
	console.log("🚀 ~ file: index.js:61 ~ app.get ~ req:", req)
	if (req.session && req.session.authenticated) {
	  res.json({ authenticated: true });
	} else {
	  res.json({ authenticated: false });
	}
  });

const categoryRoute = require('./routes/category.routes')
app.use('/category', categoryRoute);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
