var db = require("../database.js");
var {User} = require('../schema/users.js')
var {Exercise} = require('../schema/exercises.js')
var shortid = require('shortid')


function createUser(req, res){
  console.log("Trying to create user", req.body.username)
  if(req.body.username === "") return res.json({"error": "empty username"})
  let newUser = new User({username: req.body.username, id:shortid.generate()})
  db.get().collection("Users").insertOne(newUser, (err, result) => {
    if(err) return console.error(err)
    res.json(newUser)
  })
}

function getUsers(req, res){
  console.log("Fetching users")
  db.get().collection("Users").find().toArray(function(err, users) {
    if(err) return console.error(err)
    res.json(users)
  })
}

function createExercise(req, res){
  console.log("Trying to add exercise", req.body)
  let date = req.body.date ? new Date(req.body.date) : new Date()
  let newExercise = new Exercise({ userId: req.body.userId, description: req.body.description, duration: req.body.duration, date: date})
  db.get().collection("Exercises").insertOne(newExercise, (err, exercise) => {
    if(err) return console.error(err)
    db.get().collection("Users").findOne({id:req.body.userId}, (err, foundUser) => {
      if(err) return console.error(err)
      let user = {user: foundUser.username, userId: req.body.userId, description: req.body.description, duration: req.body.duration, date: date}
      res.json(user)
    })
  })
}


function getExercise(req, res){
  let to = new Date(req.query.to)
  let from = new Date(req.query.from)
  
  let query = {
    userId: req.params.userId
      ,date: {
          $lt: to != 'Invalid Date' ? to : Date.now(),
          $gt: from != 'Invalid Date' ? from : new Date(0)
      }
  }
  
  console.log("Fetching exercise")
  
  db.get().collection("Exercises").find(query)
    .sort({date: -1})
    .limit(parseInt(req.query.limit))
    .toArray(function(err, exercises){
      if(err) console.error(err)
      res.json({exercises: exercises})
    })
}

module.exports = {
  createUser,
  getUsers,
  createExercise,
  getExercise
}