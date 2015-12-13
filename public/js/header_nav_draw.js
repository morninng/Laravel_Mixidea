window.onload = header_nav_draw;


 function RegistFbGraphData(){
   FB.api(
   	"/me?fields=picture,first_name,last_name,email,timezone,link",
      function (response) {
        if (response && !response.error) {

          var currentUser = Parse.User.current();
          var external_data_pointer = currentUser.get("ext_data");

          if(external_data_pointer){
            var User_Extension = Parse.Object.extend("User_Extension");
          	var user_ext_query = new Parse.Query(User_Extension);  
          	user_ext_query.get(external_data_pointer.id, {
          		success: function(ext_data_found){
          			update_user_profile(response, currentUser, ext_data_found);
          		},
          		error: function(){
          			console.log("ext data cannot be found");
          			var User_Extension = Parse.Object.extend("User_Extension");
          			var user_ext = new User_Extension();
          			update_user_profile(response, currentUser, user_ext)
          		}
          	});
          }else{
          	var User_Extension = Parse.Object.extend("User_Extension");
          	var user_ext = new User_Extension();
          	update_user_profile(response, currentUser, user_ext)
          }

        }
      }
  );
 }

 
function update_user_profile(response, currentUser, user_ext){


	user_ext.set("email", response.email );
	user_ext.set("link", response.link );
	user_ext.set("timezone", response.timezone );
	user_ext_ACL = new Parse.ACL(currentUser);
	user_ext_ACL.setPublicReadAccess(true);
	user_ext.setACL(user_ext_ACL);

	currentUser.set("fb_id", response.id );
	currentUser.set("FirstName", response.first_name);
	currentUser.set("LastName", response.last_name);
	currentUser.set("Profile_picture", response.picture.data.url);
	currentUser.set("ext_data",user_ext)

	currentUser.save(null, {
	success: function(){
	  // var duration = 60000 * 60 * 24 * 30;
	  var duration = 60000;
	  set_cookie("recent_login", "a", duration);
	  alert("saved");
	  location.reload();
	},
	error: function(){
	  alert("fail to save");
	  window.location.href = "./home";
	}
	});

}


function click_fb_login(){
	Parse.FacebookUtils.logIn(null, {
	  success: function(user) {
	    if (!user.existed()) {
	      console.log("---------go to profile edit page---------");
	      RegistFbGraphData();
	    } else {
	      console.log("--------User loged in mixidea--------");
	      RegistFbGraphData();
	    //  construct_dom_for_logeduser();
	    }
	  },
	  error: function(user, error) {
	  	Parse.User.logOut();
	  	//remove_all_mixidea_local_data();
	  	alert("please click login button again after this page is refreshed");
    	location.reload();
	  }
	});
}

/*
function remove_all_mixidea_local_data(){

	var cookie_data = document.cookie;
	var cookie_array = cookie_data.split("; ");
	for(var i=0; i < cookie_array.length;i++){
		var c = cookie_array[i].split("=");
		var key = c[0];
		remove_cookie(key);
	}
	return;
}

function remove_cookie(key){
	var date1 = new Date();
	date1.setTime(date1.getTime() - 1000 );
	var data = key + '=dummy; expires=' + date1.toGMTString() + '; path=/';
	document.cookie = data;
}
*/

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


function logout(){

	Parse.User.logOut();
	$("#profile_pict").html("");
	$("#logout").html("");
	construct_dom_for_login();
    location.reload();
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
	$("#logout").html("<a href='javascript:void(0)' onclick='logout()'>logout</a>");

}

function header_nav_draw(){
	var currentUser = Parse.User.current();
	var recent_login =  get_value_fromCookie("recent_login")
	if (currentUser && recent_login) {
	    construct_dom_for_logeduser();
	} else {
	    construct_dom_for_login();
	}
}

var set_cookie = function(key,value, duration){
	var dt = new Date();
	dt.setTime(dt.getTime() + duration );
	document.cookie = key + '=' + value + ';  expires=' + dt.toGMTString() + '; path=/';
	return;
}


var get_value_fromCookie = function(key){

	var cookie_data = document.cookie;
	var cookie_array = cookie_data.split("; ");

	for(var i=0; i < cookie_array.length;i++){
		var c = cookie_array[i].split("=");
		if(c[0] === key){
			return c[1];
		}
	}
	return null;
}
