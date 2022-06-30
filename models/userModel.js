const database = require("./database.js");

const userModel = {
    findOne: (email) => {
        const user = database.find((user) => user.email === email);
        if(user) {
            return user;
        }
        throw new Error(`Couldn't find user with email: ${email}`);
    },
    
    findById: (id) => {
        const user = database.find((user) => user.id === id);
        if(user) {
            return user;
        }
        throw new Error(`Couldn't find user with ID: ${id}`);
    }
};

module.exports = { userModel };