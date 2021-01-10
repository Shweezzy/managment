const mongoose = require("mongoose");
const config = require("config");

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL || config.get("mongoURL"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("MongoDb is connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectToDB;
