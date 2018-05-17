const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    socialProvider: String,
    providerId: String,
    userName: String
});

mongoose.model("users", userSchema);