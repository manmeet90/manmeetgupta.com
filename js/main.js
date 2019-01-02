/* =================================
------------------------------------
	Civic - CV Resume
	Version: 1.0
 ------------------------------------ 
 ====================================*/



'use strict';


$(window).on('load', function() { 
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");

});


(function($) {

	/*------------------
		Background set
	--------------------*/
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});


	$('.review-slider').owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		items: 1,
		autoplay: true
	});



	$('.progress-bar-style').each(function() {
		var progress = $(this).data("progress");
		var prog_width = progress + '%';
		if (progress <= 100) {
			$(this).append('<div class="bar-inner" style="width:' + prog_width + '"><span>' + prog_width + '</span></div>');
		}
		else {
			$(this).append('<div class="bar-inner" style="width:100%"><span>' + prog_width + '</span></div>');
		}
	});


	$('.lan-prog').each(function() {
		var progress = $(this).data("lanprogesss");
		var ele      = '<span></span>';
		var ele_fade = '<span class="fade-ele"></span>';
		
		for (var i = 1; i <= 5; i++) {
			if(i <= progress){
				$(this).append(ele);
			} else {
				$(this).append(ele_fade);
			}
		}
	});


	/*------------------
		Popup
	--------------------*/
	$('.portfolio-item .port-pic').magnificPopup({
		type: 'image',
		mainClass: 'img-popup-warp',
		removalDelay: 500,
	});




if($().circleProgress){

	$(".prog-circle").circleProgress({
		value: 0.5,
		size: 175,
		thickness: 10,
		fill: "#fff",
		emptyFill: "rgba(0, 0, 0, 0)"
	});

	$(".prog-circle").each(function (index, elem) {
		$(elem).circleProgress({value: $(elem).attr('data-value')/100});
	});

	//Set progress circle 1
	$("#progress1").circleProgress({
		value: 0.75,
		size: 175,
		thickness: 2,
		fill: "#40424a",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
	//Set progress circle 2
	$("#progress2").circleProgress({
		value: 0.83,
		size: 175,
		thickness: 2,
		fill: "#40424a",
		emptyFill: "rgba(0, 0, 0, 0)"
	});

	//Set progress circle white
	$("#progress3").circleProgress({
		value: 0.75,
		size: 175,
		thickness: 2,
		fill: "#ffffff",
		emptyFill: "rgba(0, 0, 0, 0)"
	});

	//Set progress circle white
	$("#progress4").circleProgress({
		value: 0.83,
		size: 175,
		thickness: 2,
		fill: "#ffffff",
		emptyFill: "rgba(0, 0, 0, 0)"
	});

	//Set progress circle skyblue
	$("#progress5").circleProgress({
		value: 0.75,
		size: 175,
		thickness: 2,
		fill: "#009fff",
		emptyFill: "rgba(0, 0, 0, 0)"
	});

	//Set progress circle skyblue
	$("#progress6").circleProgress({
		value: 0.83,
		size: 175,
		thickness: 2,
		fill: "#009fff",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
}
	function clearForm(){
		$('.contact-form #from_name').val("");
		$('.contact-form #from_email').val("");
		$('.contact-form #subject').val("");
		$('.contact-form #message').val("");
	}

	$('#sendEmailBtn').on('click', function(e) {
		e.preventDefault();
		let from_name = $('.contact-form #from_name').val();
		let from_email = $('.contact-form #from_email').val();
		let subject = $('.contact-form #subject').val();
		let message = $('.contact-form #message').val();

		var template_params = {
			"reply_to": from_email,
			"subject": subject,
			"to_name": "Manmeet",
			"from_name": from_name,
			"message_html": message
		 };
		 
		 var service_id = "default_service";
		 var template_id = "template_Y0JdgjFE";
		 emailjs.send(service_id,template_id,template_params)
		 .then(function(response) {
			console.log('SUCCESS!', response.status, response.text);
			toastr.success('Message sent successfully.');
			clearForm();
		 }, function(error) {
			console.log('FAILED...', error);
		 });
	});

	$('#download_cv_btn').on('click', function(e){
		e.preventDefault();
		let storageRef = firebase.storage();
		storageRef.ref('ManmeetKumarGupta.docx').getDownloadURL().then(function(url) {
			let elem = document.createElement('a');
			elem.setAttribute('display', 'none');
			elem.setAttribute('href', url);
			elem.setAttribute('download', 'ManmeetKumarGupta.docx');
			// fix for firefox browser, as firefox don't entertain click on elements not attached to DOM.
			document.querySelector('body').appendChild(elem);
			elem.click();
			elem.remove();
		}).catch((error) => {
			console.log(error);
		});
	});

})(jQuery);

