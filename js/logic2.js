// just for page animations

$(document).ready(function(){
	
	//Check to see if the window is top if not then display button
	$(window).scroll(function(){
		if ($(this).scrollTop() > 100) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});
	
	//Click event to scroll to top
	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},400);
		return false;
	});
	

	// on "Search" click, smooth scroll to view 2
	$("#submit-btn").click(function() {
	    $('html, body').animate({
	        scrollTop: $(".view-2").offset().top
	    }, 500);
	});
});