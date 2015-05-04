window.onload = header_nav_draw;


 function RegistFbGraphData(){
   FB.api(
      "/me?fields=picture,first_name,last_name,timezone,gender,languages,link,religion",
      function (response) {
        if (response && !response.error) {
          /* handle the result */

          var currentUser = Parse.User.current();

          console.log(response);
          currentUser.set("FirstName", response.first_name);
          currentUser.set("LastName", response.last_name);
          currentUser.set("timezone", response.timezone);
          currentUser.set("languages", response.languages);
          currentUser.set("link", response.link);
          currentUser.set("religion", response.religion);
          currentUser.set("Profile_picture", response.picture.data.url);
          currentUser.save(null, {
            success: function(){
              alert("saved");
              window.location.href = "./user/edit_profile";
            },
            error: function(){
              alert("fail to save");
              window.location.href = "./home";
            }
          });
        }
      }
  );
 }





function click_fb_login(){
	Parse.FacebookUtils.logIn(null, {
	  success: function(user) {
	    if (!user.existed()) {
	      console.log("---------go to profile edit page---------");
	      RegistFbGraphData();
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
	console.log("-----loged user --------");

	var currentUser = Parse.User.current();
	var first_name = currentUser.get("FirstName");
	var last_name = currentUser.get("LastName");
	var link = currentUser.get("link");
	var profile_picture_src = currentUser.get("Profile_picture");


	$("#login").html("");
	$("#profile_pict").html("<img src=" + profile_picture_src + ">");
	$("#login").html("");





}

function header_nav_draw(){
	var currentUser = Parse.User.current();
	if (currentUser) {
	    construct_dom_for_logeduser();
	} else {
	    construct_dom_for_login();
	}
}
