let database = require("../models/database");

let remindersController = {
  list: (req, res) => {
    res.render("reminder/index", { reminders: database[req.user.id].reminders });
  },

  new: (req, res) => {
    res.render("reminder/create"); 
  },

  listOne: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.user.id].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    if (searchResult != undefined) {
      res.render("reminder/single-reminder", { reminderItem: searchResult });
    } else {
      res.render("reminder/index", { reminders: database[req.user.id].reminders });
    }
  },

  create: (req, res) => {
    let reminder = {
      id: database[req.user.id].reminders.length + 1,
      title: req.body.title,
      description: req.body.description,
      completed: false
    };
    database[req.user.id].reminders.push(reminder);
    res.redirect("/reminders");
  },

  edit: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.user.id].reminders.find(function (reminder) {
      return reminder.id == reminderToFind;
    });
    res.render("reminder/edit", { reminderItem: searchResult });
  },

  update: (req, res) => {
    let reminderId = req.params.id;
    let reminderTitle = req.body.title;
    let reminderDesc = req.body.description;
    let reminderComp = req.body.completed;
    let searchResult = database[req.user.id].reminders.find((reminder) => {
      return reminder.id == reminderId;
    })
    if(searchResult != undefined) {
      searchResult.title = reminderTitle;
      searchResult.description = reminderDesc;
      if (reminderComp === "true") {
        searchResult.completed = true;
      } else {
        searchResult.completed = false;
      }
    }
    res.redirect("/reminders")
  },

  delete: (req, res) => {
    let reminderToFind = req.params.id;
    let searchResult = database[req.user.id].reminders.find((reminder) => {
      return reminder.id == reminderToFind;
    })
    if(searchResult != undefined) {
      const i = database[req.user.id].reminders.indexOf(searchResult);
      database[req.user.id].reminders.splice(i, 1);
    } 
      res.redirect("/reminders");
  },
};

module.exports = remindersController;
