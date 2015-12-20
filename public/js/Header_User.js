function Header_User(){
}

Header_User.prototype.handleEvent = function(){

}

Header_User.prototype.initialize = function(){
	var self = this;
	self.handleEvent();

	currentUser = Parse.User.current();
//	var recent_login =  self.get_value_fromCookie("recent_login")
//	if (currentUser && recent_login) {
	if (currentUser) {
	  self.construct_dom_for_logeduser();
	} else {
	  Parse.User.logOut();
	  self.construct_login_dom();
	}

}
/*
Header_User.prototype.get_value_fromCookie = function(key){

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
*/

Header_User.prototype.construct_login_dom = function(){
	var self = this;

	$("#nav_profile_pict").html("");
	$("#nav_logout").html("");
	var login_html = "<input class='btn btn-success' type=button onclick='header_obj.goto_login_page()' value='login' >"
	var dom_login = $("#nav_login");
	dom_login.html(login_html);
}


Header_User.prototype.goto_login_page = function(){
	var self = this;
	window.location.href = "/register.html";
}




Header_User.prototype.construct_dom_for_logeduser = function(){
	var self = this;
	console.log("-----loged user --------");

	var currentUser = Parse.User.current();
	var first_name = currentUser.get("FirstName");
	var last_name = currentUser.get("LastName");
	var link = currentUser.get("link");
	var profile_picture_src = currentUser.get("Profile_picture");

	$("#nav_login").html("");
	$("#nav_profile_pict").html("<img src=" + profile_picture_src + ">");
	$("#nav_logout").html("<a href='javascript:void(0)' onclick='header_obj.logout()'>logout</a>");
	self.validate_user(currentUser);

}

Header_User.prototype.validate_user = function(currentUser){
	var self = this;

	currentUser.fetch({
		success: function(obj){
			console.log("user object match server data");
			var img_src = currentUser.get("Profile_picture");
			if(img_src){
				var img = new Image();
				img.src = img_src;
				img.onerror = function() {
					console.log("image url is not proper");
					self.update_user_facebookdata();
				}
			}else{
				console.log("image url do not exist");
				self.update_user_facebookdata();
			}
		},
		error: function(obj, error){
			Parse.User.logOut();
	  	self.construct_login_dom();
		}
	});

}

Header_User.prototype.update_user_facebookdata = function(){

	Parse.Cloud.run('update_user_data', {user_id:currentUser.id}, {
	  success: function(obj) {
	    console.log("updating data succeed");
	  },
	  error: function(error) {
	    console.log("updating data failes");
	  }
	});
}


Header_User.prototype.logout = function(){
	var self = this;
	Parse.User.logOut();

  location.reload();
}


