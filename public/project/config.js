(function() {
    angular
        .module("Project")
        .config(Config);
    function Config($routeProvider, $httpProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "views/user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/profile/:uid", {
                templateUrl: "views/user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            }) 
            .when("/user/:uid/tournament", {
                templateUrl: "views/tournament/templates/tournament-list.view.client.html",
                controller: "tournamentListController",
                controllerAs: "model"
            })
            .when("/user/:uid/tournament/new", {
                templateUrl: "views/tournament/templates/tournament-new.view.client.html",
                controller: "tournamentNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/tournament/:tid", {
                templateUrl: "views/tournament/templates/tournament-edit.view.client.html",
                controller: "tournamentEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/tournament/:tid/match", {
                templateUrl: "views/match/templates/match-list.view.client.html",
                controller: "matchListController",
                controllerAs: "model"
            })
            .when("/user/:uid/tournament/:tid/match/:mid", {
                templateUrl: "views/match/templates/match-edit.view.client.html",
                controller: "matchEditController",
                controllerAs: "model"
            })
    }
})();