App.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/main');
    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('main', {
            url: '/main',
            controller: "MainPageController",
            templateUrl: 'views/main.html'
        });

});
