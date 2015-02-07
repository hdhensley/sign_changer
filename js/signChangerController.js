var app = angular.module('signChangerApp',[]);

app.controller('signChangerController',function($scope){
		
	$scope.currentMessage = "";
	$scope.newMessage = "";
	$scope.lettersNeeded = [];
	$scope.lettersRemaining = [];

	$scope.update = function(){
		$scope.lettersNeeded = [];
		$scope.lettersRemaining = [];

		current_message_array = $scope.currentMessage.replace(/\s+/g,'').toUpperCase().split('');
		new_message_array     = $scope.newMessage.replace(/\s+/g,'').toUpperCase().split('')

		var results = object_sort( get_results( current_message_array,new_message_array ) );
		
		angular.forEach(results,function(amount,letter){

			if( letter != ' ' && amount > 0 ){
				$scope.lettersNeeded.push({'letter':letter,'amount':amount});
			} else {
				$scope.lettersRemaining.push({'letter':letter,'amount':amount});
			}

		})
	}
});

function object_sort(object)
{
	keys = []
	for (k in object){
	    if (object.hasOwnProperty(k)){
	        keys.push(k);
	    }
	}

	keys.sort();

	console.log(keys);
	
	var results = {}
	
	angular.forEach(keys,function(val,key){
		results[val] = object[val];
	})

	console.log(results);
	
	return results;
}

function get_results(current_message_array,new_message_array){
	var results = {}
	
	angular.forEach(new_message_array,function(key,val){
		if( results.hasOwnProperty(key) ){
			results[key] += 1
		} else {
			results[key] = 1;
		}
	})
	
	angular.forEach(current_message_array,function(key,val){
		if( results.hasOwnProperty(key) ){
			results[key] -= 1;
		} else {
			results[key] = -1
		}
	})
	
	return results;
}