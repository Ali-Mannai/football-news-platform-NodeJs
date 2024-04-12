// import mongoose module
const mongoose = require("mongoose");

const matchSchema = mongoose.Schema({
    scoreOne: Number,
    scoreTwo: Number,
    teamOne: String,
    teamTwo: String,
});

//modal name: "Match" (PascalCase)
const match = mongoose.model("Match", matchSchema);

module.exports = match;