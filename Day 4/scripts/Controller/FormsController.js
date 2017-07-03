/**
 * Created by Tiberiu.Danciu on 6/30/2017.
 */

hrApp.controller('FormsController', ['$scope', function($scope) {
    $scope.submit = function () {
        $scope.valid =  $scope.myForm.$valid;
    }
}]);
