const mongoose = require("mongoose");

const connectToDatabase = async () => {
    mongoose.set("strictQuery", true);

    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}
           @fsctaskmanagercluster.k0urzrr.mongodb.net/?
           retryWrites=true&w=majority&appName=FscTaskManagerCluster`,
        () => console.log("Connected to mongodb...")
    );
};

module.exports = connectToDatabase;
