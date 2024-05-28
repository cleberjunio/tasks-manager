const mongoose = require("mongoose");

const connectToDatabase = async () => {
    await mongoose
        .connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}
        @fsctaskmanagercluster.6xjmr8h.mongodb.net/?retryWrites=true&w=majority&appName=FscTaskManagerCluster`
        )
        .then(() => console.log("Connected to mongodb..."))
        .catch((err) => console.log("Conexão falhou", err));
};

module.exports = connectToDatabase;
