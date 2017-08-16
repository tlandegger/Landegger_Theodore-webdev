var mongoose = require("mongoose");
var websiteSchema = require("./website.schema.server");
var db = require("../models.server");
var websiteModel = mongoose.model("websiteModel", websiteSchema);
var userModel = require("../user/user.model.server");

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findwebsiteById= findwebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;
websiteModel.addPage = addPage;
websiteModel.removePage = removePage;
module.exports = websiteModel;

function removePage(websiteId, pageId) {
    return websiteModel
        .findwebsiteById(websiteId)
        .then(function (website) {
            var index = website.pages.indexOf(pageId);
            website.pages.splice(index, 1);
            return website.save();
        })
}

function addPage(websiteId, pageId) {
    return websiteModel
        .findById(websiteId)
        .then(function (website) {
            website.pages.push(pageId);
            return website.save();
        });
}


function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();
}

function updateWebsite(websiteId, website) {
    return websiteModel.update({_id: websiteId},
        {$set: website});
}

function createWebsiteForUser(userId, website) {
    website._user = userId;
    var websiteTmp = null;
    console.log(website);
    return websiteModel
        .create(website)
        .then(function (websiteDoc) {
            websiteTmp = websiteDoc;
            return userModel.addWebsite(userId, websiteDoc._id);
        })
        .then(function (userDoc) {
            return websiteTmp;
        })
}

function findwebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function deleteWebsite(userId, websiteId) {
    return websiteModel
        .remove({_id: websiteId})
        .then(function (status) {
            return userModel.removeWebsite(userId, websiteId)
        });
}