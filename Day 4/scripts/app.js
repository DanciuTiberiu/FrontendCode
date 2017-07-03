var hrApp = angular.module("hrApp", ['ngRoute']);

hrApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/colors', {
    templateUrl: 'colors.html',
    controller: 'ColorsController'

})
    .when('/forms', {
        templateUrl: 'form.html',
        controller: 'FormsController'
});


}]);
