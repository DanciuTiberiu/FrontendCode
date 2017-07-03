hrApp.service('EmployeeService', ['$http', 'CommonResourcesFactory', function ($http, CommonResourcesFactory) {
        return {
            findById: function (employeeId) {
                return $http.get(CommonResourcesFactory.findOneEmployeeUrl + employeeId)
                    .success(function (data) {
                        return data;
                    })
                    .error(function (err) {
                        return {
                            "id": 100,
                            "firstName": "Steven",
                            "lastName": "King",
                            "email": "SKING",
                            "phoneNumber": "515.123.4567",
                            "hireDate": "1987-06-17",
                            "jobId": 1,
                            "salary": 24000.00,
                            "commissionPct": null,
                            "managerId": null,
                            "departmentId": 90
                        };
                    });
            },
            findByDepartments: function () {
                return $http.get(CommonResourcesFactory.findAllDepartmentsUrl)
                    .success(function (data) {
                        return data;
                    })
                    .error(function (err) {
                        //return {
                            console.log("Error FindAllDepartments:" + err);
                        //};
                    });
            },
            findByJobs: function () {
                return $http.get(CommonResourcesFactory.findAllJobsUrl)
                    .success(function (data) {
                        return data;
                    })
                    .error(function (err) {
                        //return {
                            console.log("Error FindAllDepartments:" + err);
                    //};
                    });

            },
            findByManagers: function () {
                return $http.get(CommonResourcesFactory.findAllEmployeesUrl)
                    .success(function (data) {
                        return data;
                    })
                    .error(function (err) {
                        //return {
                        console.log("Error FindAllDepartments:" + err);
                        //};
                    });

            }
                ,checkIfCurrentEmployeeExist: function (managerId,managers) {
                var exist = false;
                managers.forEach(function(item) {
                    if (managerId == item.employeeId ) {
                        exist = true;
                    }
                });

                return exist;
            },
        }
    }]
);