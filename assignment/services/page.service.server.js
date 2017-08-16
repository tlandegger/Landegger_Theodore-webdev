var app = require("../../express.js");
var pageModel = require('../model/page/page.model.server');


app.get ("/api/website/:websiteId/page", findPagesForWebsite);
app.get ("/api/page/:pageId", findPageById);
app.post("/api/website/:websiteId/page", createPage);
app.put("/api/page/:pageId", updatePage);
app.delete("/api/page/:pageId", deletePage);


var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
]

var api = {
    "createPage" : createPage,
    "findPagesByWebsiteId" : findPagesForWebsite,
    "findPageById" : findPageById,
    "updatePage" : updatePage,
    "deletePage" : deletePage
};

// adds a page to the pages array
function createPage(req, res) {
    var websiteId = req.params.websiteId;
    var page = req.body;
    var websiteId = req.params.websiteId;
    pageModel
        .createPageForWebsite(websiteId, page)
        .then(function (pageDoc) {
            res.json(pageDoc);
        }, function (err) {
            res.statusCode(500).send(err);
        })
}

function findPageById(req, res) {
    pageModel
        .findpageById(req.params.pageId)
        .then(function (pageDoc) {
            res.json(pageDoc);
        }, function (err) {
            res.sendStatus(404).send(err);
        });
}

function findPagesForWebsite(req, res) {
    var abc = req.params.websiteId;
    var websiteId = req.params.websiteId
    console.log(abc);
    pageModel
        .findAllPagesForWebsite(websiteId)
        .then(function (pages) {
            res.json(pages);
        });
}

// updates websiteId to new website
function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;

    pageModel
        .updatePage(pageId, page)
        .then(function (status) {
            res.json(status);
        });
}

// Deletes page
function deletePage(req, res) {
    var pageId = req.params.pageId;
    var developerId = req.params.websiteId;
    pageModel
        .deletePage(developerId, pageId)
        .then(function (status) {
            res.json(status);
        });
}
