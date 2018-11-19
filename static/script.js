$(document).ready(() => {
	$('.icons').hover(
       function(){ $(this).addClass('fa-spin') },
       function(){ $(this).removeClass('fa-spin') }
	);
})