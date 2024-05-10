const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

const getUsers = async (req, res) => {
    try {
      await client.connect();
      const db = client.db("travel");
      const items = await db.collection("users").find().toArray();
      console.log("Users fetched:", items);
      res.status(200).json({ status: 200, products: items });
    } catch (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ error: error.message });
    } finally {
      await client.close();
    }
  };
  

  const loginUser = async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const db = client.db("travel");
      const user = await db.collection("users").findOne({ username });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Check if password matches
      if (user.password !== password) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
      // Password matches, user is logged in
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

// Registration endpoint
const addUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const db = client.db("travel");
    
    // Check if username is already taken
    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    await db.collection("users").insertOne({ username, password });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { getUsers , loginUser , addUser};