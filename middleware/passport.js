const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");

let user;

const localLogin = new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    (email, password, done) => {
        user = userController.getUserEamilIdAndPassword(email, password);
        return user
            ? done(null, user)
            : done(null, false), {
                message: "Error no user found"
            };
    }
);

passport.serializeUser((user, done) => {
    done(null, user.id)
});

passport.deserializeUser((id, done) => {
    const user = userController.getUserByEmail(id)
    if(user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = passport.use(localLogin);