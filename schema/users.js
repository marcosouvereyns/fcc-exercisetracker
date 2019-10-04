var mongo = require('mongodb')
var mongoose = require('mongoose')


//User schema
var Schema = mongoose.Schema

let UserSchema = new Schema({
  username: String,
  id: String
})
let User = mongoose.model('User', UserSchema);


module.exports= {
  User
}