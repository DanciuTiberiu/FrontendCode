hrApp.controller('EmployeeEditController', ['$scope', '$http', '$routeParams', '$location', 'CommonResourcesFactory', 'EmployeeService',
    function ($scope, $http, $routeParams, $location, CommonResourcesFactory, EmployeeService) {
        $scope.requiredErrorMessage = "Please fill out this form!";
        $scope.patternDateNotRespectedMessage = "The date format should be yyyy-mm-dd";
        $scope.patternCommisionNotRespectedMessage = "Commission should be in the format 0.XX";

        //TODO #HR5

        $scope.employee = [];
        $scope.jobs =[];
        $scope.department = [];
        $scope.managers = [];

        /**
         * Reset form
         */
        $scope.reset = function () {
            $scope.employee = {};
        };

        /**
         * Persist an employee
         * @param addEmployee - employee to be persisted
         */
        $scope.create = function (addEmployee) {
            $http({url: CommonResourcesFactory.editEmployeeUrl, method: 'PUT', data: addEmployee})
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

        EmployeeService.findById($routeParams.employeeId)
            .then(function (res) {
                $scope.employee = res.data;
            }, function (err) {
                console.log("Error at employees/findOne: " + err);
            });



        $scope.datePattern = /^\d{4}-\d{2}-\d{2}$/;
        $scope.commissionPattern =  /^[0]\.\d{1}(\d)?$/;

    }]);