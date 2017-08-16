var mongoose = require("mongoose");
var pageSchema = require("./page.schema.server");
var db = require("../models.server");
var pageModel = mongoose.model("pageModel", pageSchema);
var websiteModel = require("../website/website.model.server");

pageModel.createPageForWebsite = createPageForWebsite;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findpageById= findpageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget ;
pageModel.removeWidget = removeWidget;
module.exports = pageModel;


function removeWidget(pageId, widgetId) {
    return pageModel
        .findpageById(pageId)
        .then(function (page) {
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index, 1);
            return page.save();
        })
}

function addWidget(pageId, widgetId) {
    return pageModel
        .findById(pageId)
        .then(function (page) {
            page.widgets.push(widgetId);
            return page.save();
        });
}


function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website', 'name')
        .exec();
}

function updatePage(pageId, page) {
    return pageModel.update({_id: pageId},
        {$set: page});
}

function createPageForWebsite(websiteId, page) {
    console.log(websiteId);
    page._website = websiteId;
    var pageTmp = null;
    return pageModel
        .create(page)
        .then(function (pageDoc) {
            pageTmp = pageDoc;
            return websiteModel.addPage(websiteId, pageDoc._id);
        })
        .then(function (websiteDoc) {
            return pageTmp;
        })
}

function findpageById(pageId) {
    return pageModel.findById(pageId);
}

function deletePage(websiteId, pageId) {
    return pageModel
        .remove({_id: pageId})
        .then(function (status) {
            return websiteModel.removePage(websiteId, pageId)
        });
}