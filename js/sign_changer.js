$(document).on("pageinit","#pageone",function()
{
	$('#show-results-button').bind('click', function(event) 
	{
		var current_message = $('#current-message').val();
		var new_message     = $('#new-message').val();
		show_results(current_message,new_message);
	});
});

function show_results(current_message,new_message)
{
	clear_results();
	var results = get_results(current_message,new_message);
	results = object_sort(results);
	display(results);
}

function clear_results()
{
	$("#count-list").empty();
}

function createrow(letter,count){
	return 	'<li class="ui-li ui-li-static ui-btn-up-c ui-li-has-count ui-corner-top"><span class="letter">' + letter + 
			' <span class="counter ui-li-count ui-btn-up-c ui-btn-corner-all">' + count + '</span></li>';
}

function display(results)
{
	$.each(results,function(letter,amount)
	{
		$('#count-list').append(createrow(letter,amount));
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