//import express module
const express = require("express");

//import body-parser module
const bodyParser = require("body-parser");

//import mongoose module
const mongoose = require("mongoose");

//myDB le nom de la DB
mongoose.connect("mongodb://localhost:27017/myDB")

//import Match Model
const Match = require("./models/match");

//import Team Model
const Team = require("./models/team");

//import Player Model
const Player = require("./models/player");

//create express application
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

//configuer APP with bodyparser to send response => JSON
app.use(bodyParser.json());

// var teamstab = [
//     { id: 1, name: "RMA" , country: "Spain" },
//     { id: 12,name: "BAR" , country: "Spain"},          
//     { id: 35,name: "LIV" , country: "England"},
// ];
// var matchestab = [
//     { id: 1, scoreOne: 1, scoreTwo: 2, teamOne: "AUS", teamTwo: "ARG" },
//     { id: 12, scoreOne: 1, scoreTwo: 0, teamOne: "TUN", teamTwo: "FRA" },          
//     { id: 35, scoreOne: 6, scoreTwo: 2, teamOne: "ENG", teamTwo: "IRN" },
// ];
// var playerstab = [
//     { id: 1, name: "Messi", nbr: 10, position: "ATK" },
//     { id: 2, name: "CR7", nbr: 7, position: "MID" },
//     { id: 3, name: "CR7", nbr: 7, position: "MID", age: 38 },
// ];


//Business logic: REQ 1 get all matches
app.get("/matches", (req, res) => {
Match.find().then((docs) => {
    res.json({matches: docs});
});
   // console.log("Here BL : REQ get all matches");   //msg fel terminal
   // res.json({matches : matchestab});              //message elli bech yarjaa lel utilisateur
});


//Business logic: REQ 2   get all players
app.get("/players", (req, res) => {
Player.find().then((docs) => {
    res.json({players: docs});
});
   // console.log("Here BL : REQ get all players");
   // res.json({players: playerstab});
});

//Business logic: REQ 3 => Get one match by ID (:id => un paramètre)
app.get("/matches/:id", (req, res) => {

    console.log("Here BL : REQ to get match by ID");
    var id = req.params.id;
    Match.findOne({_id: id}).then((doc) =>{
    res.json({match:doc});
});

//     for (let i = 0; i < matchestab.length; i++) {
//         if (matchestab[i].id == id) {
//             res.json({ match: matchestab[i] });
//             break;
//         }
//     }
});

//Business logic: REQ 4 => Get one player by ID (:id => un paramètre)
app.get("/players/:id", (req, res) => {

    console.log("Here BL : REQ to get player by ID");
    var id = req.params.id;
    for (let i = 0; i < playerstab.length; i++) {         //à convertir en code avec DB
        if (playerstab[i].id == id) {
            res.json({ match: playerstab[i] });
            break;
        }
    }
});
//Business logic: REQ 5 ==> delete one match by ID (:id=>
app.delete("/matches/:id", (req, res) => {     // deux pts elli kbal id mtaa variable maaneha kol mara haja 

    console.log("Here BL : REQ to delete match by id");
    var x= req.params.id;
    Match.deleteOne({_id: x }).then((response) =>{
        console.log("here response from DB",response);
        if (response.deletedCount== 0) {
            res.json({message: "not deleted"});
        } else {
            res.json({message: "Deleted with success"});
        }
    });
    // for (let i = 0; i < matchestab.length; i++) {
    //     if (x==matchestab[i].id) {
    //         matchestab.splice(i,1);
    //         res.json({message: `Match N° ${i} deleted with success`});    // ` altgr + 7
    //         break;
    //     }      
    // }
});

// business logic : logic : REQ 6 => add match
app.post("/matches", (req,res) => {
    console.log("here BL : REQ to add match",req.body);
    let matchObj= new Match(req.body);
    matchObj.save();
    // matchestab.push(req.body);
    res.json({message: "Match added with success"});
});

// REQ7: edit match by id
app.put("/matches/:id", (req,res) => {
    console.log("here BL : REQ to edit match by id");
    var id=req.params.id;
    Match.updateOne({_id:id}, req.body).then((response) => {
        res.json({message: "update with success"});
    })
    // for (let i = 0; i < matchestab.length; i++) {
    //     if (matchestab[i].id==id) {
    //         matchestab[i]=req.body;
    //     }
    //     res.json({message: "match edited with success"});
    //     break;
        
    // }
});

//Business logic: REQ 8    get all teams
app.get("/teams", (req, res) => {
Team.find().then((docs) => {
    res.json({teams: docs});
});
  //  console.log("Here BL : REQ get all teams");   
   // res.json({teamss : teamstab});             
});

//Business logic: REQ 9 => Get one team by ID (:id => un paramètre)
app.get("/teams/:id", (req, res) => {

    console.log("Here BL : REQ to get team by ID");
    var id = req.params.id;
    for (let i = 0; i < teamstab.length; i++) {
        if (teamstab[i].id == id) {                        
            res.json({ team: teamstab[i] });              
            break;
        }
    }
});

// business logic : logic : REQ 10 => add team
app.post("/teams", (req,res) => {
    console.log("here BL : REQ to add team",req.body);
    let teamObj= new team(req.body);
    teamObj.save();
    // teamstab.push(req.body);
    res.json({message: "team added with success"});

});

// business logic : logic : REQ 10 => add player
app.post("/players", (req,res) => {
    console.log("here BL : REQ to add player",req.body);
    let playerObj= new player(req.body);
    playerObj.save();
    // playerstab.push(req.body);
    res.json({message: "player added with success"});

});
//make app importable
module.exports = app;

