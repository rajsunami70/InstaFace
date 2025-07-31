// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";


import Post from "./models/Post.js";
import { posts, users } from "./data/index.js";
import User from "./models/User.js";

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear collections
    await User.deleteMany({});
    await Post.deleteMany({});

    // Insert data
    const insertedUsers = await User.insertMany(users);

    // Link posts to inserted user IDs if needed
    const userId = insertedUsers[0]._id; // just an example
    const postsWithUser = posts.map((post) => ({
      ...post,
      userId,
    }));

    await Post.insertMany(postsWithUser);

    console.log("🌱 Data seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("❌ Failed to seed:", err);
    process.exit(1);
  }
};

seedDatabase();
