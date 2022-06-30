const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const { forwardAuthenticated } = require("./middleware/checkAuth");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    store: new fileStore(),
    secret: "secret",
    resave: true,
    saveUninitialized: false
  })
)

const passport = require("./middleware/passport");
const reminderController = require("./controller/reminder_controller");
const authController = require("./controller/auth_controller");

app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize())
app.use(passport.session());

// Routes start here

app.get("/reminders", reminderController.list);

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
app.post("/login", authController.loginSubmit);

// localhost:3001
app.listen(3001, function () {
  console.log(
    "Server running. Visit: localhost:3001 in your browser 🚀"
  );
});
