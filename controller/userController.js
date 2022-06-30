const database  = require("../models/database");
const userModel = require("../models/userModel");

const getUserEamilIdAndPassword = (email, password) => {
    const user = userModel.findOne(email);
    if(user) {
        if(isUserValid(user, password)) {
            return user;
        }
    }
    return null;
};

const getUserByEmail = (email) => {
    let user = userModel.findById(id);
    if(user) {
        return user;
    }
    return null;
};

const isUserValid = (user, password) => {
    return user.password === password;
}

module.exports = {
    getUserByEmail,
    getUserEamilIdAndPassword
};