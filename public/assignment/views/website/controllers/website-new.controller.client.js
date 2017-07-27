(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController($location, $routeParams, websiteService) {
        var model = this;

        model.createWebsite = createWebsite;

        model.webite = {};

        model.userId = $routeParams.uid;

        function init() {
            model.websites = websiteService.findWebsitesByUser(model.userId)
        }
        init();

        function createWebsite(website) {
            websiteService.createWebsite(model.userId, website);
            $location.url("/user/"+model.userId+"/website");
        }
    }
})();