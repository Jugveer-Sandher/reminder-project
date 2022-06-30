const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controller/userController");

let user;

const localLogin = new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    (email, password, done) => {
        user = userController.getUserByEmail(email);
        console.log("user",user)
        return user
            ? done(null, user)
            : done(null, false), {
                message: "Error no user found"
            };
    }
); 

console.log(user)

passport.serializeUser((user, done) => {
    console.log(user.id)
    done(null, user.id)
});

passport.deserializeUser((email, done) => {
    const user = userController.getUserByEmail(email);
    if(user) {
        done(null, user);
    } else {
        done({ message: "User not found" }, null);
    }
});

module.exports = passport.use(localLogin);