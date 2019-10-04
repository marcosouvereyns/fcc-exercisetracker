const mongoClient = require('mongodb').MongoClient;

let mongodb;

function connect(callback){
    mongoClient.connect(process.env.MONGO_URI, (err, db) => {
        mongodb = db.db("ExerciseTrackerData");
        callback();
    });
}

function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};