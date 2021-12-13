const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;

/* Connect to the in-memory database. */
module.exports.connect = async () => {
    try {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        process.env.MONGO_URI = uri;

    } catch (error) {
        console.log(error)
    }
}

/* Drop database, close the connection and stop mongod. */
module.exports.closeDatabase = async () => {
    try {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
        await mongod.stop();
    } catch (error) {
        console.log(error)
    }
}

/* Remove all the data for all db collections. */
module.exports.clearDatabase = async () => {
    try {
        const collections = mongoose.connection.collections;

        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany();
        }
    } catch (error) {
        console.log(error)
    }
}