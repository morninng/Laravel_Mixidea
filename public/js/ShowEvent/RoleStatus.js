
function Role_Status_VM(role_name){
  var self = this;

  self.myMessage_temp = ko.observable("aaa");

//  self.participant_visible = ko.observable(false);
/*
  self.role_name = ko.observable();
  self.user_visible = ko.observable(false);
  self.pict_src = ko.observable();
  self.user_profile_belonging = ko.observable();
  self.user_profile_intro = ko.observable();
  self.participant_button = ko.observable(false);
  self.cancel_game = ko.observable();
  self.join_game = ko.observable();
  self.user_name = ko.observable();
  self.user_dialog = ko.observable();
  self.profile_input = ko.observable();
  self.user_declaration = ko.observable();
  self.loading_visible = ko.observable();
  */
}


Role_Status_VM.prototype.update_user_status = function(){
  
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