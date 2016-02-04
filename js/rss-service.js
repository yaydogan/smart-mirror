(function() {
    'use strict';

    function RssService($http) {
        var service = {};

        //Returns the YouTube search results for the given query
        service.getFeeds = function(query) {
            var deferred = $q.defer();
            var results = [];
            angular.forEach(RSS_FEEDS, function(url){
                $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=50&callback=JSON_CALLBACK&q=' + encodeURIComponent(url)).then(function(feed){
                    results.push(feed);
                });
            }).then(function(){
                deferred.resolve(results);
            });
            return deferred.promise;
        }        
        return service;
    }

    angular.module('SmartMirror')
        .factory('RssService', RssService);

}());
