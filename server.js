var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

var app = express();
var PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

var tables = [
    {
        routeName: "emily",
        name: "Emily",
        phoneNumber: 5193246725,
        email: "emily@gmail.com"
    },
    {
        routeName: "allison",
        name: "Allison",
        phoneNumber: 6790245762,
        email: "allison@gmail.com"
    },
    {
        routeName: "travis",
        name: "Travis",
        phoneNumber: 2104694829,
        email: "travis@gmail.com"
    }
];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});

// Displays all tables
app.get("/api/tables", function(req,res) {
    return res.json(tables);
});

app.get("/api/tables/:table", function(req, res) {
    var chosen = req.params.table;

    console.log(chosen);

    for (var i = 0; i < tables.length; i++) {
        if (chosen === tables[i].routeName) {
            return res.json(tables[i]);
        }
    }

    return res.json(false);
});

// Create New Tables
app.post("/api/tables", function(req, res) {
    var newTable = req.body;

    newTable.routeName = newTable.name.replace(/\s+/g, "").toLowerCase();

    console.log(newTable);

    tables.push(newTable);
    res.json(newTables);
});

app.listen(PORT, function() {
    console.log("listening on PORT " + PORT);
});