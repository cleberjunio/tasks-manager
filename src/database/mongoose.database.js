const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectToDatabase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.az4liz3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0@cluster0.az4liz3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,
        () => console.log("Connected to mongodb...")
    );
};

module.exports = connectToDatabase;
