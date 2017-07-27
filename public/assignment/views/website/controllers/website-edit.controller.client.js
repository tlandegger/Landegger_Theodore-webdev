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
            model.websites = websiteService.findWebsitesByUser(model.userId)
            model.website = websiteService.findWebsiteById(model.websiteId);
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