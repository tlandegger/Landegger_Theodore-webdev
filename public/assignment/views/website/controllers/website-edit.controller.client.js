(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController($location, $routeParams, websiteService) {
        var model = this;

        model.updateWebsite = updateWebsite;
        model.deleteWebsite = deleteWebsite;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;

        function init() {
            websiteService.findWebsitesByUser(model.userId)
                .then(function(websites) {
                    model.websites = websites;
                });
            websiteService.findWebsiteById(model.userId, model.websiteId)
                .then(function(website) {
                    model.website = website.data;
                });
        }
        init();

        function updateWebsite(website) {
            websiteService.updateWebsite(model.websiteId, website);
            $location.url("/user/"+model.userId+"/website");
        }

        function deleteWebsite(websiteId) {
            websiteService.deleteWebsite(websiteId);
            $location.url("/user/"+model.userId+"/website");
        }
    }
})();