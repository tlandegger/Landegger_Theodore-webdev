var app = require("../../express.js");

app.get ("/api/website/:websiteId/page", findPagesByWebsiteId);
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
    "findPagesByWebsiteId" : findPagesByWebsiteId,
    "findPageById" : findPageById,
    "updatePage" : updatePage,
    "deletePage" : deletePage
};

// adds a page to the pages array
function createPage(req, res) {
    var page = req.body;
    page._id = (new Date()).getTime() + "";
    page.websiteId = req.params.websiteId;
    pages.push(page);
    res.json(page);
}

// Searches for page, returns null if not found
function findPagesByWebsiteId(req, res) {
    var ps = [];
    for (var p in pages) {
        if (pages[p].websiteId === req.params.websiteId) {
            ps.push(pages[p]);
        }
    }
    res.json(pages);
}

// Searches for page, returns null if not found
function findPageById(req, res) {
    for (var p in pages) {
        if (pages[p]._id === req.params.pageId) {
            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}


// updates userId to new user
function updatePage(req, res) {
    var pageId = req.params.pageId;
    var page = req.body;
    for (var p in pages) {
        if (pages[p]._id === pageId) {
            pages[p] = page;
            res.json(page);
            return;
        }
    }
    res.sendStatus(404);
}

// Deletes user
function deletePage(req, res) {
    for (var p in pages) {
        if (pages[p]._id === req.params.pageId) {
            var tempPage = pages[p];
            pages.splice(p, 1);
            res.json(tempPage);
            return;
        }
    }
    res.sendStatus(404);
}

