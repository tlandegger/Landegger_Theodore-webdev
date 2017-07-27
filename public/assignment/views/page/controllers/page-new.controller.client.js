(function() {
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController)

    function pageNewController($location, $routeParams, pageService) {

        var model = this;

        model.createPage = createPage;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.page = {}

        function init() {

        }
        init();

        function createPage(page) {
            pageService.createPage(model.websiteId, page);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
        }



    }
})();