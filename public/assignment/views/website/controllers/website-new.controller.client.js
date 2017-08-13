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
            websiteService.findWebsitesByUser(model.userId)
                .then(function(websites) {
                    model.websites = websites;
                });
        }
        init();

        function createWebsite(website) {
            websiteService.createWebsite(model.userId, website);
            $location.url("/user/"+model.userId+"/website");
        }
    }
})();