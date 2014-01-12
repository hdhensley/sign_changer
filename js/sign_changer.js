
$('body').bind('pageinit', function(event)
{
	alert('JQuery Is Working');

	$('#results_button').on('tap',function()
	{
		alert('Button clicked');
		var current_message_arr = $('#current_message').val().replace(' ','').toLowerCase().split('');
		var new_message_arr     = $('#new_message').val().replace(' ','').toLowerCase().split('');
	
		var results = get_results(current_message_arr,new_message_arr);
		
		results = object_sort(results);
		
		clear_results();
		
		display(results);
	});
});

function clear_results()
{
	$("#result_row").empty();
}

function display(results)
{
	$.each(results,function(letter,amount)
	{
		$('#result_row').append(letter + " : " + amount);
		$('#result_row').append('<br />');
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