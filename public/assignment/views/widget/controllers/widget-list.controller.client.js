(function() {
    angular
        .module("WebAppMaker")
        .controller("widgetListController", widgetListController)

    function widgetListController($routeParams, widgetService) {
        var model = this;

        model.userId = $routeParams.uid;
        model.websiteId = $routeParams.wid;
        model.pageId = $routeParams.pid;

        function init() {
            model.widgets = widgetService.findWidgetsByPageId(model.pageId);
            console.log(model.widgets);
        }
        init();


    }
})();