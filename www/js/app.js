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

  // var stepsCount = HKQuantityType.quantityTypeForIdentifier(HKQuantityTypeIdentifierStepCount)
  // var sumOption = HKStatisticsOptions.CumulativeSum
  $scope.getStepCount = function() {
    $cordovaHealthKit.querySampleType(
        {
            "startDate" : new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
            "endDate"   : new Date(),
            "sampleType": "HKQuantityTypeIdentifierStepCount",
            "unit"      : "count"
        }
        
    ).then(function(v) {
      // var cumulativeSum = v.reduce(function(sum, quantity){
      //   return sum + v.quantity
      // }, 0)


      var cumulativeSum = 0
      for (var i = 0; i < v.length; i++) {
        cumulativeSum = cumulativeSum + v[i]["quantity"]
      };  
      alert("You walked " + cumulativeSum + " steps in the last 24 hours."); 


    }, function(err) {
        console.log(err);
    });
  };
});

