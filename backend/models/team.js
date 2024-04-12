// import mongoose module
const mongoose = require("mongoose");

const teamSchema = mongoose.Schema({
    id: Number,
    name: String ,
    country: String,
});

//modal name: "Team" (PascalCase)
const team = mongoose.model("Team", teamSchema);

module.exports = team;