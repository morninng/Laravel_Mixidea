window.onload = header_nav_draw;


 function RegistFbGraphData(){
   FB.api(
   //   "/me?fields=picture,first_name,last_name,middle_name,timezone,gender,languages,link,religion,work,birthday,relationship_status,political,address,id,about,currency,devices,email,age_range,education",
   	"/me?fields=picture,first_name,last_name, email",
      function (response) {
        if (response && !response.error) {

          console.log(response);
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

	// user_ext.set("timezone", response.timezone);
	// user_ext.set("gender", response.gender);
	// user_ext.set("languages", response.languages);
	// user_ext.set("link", response.link);
	// user_ext.set("religion", response.religion);

	//  user_ext.set("work", response.work );  think how list can be saved
	// user_ext.set("birthday", response.birthday );
	// user_ext.set("relationship_status", response.relationship_status );
	// user_ext.set("political", response.political );
	// if(response.address){
	//   user_ext.set("address", response.address.country );
	// }
	// user_ext.set("about", response.about );
	user_ext.set("email", response.email );
	// user_ext.set("age_range", response.age_range );
	//   user_ext.set("education", response.education );  think how list can be saved
	user_ext_ACL = new Parse.ACL(currentUser)
	user_ext_ACL.setPublicReadAccess(true);
	user_ext.setACL(user_ext_ACL);

	currentUser.set("fb_id", response.id );
	currentUser.set("FirstName", response.first_name);
	currentUser.set("LastName", response.last_name);
//	currentUser.set("MiddleName", response.middle_name);
	currentUser.set("Profile_picture", response.picture.data.url);
	currentUser.set("ext_data",user_ext)

	currentUser.save(null, {
	success: function(){
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
	if (currentUser) {
	    construct_dom_for_logeduser();
	} else {
	    construct_dom_for_login();
	}
}
