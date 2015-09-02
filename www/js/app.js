// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova'])

.run(function($ionicPlatform, $cordovaHealthKit) {
  $ionicPlatform.ready(function() {

    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

    $cordovaHealthKit.isAvailable().then(function(yes) {
      // HK is available
      var permissions = ['HKQuantityTypeIdentifierHeight'];
   
      $cordovaHealthKit.requestAuthorization(
          permissions, // Read permission
          permissions // Write permission
      ).then(function(success) {
          // store that you have permissions
      }, function(err) {
          // handle error
      });
   
      }, function(no) {
      // No HK available
      }
    );
  });
})

.controller('AppCtrl', function($scope, $cordovaHealthKit) {
    $scope.body = {
      height: ''
    };
 
    $scope.saveHeight = function() {
        $cordovaHealthKit.saveHeight($scope.body.height, 'cm').then(function(v) {
        }, function(err) {
          alert(err);
          console.log('clicked saveheight')
        });
    };
 
    $scope.getHeight = function() {
        $cordovaHealthKit.readHeight('cm').then(function(v) {
            alert('Your height: ' + v.value + " " + v.unit);
        }, function(err) {
            alert(err);
        });
    };

    $scope.saveWorkout = function() {
      $cordovaHealthKit.saveWorkout(
          {
              'activityType': 'HKWorkoutActivityTypeCycling',
              'quantityType': 'HKQuantityTypeIdentifierDistanceCycling',
              'startDate': new Date(), // now
              'endDate': null, // not needed when using duration
              'duration': 6000, //in seconds
              'energy': 400, //
              'energyUnit': 'kcal', // J|cal|kcal
              'distance': 5, // optional
              'distanceUnit': 'km'
          }
      ).then(function(v) {
          alert(JSON.stringify(v));
      }, function(err) {
          console.log(err);
      });
    };
 
    $scope.getWorkouts = function() {
        $cordovaHealthKit.findWorkouts().then(function(v) {
            alert(JSON.stringify(v));
        }, function(err) {
            console.log(err);
        });
    };
});
