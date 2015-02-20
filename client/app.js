angular.module('app', []).
    controller('AppController', function ($scope) {

        console.log("Controller instantiated.");

        var host = window.location.hostname;
        var socket = io(host + ":" + 3042);
        $scope.sendASIN = function (asin) {
            socket.emit('asin', { asin: asin });
        }

        socket.on('connect', function () {
            $scope.sendASIN('HELLO!');
        });
    })
;

