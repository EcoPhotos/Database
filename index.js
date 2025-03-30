const mongoose = require("mongoose");
const { mongoURI, options } = require("./config");

async function connectDB() {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1); 
  }
}

module.exports = connectDB;
