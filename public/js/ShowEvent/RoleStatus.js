
function Role_Status_VM(role_name, game_id, parent_gameframe){
  var self = this;

}

Role_Status_VM.prototype.initialize = function(role_name, game_id, parent_gameframe){

  var self = this;
  self.game_id = game_id;
  self.parent_gameframe = parent_gameframe;
  self.role_name_str = role_name;
  self.participant_visible = ko.observable(true);

  self.role_name = ko.observable(role_name);
  self.user_visible = ko.observable(false);
  self.pict_src = ko.observable();
  self.user_profile_belonging = ko.observable();
  self.user_profile_intro = ko.observable();
  self.participant_button = ko.observable(true);
  self.cancel_game_visible = ko.observable();
  self.join_game_visible = ko.observable();
  self.user_name = ko.observable();
  self.user_dialog = ko.observable();
  self.profile_input = ko.observable();
  self.user_declaration = ko.observable();
  self.loading_visible = ko.observable();
  self.current_user_id = null;


}

Role_Status_VM.prototype.reset_user_profile = function(){

  var self = this;

  self.user_visible(false);
  self.user_name(null);
  self.pict_src(null);
  self.user_profile_belonging(null);
  self.user_profile_intro(null);
}

Role_Status_VM.prototype.reset_button = function(){

  var self = this;

  self.cancel_game_visible(false);
  self.join_game_visible(false);
}


Role_Status_VM.prototype.Cancel_Game = function(){

  var self = this;
  self.loading_visible(true);
  self.cancel_game_visible(false);

  Parse.Cloud.run('CancelGame', { game_id: self.game_id, role: self.role_name_str},{
    success: function(game_obj) {
       game_obj;
      var debate_participant_object_array = game_obj.get("participant_role");
      var audience_array = game_obj.get("audience_participants");
       self.parent_gameframe.update_game_participant_info(debate_participant_object_array, audience_array);
       self.loading_visible(false);
    },
    error: function(error) {
      var error_JSON = JSON.parse(error.message);
      alert(error_JSON.code + ":" +  error_JSON.message);
      var game_obj = error_JSON.game_obj;

      self.parent_gameframe.update_game_participant_info(game_obj.participant_role, game_obj.audience_participants)
      self.loading_visible(false);
    }
  });




}

Role_Status_VM.prototype.Join_Game = function(){
  
  var self = this;
  var current_user = Parse.User.current();

 if(!current_user){
  alert("you need to login to join the game");
  return;
 }
 is_your_group_role = self.parent_gameframe.participant_object.is_your_group_role(self.role_name_str);

 if(!is_your_group_role){
   alert("you cannot join multiple group");
   return;
  }
  self.join_game_visible(false);
  self.loading_visible(true);


  Parse.Cloud.run('JoinGame', { game_id: self.game_id, role: self.role_name_str},{
    success: function(game_obj) {
       game_obj;
      var debate_participant_object_array = game_obj.get("participant_role");
      var audience_array = game_obj.get("audience_participants");

       self.parent_gameframe.update_game_participant_info(debate_participant_object_array, audience_array);
       self.loading_visible(false);
    },
    error: function(error) {
      var error_JSON = JSON.parse(error.message);
      alert(error_JSON.code + ":" +  error_JSON.message);
      var game_obj = error_JSON.game_obj;

      self.parent_gameframe.update_game_participant_info(game_obj.participant_role, game_obj.audience_participants)
      self.loading_visible(false);

    }
  });

}

Role_Status_VM.prototype.update_user_status = function(){

  var self = this;
  var participant_parse_id = self.parent_gameframe.participant_object.get_parse_id_from_rolename(self.role_name_str);

  self.show_button();
  if(participant_parse_id && self.current_user_id ==participant_parse_id){
    return;
  }

  self.current_user_id = participant_parse_id;
  self.reset_user_profile();

  if(participant_parse_id){

    self.user_visible(true);
    var User = Parse.Object.extend("User");
    var user_query = new Parse.Query(User);
    user_query.get(participant_parse_id, {
      success: function(user_obj) {
        profile_id = user_obj.profile_id;

        if(!profile_id){
          self.show_user_profile(user_obj, null);
          self.show_button();
          return;
        }

        var User_Intro = Parse.Object.extend("User_Intro");
        var user_query = new Parse.Query(User_Intro);
        user_query.get(profile_id, {
          success: function(profile_obj){
            self.show_user_profile(user_obj, profile_obj);
            self.show_button();
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
    self.show_user_profile( null, null);
  }
}


Role_Status_VM.prototype.show_user_profile = function(user_obj,user_profile){

  var self = this;

  if(user_obj){
    var first_name = user_obj.get("FirstName");
    var last_name = user_obj.get("LastName");
    var pict_src = user_obj.get("Profile_picture");
    self.user_name(first_name + " " + last_name);
    self.user_name(first_name + " " + last_name);
    self.pict_src(pict_src);
  }
}


Role_Status_VM.prototype.show_button = function(){

  var self = this;

  var participant_parse_id = self.parent_gameframe.participant_object.get_parse_id_from_rolename(self.role_name_str);
  var is_yourself  = self.parent_gameframe.participant_object.is_yourself_from_rolename(self.role_name_str);
  var is_different_group = self.parent_gameframe.participant_object.not_your_group_role(self.role_name_str);
  var is_yourself_have_role = self.parent_gameframe.participant_object.is_yourself_have_role();
  var is_audience_role = self.parent_gameframe.participant_object.is_audience_role(self.role_name_str);
  var is_own_group = self.parent_gameframe.participant_object.is_your_group_role(self.role_name_str);

  self.reset_button();

  if(participant_parse_id){
    if(is_yourself){
      self.cancel_game_visible(true);
    }else{
      //show nothing
    }
  }else{
    if(is_audience_role){
      if(is_yourself_have_role){
        //show nothing
      }else{
        self.join_game_visible(true);
      }
    }else{ //debater
      if(is_yourself_have_role){
        if(is_own_group){
          self.join_game_visible(true);    
        }
      }else{
        self.join_game_visible(true);
      }
    }
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