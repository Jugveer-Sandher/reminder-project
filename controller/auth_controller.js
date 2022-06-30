let database   = require("../models/database");
const passport = require("../middleware/passport");

const authController = {
  login: (req, res) => {
    res.render("auth/login");
  },

  register: (req, res) => {
    res.render("auth/register");
  },

  loginSubmit: (req, res) => {
    console.log("hi")
    console.log("req",req.body)
    passport.authenticate("local", {
      successRedirect: "/reminders",
      failureRedirect: "/auth/login"
    })
  },

  logout: (req, res) => {
    req.logout();
    res.redirect("/auth/login"); 
  },

  registerSubmit: (req, res) => {
    // implement
  },
};

module.exports = authController;
