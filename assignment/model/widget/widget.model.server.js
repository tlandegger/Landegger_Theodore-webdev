var mongoose = require("mongoose");
var widgetSchema = require("./widget.schema.server");
var db = require("../models.server");
var widgetModel = mongoose.model("widgetModel", widgetSchema);
var pageModel = require("../page/page.model.server");

widgetModel.createWidgetForPage = createWidgetForPage;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findwidgetById= findwidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.addWidget = addWidget ;
widgetModel.removeWidget = removeWidget;
module.exports = widgetModel;

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        .populate('_page', 'name')
        .exec();
}

function updateWidget(widgetId, widget) {
    return widgetModel.update({_id: widgetId},
        {$set: widget});
}

function createWidgetForPage(pageId, widget) {
    console.log(pageId);
    widget._page = pageId;
    var widgetTmp = null;
    return widgetModel
        .create(widget)
        .then(function (widgetDoc) {
            widgetTmp = widgetDoc;
            return pageModel.addWidget(pageId, widgetDoc._id);
        })
        .then(function (pageDoc) {
            return widgetTmp;
        })
}

function findwidgetById(widgetId) {
    return widgetModel.findById(widgetId);
}

function deleteWidget(pageId, widgetId) {
    return widgetModel
        .remove({_id: widgetId})
        .then(function (status) {
            return pageModel.removeWidget(pageId, widgetId)
        });
}