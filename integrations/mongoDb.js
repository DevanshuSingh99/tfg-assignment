import mongoose from "mongoose";

var mongoDb;
function connectMongoDb() {
    return new Promise((resolve, reject) => {
        mongoDb = mongoose.connect(process.env.MONGO_URI);
        resolve()
    });
}

export { mongoDb, connectMongoDb };
