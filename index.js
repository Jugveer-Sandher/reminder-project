const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const { forwardAuthenticated, ensureAuthenticated } = require("./middleware/checkAuth");
const userController = require("./controller/userController")
const GitHubStrategy = require('passport-github').Strategy;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    // store: new fileStore(),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
)

const passport = require("./middleware/passport");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(`User details are: `);
//   console.log(req.user);

//   console.log("Entire session object:");
//   console.log(req.session);

//   console.log(`Session details are: `);
//   console.log(req.session.passport);
//   next();
// });

// Routes start here

app.get("/reminders", ensureAuthenticated, reminderController.list);

app.get("/reminder/new", reminderController.new);

app.get("/reminder/:id", reminderController.listOne);

app.get("/reminder/:id/edit", reminderController.edit);

app.post("/reminder/", reminderController.create);

app.post("/reminder/update/:id", reminderController.update);

app.post("/reminder/delete/:id", reminderController.delete);

// Fix this to work with passport! The registration does not need to work, you can use the fake database for this.
app.get("/register", authController.register);
app.get("/login", forwardAuthenticated, authController.login);
app.post("/register", authController.registerSubmit);
app.post( "/auth/login",
  passport.authenticate("local", {
    successRedirect: "/reminders",
    failureRedirect: "/auth/login",
}))
app.get("/logout", function(req, res, next) {
  req.logout(function(err) {
    if (err) { next(err) }
  });
  res.redirect("/login"); 
})

// GitHub Login
passport.use(new GitHubStrategy({
    clientID: "4cdd55ea6eb1dbcd41da",
    clientSecret: "a48614b9ba5a8d50ef2f954060b365b64095ec13",
    callbackURL: "http://localhost:3001/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    let user = userController.getUserByGitHubIdOrCreate(profile);
    return done(null, user)
  }
));

app.get('/auth/github',
  passport.authenticate('github')
);

app.get('/auth/github/callback', 
  passport.authenticate('github'),
  function(req, res) {
    res.redirect("/reminders")
  });
 
// localhost:3001
app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001 in your browser 🚀"
  );
});
