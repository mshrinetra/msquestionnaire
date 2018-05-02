const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    fbID: String,
    Name: String
});

mongoose.model("users", userSchema);