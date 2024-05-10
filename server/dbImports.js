const { MongoClient } = require("mongodb");
const users = require('./data/users.json')
require("dotenv").config();


const { MONGO_URI } = process.env;
console.log(MONGO_URI)

const client = new MongoClient(MONGO_URI);

const batchImport = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("travel");

    // Insert data to data->companies collection
    const result = await db.collection("users").insertMany(users);
    console.log(`${result.insertedCount} documents inserted`);

  } catch (error) {
    console.log(error);
  } finally {
    console.log("disconnected");
    client.close();
  }
};

batchImport();
