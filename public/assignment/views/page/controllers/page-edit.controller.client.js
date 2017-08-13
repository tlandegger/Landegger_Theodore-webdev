(function() {
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController)

    function pageEditController($location, $routeParams, pageService) {
        var model = this;

        model.updatePage = updatePage;
        model.deletePage = deletePage;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;

        function init() {
            model.page = pageService.findPageById(model.pageId)
                .then(function (page) {
                    model.page = page.data;
                });
        }
        init();

        function updatePage(page) {
            pageService.updatePage(model.pageId, page);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
        }

        function deletePage(pageId) {
            pageService.deletePage(pageId);
            $location.url("/user/"+model.userId+"/website/"+model.websiteId+"/page");
        }
    }
})();