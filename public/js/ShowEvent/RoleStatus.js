
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
  self.user_profile_intro = ko.observable();
  self.participant_button_visible = ko.observable(true);
  self.cancel_game_visible = ko.observable();
  self.join_game_visible = ko.observable();
  self.user_name = ko.observable();
  self.user_dialog_visible = ko.observable();
  self.loading_visible = ko.observable();
  self.current_user_id = null;
/*
  self.use_pc = ko.observable(true);
  self.join_on_time = ko.observable(true);
  self.share_experience = ko.observable(true);
  self.use_chrome = ko.observable(true);
  */
  self.declaration_check = ko.observableArray();

  self.user_nationality = ko.observable();
  self.profile_input_visible = ko.observable();
  self.user_declaration_visible = ko.observable();
  self.availableCountries = ko.observable(['France', 'Germany', 'Spain','Japan','Korea','Phillipine','Algentin','Brazil','Chili']);
  self.chosenCountries = ko.observable(null);
  self.user_profile_belonging = ko.observable();
  self.user_profile_introduction = ko.observable();
  self.profile_confirm_visible = ko.observable();

  self.before_declaration_visible = ko.observable(false);
  self.after_declaration_visible = ko.observable(true);

}


Role_Status_VM.prototype.declaration_check_click = function(){
  var self = this;
  var num_checked = self.declaration_check().length;
  console.log(num_checked); 

}


Role_Status_VM.prototype.click_cancel_joining = function(){
  var self = this;
  self.user_declaration_visible(false);
  self.user_dialog_visible(false);
  self.profile_confirm_visible(false);
  self.profile_input_visible(false);

  var num_checked = self.observableArray().length;
  console.log(num_checked); 
}


Role_Status_VM.prototype.click_confirm_join = function(){
  var self = this;
  self.user_declaration_visible(false);
  self.user_dialog_visible(false);


  var is_audience_role = self.parent_gameframe.participant_object.is_audience_role(self.role_name_str);
  if(is_audience_role){
    var join_type = "JoinGame_Audience"
    var join_obj = { game_id: self.game_id };
  }else{
    //debater
    var join_type = "JoinGame"
    var join_obj = { game_id: self.game_id, role: self.role_name_str};
  }
  Parse.Cloud.run(join_type, join_obj,{
    success: function(game_obj) {
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




Role_Status_VM.prototype.click_goto_declaration = function(){
  var self = this;
  self.user_declaration_visible(true);
  self.profile_confirm_visible(false);

}

Role_Status_VM.prototype.click_input_profile = function(){
  var self = this;
  self.user_declaration_visible(true);
  self.profile_input_visible(false);

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

  self.parent_gameframe.hide_all_button();

  var is_audience_role = self.parent_gameframe.participant_object.is_audience_role(self.role_name_str);
  if(is_audience_role){
    var cancel_type = "CancelGame_Audience"
    var cancel_obj = { game_id: self.game_id };

  }else{
    //debater
    var cancel_type = "CancelGame"
    var cancel_obj = { game_id: self.game_id, role: self.role_name_str};

  }

  Parse.Cloud.run(cancel_type,cancel_obj,{
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

Role_Status_VM.prototype.Join_Game_trigger = function(){
  
  var self = this;
  var current_user = Parse.User.current();

 if(!current_user){
  alert("you need to login to join the game");
  return;
 }
 var is_your_group_role = self.parent_gameframe.participant_object.is_your_group_role(self.role_name_str);
 var is_yourself_have_role = self.parent_gameframe.participant_object.is_yourself_have_role();

 if(!is_your_group_role && is_yourself_have_role){
   alert("you cannot join multiple group");
   return;
  }

  self.parent_gameframe.hide_all_button();
  self.join_game_visible(false);
  self.loading_visible(false);
  self.participant_button_visible(false);
  self.popup_dialog();
}



Role_Status_VM.prototype.popup_dialog = function(){
  var self = this;
  self.user_dialog_visible(true);
  self.profile_input_visible(true);

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
          return;
        }

        var User_Intro = Parse.Object.extend("User_Intro");
        var user_query = new Parse.Query(User_Intro);
        user_query.get(profile_id, {
          success: function(profile_obj){
            self.show_user_profile(user_obj, profile_obj);
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
