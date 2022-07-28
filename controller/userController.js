const database = require("../models/userModel").database;
const userModel = require("../models/userModel").userModel;

const getUserEamilIdAndPassword = (email, password) => {
    const user = userModel.findOne(email);
    if(user) {
        if(isUserValid(user, password)) {
            return user;
        }
    }
    return null;
};

const getUserByEmail = (id) => {
    let user = userModel.findById(id)
    if(user) {
        return user;
    }
    return null; 
};

const isUserValid = (user, password) => {
    return user.password === password;
}

const getUserByGitHubIdOrCreate = (profile) => {
    let user = userModel.findById(profile.id)
    if(user) {
        return user;
    }
    let createdUser = userModel.createUserWithGithubId(profile);
    return createdUser;
}

module.exports = {
    getUserByEmail,
    getUserEamilIdAndPassword,
    getUserByGitHubIdOrCreate
};