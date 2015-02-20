angular.module('app', []).
    controller('AppController', function ($scope) {
        var host = window.location.hostname;
        var socket = io(host + ":" + 3042);

        $scope.sendASIN = function () {
            if ( ! $scope.asin ) return;
            socket.emit('asin', { asin: $scope.asin });
        }

        socket.on('connect', function () {
            $scope.sendASIN('HELLO!');
        });

        $scope.items = [];

        console.log("AppController()");
    })
;

