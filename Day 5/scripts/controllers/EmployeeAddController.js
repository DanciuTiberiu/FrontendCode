hrApp.controller('EmployeeAddController', ['$scope', '$http', '$location', 'CommonResourcesFactory', 'EmployeeService', '$routeParams',
    function($scope, $http, $location, CommonResourcesFactory, EmployeeService, $routeParams) {

        $scope.employee = {};
        $scope.requiredErrorMessage = "Please fill out this form!";
        $scope.patternDateNotRespectedMessage = "The date format should be yyyy-mm-dd";
        $scope.patternCommisionNotRespectedMessage = "Commission should be in the format 0.XX";

        //TODO #HR1

        $scope.jobs =[];
        $scope.department = [];
        $scope.managers = [];
        $scope.verificare = false;

        /**
         * Reset form
         */
        $scope.reset = function () {
            this.employee = {};
        };

        /**
         * Persist an employee
         * @param addEmployee - employee to be persisted
         */


        EmployeeService.findByDepartments()
            .then(function (res) {
                $scope.department = res.data;
            }, function (err) {
                console.log("Error at Departments: " + err);
            });

        EmployeeService.findByJobs()
            .then(function (res) {
                $scope.jobs = res.data;
            }, function (err) {
                console.log("Error at Jobs: " + err);
            });
        EmployeeService.findByManagers()
            .then(function (res) {
                //$scope.managers = res.data;

                res.data.forEach(function(item) {
                   // for (x in $scope.managers){
                        if (item.managerId != null && EmployeeService.checkIfCurrentEmployeeExist(item.managerId.employeeId,$scope.managers) == false) {
                            $scope.managers.push(item.managerId);
                        }

                    //}
                });

            }, function (err) {
                console.log("Error at Managers: " + err);
            });

        $scope.create = function (addEmployee) {
            $http({url: CommonResourcesFactory.addEmployeeUrl, method: 'POST', data: addEmployee})
                .success(function (data) {
                    $scope.employee = data;
                    $location.url('/employeeView/' + $scope.employee.employeeId);
                });
        };

        $scope.delete = function (deleteEmployee) {
            $http({url: CommonResourcesFactory.deleteEmployeeUrl, method: 'PUT', data: deleteEmployee})
                .success(function (data) {
                    $scope.employee = data;
                    $location.url('/employeeList/');
                });
        };

        $scope.datePattern = /^\d{4}-\d{2}-\d{2}$/;
        $scope.commissionPattern = /^[0]\.\d{1}(\d)?$/;
}]);