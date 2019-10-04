var mongo = require('mongodb')
var mongoose = require('mongoose')


//User schema
var Schema = mongoose.Schema

let ExerciseSchema = new Schema({
  userId: String,
  description: String,
  duration: Number,
  date: Date
})
let Exercise = mongoose.model('Exercise', ExerciseSchema);


module.exports= {
  Exercise
}