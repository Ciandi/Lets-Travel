const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const client = new MongoClient(MONGO_URI, options);

// Endpoint to get all users
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


// Endpoint to log in a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    await client.connect();
    const db = client.db("travel");
    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};

// Endpoint to add a new user
const addUser = async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    await client.connect();
    const db = client.db("travel");

    const existingUser = await db.collection("users").findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    await db.collection("users").insertOne({ username, password });

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};


// Endpoint to change a user password
const changePassword = async (req, res) => {
  const { username, currentPassword, newPassword } = req.body;

  try {
    await client.connect();
    const db = client.db("travel");
    const user = await db.collection("users").findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password !== currentPassword) {
      return res.status(401).json({ message: "Invalid current password" });
    }

    await db
      .collection("users")
      .updateOne({ username }, { $set: { password: newPassword } });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};


// Endpoint to delete a user account
const deleteUser = async (req, res) => {
  const { username } = req.body;

  try {
    await client.connect();
    const db = client.db("travel");
    const result = await db.collection("users").deleteOne({ username });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};


// Endpoint to add the api data to favorite
const addFavorite = async (req, res) => {
  const { username, hotel } = req.body; 

  try {
    await client.connect();
    const db = client.db("travel");

    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await db.collection("users").updateOne(
      { username },
      { $addToSet: { bookmarks: hotel } }
    );

    res.status(200).json({ message: "Hotel added to favorites" });
  } catch (error) {
    console.error("Error adding favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};


// Endpoint to get and display the user favorites
const getFavorites = async (req, res) => {
  const { username } = req.params;

  try {
    await client.connect();
    const db = client.db("travel");

    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { bookmarks } = user;
    if (!bookmarks || bookmarks.length === 0) {
      return res.status(200).json({ message: "User has no bookmarks" });
    }

    res.status(200).json({ status: 200, favorites: bookmarks });
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};


// Endpoint to delete the favorite
const deleteFavorite = async (req, res) => {
  const { username, hotelId } = req.body;

  try {
    await client.connect();
    const db = client.db("travel");

    const user = await db.collection("users").findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await db.collection("users").updateOne(
      { username },
      { $pull: { bookmarks: { hotel_id: hotelId } } }
    );

    res.status(200).json({ message: "Hotel removed from favorites" });
  } catch (error) {
    console.error("Error removing favorite:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    await client.close();
  }
};

module.exports = {
  getUsers,
  loginUser,
  addUser,
  changePassword,
  deleteUser,
  addFavorite,
  getFavorites,
  deleteFavorite,
};
