$(function(){
	$('.message-field').keyup(function(){
		var current_message_arr = $('#current_message').val().replace(' ','').toUpperCase().split('');
		var new_message_arr     = $('#new_message').val().replace(' ','').toUpperCase().split('');
		
		show_results(current_message_arr,new_message_arr);
	})
})

function show_results(current_message,new_message)
{
	clear_results();
	var results = get_results(current_message,new_message);
	results = object_sort(results);
	display(results);
}

function clear_results()
{
	$(".results-list").empty();
}

function display(results)
{
	$.each(results,function(letter,amount)
	{
		if( letter != ' ' ){
			if( amount > 0 ){
				$('#letters-needed').append('<li>' + letter + ' : ' + amount + '</li>');
			} else {
				$('#letters-unused').append('<li>' + letter + ' : ' + (amount * -1) + '</li>');
			}
		}
	})
}

function object_sort(object)
{
	keys = []
	for (k in object)
	{
	    if (object.hasOwnProperty(k))
	    {
	        keys.push(k);
	    }
	}

	keys.sort();
	
	var results = {}
	
	$.each(keys,function(key,val)
	{
		results[val] = object[val];
	})
	
	return results;
}

function get_results(current_message_array,new_message_array)
{
	var results = {}
	
	$.each(new_message_array,function(key,val)
	{
		if( results.hasOwnProperty(val) ){
			results[val] += 1
		} else {
			results[val] = 1;
		}
	})
	
	$.each(current_message_array,function(key,val)
	{
		if( results.hasOwnProperty(val) ){
			results[val] -= 1;
		} else {
			results[val] = -1
		}
	})
	
	return results;
}