App.factory('appDataService', [
    '$http', '$q', '$log', function($http, $q, $log) {
        return function() {
            var d = $q.defer();
            $http({
                method: "get",
                url: constants.APP_DATA_API_URL
            }).then(function(data) {
                d.resolve(data.data);
            }, function(err) {
                $log.error("Error: ", err.headers);
                d.reject(err.headers);
            });

            return d.promise;
        };
    }
]);
