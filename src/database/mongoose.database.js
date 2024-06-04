const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectToDatabase = async () => {
    await mongoose.connect(
        `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}
        @fsctaskmanangercluster.st3pbn4.mongodb.net/?
        retryWrites=true&w=majority&appName=FscTaskManangerCluster`,
        () => console.log("Connected to mongodb...")
    );
};

module.exports = connectToDatabase;
