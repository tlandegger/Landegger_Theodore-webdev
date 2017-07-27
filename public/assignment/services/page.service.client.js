(function () {
    angular
        .module("WebAppMaker")
        .factory("pageService", pageService);

    function pageService() {
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
            page._id = (new Date()).getTime() + "";
            page.websiteId = websiteId;
            pages.push(page);
            return page;
        }

        // Searches for page, returns null if not found
        function findPagesByWebsiteId(websiteId) {
            var ps = [];
            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    ps.push(pages[p]);
                }
            }
            return ps;
        }

        // Searches for page, returns null if not found
        function findPageById(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    return pages[p];
                }
            }
            return null;
        }


        // updates userId to new user
        function updatePage(pageId, page) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    pages[p] = page;
                    return;
                }
            }
            return null;
        }

        // Deletes user
        function deletePage(pageId) {
            for (var p in pages) {
                if (pages[p]._id === pageId) {
                    var tempPage = pages[p];
                    pages.splice(p, 1);
                    return tempPage;
                }
            }
            return null;
        }
    }


})();