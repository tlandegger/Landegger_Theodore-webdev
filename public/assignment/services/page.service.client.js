(function () {
    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);

    function pageService($http) {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ]

        var api = {
            "createPage" : createPage,
            "findPagesByWebsiteId" : findPagesByWebsiteId,
            "findPageById" : findPageById,
            "updatePage" : updatePage,
            "deletePage" : deletePage
        };

        return api;

        // adds a page to the pages array
        function createPage(websiteId, page) {
            var url = "/api/website/" + websiteId +"/page";
            return $http.post(url, page);
        }

        // Searches for page, returns null if not found
        function findPagesByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId +"/page";
            return $http.get(url).
                then(function (response) {
                    return response.data;
            });
        }

        // Searches for page, returns null if not found
        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
        }


        // updates userId to new user
        function updatePage(pageId, page) {
            var url = "/api/page/" + pageId;
            return $http.put(url, page);
        }

        // Deletes user
        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }


})();