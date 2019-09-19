//CONTROLLER
angular.module('app', [])
.controller("MainController", function($scope) { //name controller and define the scope
  $scope.filterIt = "Type your own message here"; //create a default input
  $scope.delimiter = "#"; //create a default input
})


//create a filter function called tokenizer
.filter("tokenizer", function() {
  return function(value, delimiter) { //take the value and the delimiter as arguments
    if(angular.isString(value)){
      if(delimiter) { //if user inputs a custom delimiter
        return value.split("").join(delimiter); //join the string with the custom delimiter
      }
      else { //otherwise
        return value.split("").join(","); //by default the filter produces a comma separated string
      }
    }
    else {
      return value;
    }
  }
})
