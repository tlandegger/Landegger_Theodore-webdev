var app = require("../../express.js");
var websiteModel = require('../model/website/website.model.server');

app.get ("/api/user/:userId/website", findWebsitesForUser);
app.get ("/api/user/:userId/website/:websiteId", findWebsiteById);
app.post("/api/user/:userId/website", createWebsite);
app.put("/api/website/:websiteId", updateWebsite);
app.delete("/api/website/:websiteId", deleteWebsite);

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

function createWebsite(req, res) {
    var website = req.body;
    var userId = req.params.userId;
    websiteModel
        .createWebsiteForUser(userId, website)
        .then(function (websiteDoc) {
            res.json(websiteDoc);
        }, function (err) {
            res.statusCode(500).send(err);
        })
}

function findWebsiteById(req, res) {
    websiteModel
        .findwebsiteById(req.params.websiteId)
        .then(function (websiteDoc) {
            res.json(websiteDoc);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findWebsitesForUser(req, res) {
    var userId = req.params.userId;

    websiteModel
        .findAllWebsitesForUser(userId)
        .then(function (websites) {
            res.json(websites);
        });
}

// updates userId to new user
function updateWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var website = req.body;

    websiteModel
        .updateWebsite(websiteId, website)
        .then(function (status) {
            res.json(status);
        });
}

// Deletes website
function deleteWebsite(req, res) {
    var websiteId = req.params.websiteId;
    var developerId = req.params.userId;
    websiteModel
        .deleteWebsite(developerId, websiteId)
        .then(function (status) {
            res.json(status);
        });
}
