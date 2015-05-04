window.onload = header_nav_draw;

function click_fb_login(){
	Parse.FacebookUtils.logIn(null, {
	  success: function(user) {
	    if (!user.existed()) {
	      console.log("---------go to profile edit page---------");
	    } else {
	      console.log("--------User loged in mixidea--------");
	      construct_dom_for_logeduser();
	    }
	  },
	  error: function(user, error) {
	  	construct_dom_for_login();
	    console.log("--------user do not loged in either mixidea and facebook--------");
	  }
	});
}

function construct_dom_for_login(){
		var dom_div = $('<div>');
		var dom_a_facebook = $('<a>');
		dom_a_facebook.attr({href:"javascript:void(0)" , onclick:"click_fb_login()"});
		//var facebook_login_form = "<fb:login-button scope='public_profile,email' onlogin='click_fb_login;'></fb:login-button>"
		//dom_div.html(facebook_login_form);
		var dom_img_fb_logo = $('<img>');
		dom_img_fb_logo.attr({src:"/img/fb_logo.jpg"});

		dom_a_facebook.append(dom_img_fb_logo);
		dom_div.append(dom_a_facebook);
		var dom_login = $("#login");
		dom_login.html(dom_div);
}


function construct_dom_for_logeduser(){
	console.log("-----loged user --------")
}

function header_nav_draw(){
	var currentUser = Parse.User.current();
	if (currentUser) {
	    construct_dom_for_logeduser();
	} else {
	    construct_dom_for_login();
	}
}
