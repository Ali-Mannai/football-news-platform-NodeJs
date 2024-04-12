// import mongoose module
const mongoose = require("mongoose");

const playerSchema = mongoose.Schema({
    id: Number,
    name: String,
    nbr: Number, 
    position: String,
});

//modal name: "Player" (PascalCase)
const player = mongoose.model("Player", playerSchema);

module.exports = player;