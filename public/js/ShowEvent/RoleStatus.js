
function Role_Status_VM(role_name, game_id, parent_gameframe){
  var self = this;

}

Role_Status_VM.prototype.initialize = function(role_name, game_id, parent_gameframe){

  var self = this;
  self.game_id = game_id;
  self.parent_gameframe = parent_gameframe;

  self.participant_visible = ko.observable(true);

  self.role_name = ko.observable(role_name);
  self.user_visible = ko.observable(true);
  self.pict_src = ko.observable();
  self.user_profile_belonging = ko.observable();
  self.user_profile_intro = ko.observable();
  self.participant_button = ko.observable(true);
  self.cancel_game = ko.observable();
  self.join_game = ko.observable();
  self.user_name = ko.observable();
  self.user_dialog = ko.observable();
  self.profile_input = ko.observable();
  self.user_declaration = ko.observable();
  self.loading_visible = ko.observable();


}









Role_Status_VM.prototype.Cancel_Game = function(){
  
}

Role_Status_VM.prototype.Join_Game = function(){
  
}

Role_Status_VM.prototype.update_user_status = function(){

  var self = this;
  var role_name = self.role_name();
  var participant_parse_id = self.parent_gameframe.participant_object.get_parse_id_from_rolename(role_name);

  if(participant_parse_id){

    var User = Parse.Object.extend("User");
    var user_query = new Parse.Query(User);
    user_query.get(participant_parse_id, {
      success: function(user_obj) {
        profile_id = user_obj.profile_id;

        if(!profile_id){
          self.show_role_status(user_obj, null);
        }

        var User_Intro = Parse.Object.extend("User_Intro");
        var user_query = new Parse.Query(User_Intro);
        user_query.get(profile_id, {
          success: function(profile_obj){
            self.show_role_status(user_obj, profile_obj);
          },
          error: function(obj,error){
            console.log("error to retrieve profile info");
          }
        });
      },
      error: function(object, error) {
        // The object was not retrieved successfully.
        // error is a Parse.Error with an error code and message.
      }
    });

  }else{
    self.show_role_status( null, null);
  }
}



Role_Status_VM.prototype.show_role_status = function(user_obj,user_profile){

  var self = this;
  if(user_obj){
    var first_name = user_obj.get("FirstName");
    var last_name = user_obj.get("LastName");
    self.user_name(first_name + " " + last_name);
  }

}

/*
Role_Status_VM.prototype.handleEvents = function(){

    var self = this;
    var game_container_element = $("#game_container_" + self.game_id);
    game_container_element.on("click", ".participate_button", function(e){
      self.JoinGame(e);
    });
    game_container_element.on("click", ".cancel_button", function(e){
      self.CancelGame(e);
    });
    game_container_element.on("click", ".participate_audience_button", function(e){
      self.JoinGame_Audience(e);
    });
    game_container_element.on("click", ".cancel_audience_button", function(e){
      self.CancelGame_Audience(e);
    });

};



Role_Status_VM.prototype.show_loading_icon = function(role_name_str){

  var self = this;
  var participant_container = $("#game_container_" + self.game_id).find("." + self.container_object[role_name_str]);
  participant_container.html("<div class='loader'>Loading...</div>");

}


Role_Status_VM.prototype.append_currentuser_audience = function(){

  var self = this;
  var user_first_name = "";
  var user_last_name = "";
  var user_picture_src = "";

  if(self.current_user){
    user_first_name = self.current_user.get("FirstName");
    user_last_name = self.current_user.get("LastName");
    user_picture_src = self.current_user.get("Profile_picture");
  }

  var data = { 
    role_name: null, 
    first_name: user_first_name, 
    last_name: user_last_name, 
    picture_src: user_picture_src, 
  };

  var CurrentUserApplied_html_Template = _.template($('[data-template="CurrentUserApplied_Audience_Template"]').html());
  var CurrentUserApplied_html_text = CurrentUserApplied_html_Template( {usr_info:data} );
  var audience_list = $("#game_container_" + self.game_id).find(".audience_table");
  audience_list.append(CurrentUserApplied_html_text);

}




Role_Status_VM.prototype.fill_debater_container_currentuser_applied = function(role_name_str){

  var user_first_name = "";
  var user_last_name = "";
  var user_picture_src = "";

  if(self.current_user){
    user_first_name = self.current_user.get("FirstName");
    user_last_name = self.current_user.get("LastName");
    user_picture_src = self.current_user.get("Profile_picture");
  }

  var data = { 
    role_name: role_name_str, 
    first_name: user_first_name, 
    last_name: user_last_name, 
    picture_src: user_picture_src, 
  };

  var CurrentUserApplied_html_Template = _.template($('[data-template="CurrentUserApplied_Template"]').html());
  var CurrentUserApplied_html_text = CurrentUserApplied_html_Template( {usr_info:data} );
  var participant_container = $("#game_container_" + this.game_id).find("." + self.container_object[role_name_str]);
  participant_container.html(CurrentUserApplied_html_text);

};



Role_Status_VM.prototype.fill_container_someone_applied = function(role_name_str){

  var self=this;
  var user_id = self.participant_user[role_name_str];
  console.log(user_id);

  var User = Parse.Object.extend("User");
  var user_query = new Parse.Query(User);
  user_query.get(user_id, {
    success: function(user_obj){
      var data = { 
        role_name: role_name_str, 
        first_name: user_obj.get("FirstName"), 
        last_name: user_obj.get("LastName"), 
        picture_src: user_obj.get("Profile_picture"), 
      };
      var ParticipantApplied_html_Template = _.template($('[data-template="Other_ParticipantApplied_Template"]').html());
      var ParticipantApplied_html_text = ParticipantApplied_html_Template( {usr_info:data} );
      var participant_container = $("#game_container_" + self.game_id).find("." + self.container_object[role_name_str]);
      participant_container.html(ParticipantApplied_html_text);
    },
    error: function(obj,error){
      console.log(error);
    }
  });
  console.log("someone applied")
};



Role_Status_VM.prototype.fill_container_NoApplicant = function(role_name_str){

    var self = this;
    var data = { role_name: role_name_str };

    NoApplicant_html_Template = _.template($('[data-template="NoApplicant_Template"]').html());
    var NoApplicant_html_text = NoApplicant_html_Template(data);
    var participant_container = $("#game_container_" + self.game_id).find("." + self.container_object[role_name_str]);
    participant_container.html(NoApplicant_html_text);

};


*/