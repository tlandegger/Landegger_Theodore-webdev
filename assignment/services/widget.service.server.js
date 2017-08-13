var app = require("../../express.js");

app.get ("/api/page/:pageId/widget", findWidgetsByPageId);
app.get ("/api/widget/:widgetId", findWidgetById);
app.post("/api/page/:pageId/widget", createWidget);
app.put("/api/widget/:widgetId", updateWidget);
app.delete("/api/widget/:widgetId", deleteWidget);


var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
]

var api = {
    "createWidget" : createWidget,
    "findWidgetsByPageId" : findWidgetsByPageId,
    "findWidgetId" : findWidgetById,
    "updateWidget" : updateWidget,
    "deleteWidget" : deleteWidget
};

// adds a widget to the widgets array
function createWidget(req, res) {
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widget.pageId = req.params.pageId;
    widgets.push(widget);
    res.json(widget);
}

// Searches for widget, returns null if not found
function findWidgetsByPageId(req, res) {
    ws = []
    for (var w in widgets) {
        if (widgets[w].pageId === res.params.pageId) {
            ws.push(widgets[w]);
        }
    }
    res.json(ws);
}

// Searches for widget, returns null if not found
function findWidgetById(req, res) {
    for (var w in widgets) {
        if (widgets[w]._id === res.params.pageId) {
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}


// updates userId to new user
function updateWidget(req, res) {
    var widgetId = req.params.widgetId;
    var widget = req.body;
    for (var w in widgets) {
        if (widgets[w]._id === widgetId) {
            widgets[w] = widget;
            req.json(widget);
            return;
        }
    }
    res.sendStatus(404);
}

// Deletes user
function deleteWidget(req, res) {
    for (var w in widgets) {
        if (widgets[w]._id === req.params.widgetId) {
            var tempWidget = widgets[w];
            widgets.splice(w, 1);
            req.json(tempWidget);
            return;
        }
    }
    res.sendStatus(404);
}