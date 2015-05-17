window.onload = show_profile;


function show_profile(){
	var currentUser = Parse.User.current();
	var first_name = currentUser.get("FirstName");
	var last_name = currentUser.get("LastName");
	var link = currentUser.get("link");
	var profile_picture_src = currentUser.get("Profile_picture");
	console.log(first_name);
	console.log(last_name);
	console.log(link);
	console.log(profile_picture_src);


	$("#profile_picture").html("<img src=" + profile_picture_src + ">");
	$("#profile_first_name").html("    " + first_name);
	$("#profile_last_name").html("    " + last_name);
	$("#profile_link").html("    " + link);

}
