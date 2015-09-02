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
      var readable = ['HKQuantityTypeIdentifierStepCount',
                      'HKQuantityTypeIdentifierDistanceWalkingRunning', 
                      'HKQuantityTypeIdentifierFlightsClimbed'];
      var writable = []
   
      $cordovaHealthKit.requestAuthorization(
          readable, // Read permission
          writable // Write permission
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

  var stepsCount = HKQuantityType.quantityTypeForIdentifier(HKQuantityTypeIdentifierStepCount)
  var sumOption = HKStatisticsOptions.CumulativeSum
    $scope.getStepCount = function() {
      $cordovaHealthKit.querySampleType(
          {
              "startDate" : new Date(new Date().getTime() - 2*24*60*60*1000),
              "endDate"   : new Date(),
              "sampleType": "HKQuantityTypeIdentifierStepCount",
              "unit"      : "count"
          }
          
      ).then(function(v) {
          alert(JSON.stringify(v));
      }, function(err) {
          console.log(err);
      });
    };
 
    $scope.getTotalSteps = function() {
      $cordovaHealthKit.HKStatisticsQuery(quantityType: stepsCount, quantitySamplePredicate: nil,
    options: sumOption)


    }
});
