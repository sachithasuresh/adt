function change_content(){
	console.log(document.getElementById("bdy").innerHTML);
	document.getElementById("bdy").innerHTML='<section class="sec1 shadow-left-right" data-aos="flip-left" duration="4000">'+
	'</section>'+
	'<section class="info" data-aos="fade-in" data-aos-duration="5000" data-aos-anchor-placement="center-bottom">'+
		'<h1>"Road sense is the offspring of courtesy and the parent of safety"</h1>'+
	'</section>'+
	'<section class="sec2 shadow-left-right" data-aos="fade-in" data-aos-anchor-placement="top-bottom" data-aos-duration="2000">'+
	'</section>'+
	'<section class="info" data-aos="fade-out" data-aos-duration="4000" data-aos-anchor-placement="center-bottom">'+
		'<h1>"Anyone Driving Slower Than You Is An Idiot, And Anyone Going Faster Than You Is A Maniac."</h1>'+
	'</section>'+
	'<section class="sec3 shadow-left-right" data-aos="fade-in" data-aos-anchor-placement="top-bottom" data-aos-duration="2000">'+
	'</section>'+
	'<section class="info" data-aos="fade-in" data-aos-duration="4000" data-aos-anchor-placement="center-bottom">'+
		'<h1>"Speed Has 5 Letters So Has Death.... Slow Has 4 Letters So Has Life."</h1>'+
	'</section>'+
	'<section class="sec4 shadow-left-right"  >'+
		'<div class="div-button"  data-aos="fade-up" data-aos-anchor-placement="top-bottom" data-aos-duration="1000">'+
			'<a class="button" href="/login" >'+
        		'<span>GO TO MAIN PAGE</span>'+
    		'</a>'+
		'</div>	'+
	'</section>';
}



setTimeout(change_content,3600);