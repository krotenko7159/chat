$("input[type='text']").keypress(function(event){
	if(event.which === 13){
		//grabbing new todo text from input
		var message = $(this).val();
		if (message === ""){
			alert("Message Empty...")
		}
		else {
			$(this).val("");
		//create a new li and add to ul
		$("ul").append("<li class='mine_msg'>" + message + "</li>")
		}
	}
});