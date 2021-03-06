
function ShowEvent(game_id, game_style){
  var self = this;
  self.initialize_game_structure(game_id, game_style);
  self.update_game_info(game_id, game_style);
}


ShowEvent.prototype.initialize_game_structure = function(game_id, game_style){

  self=this;
  self.game_container = "";
  self.group_involved = null;
  self.game_id = game_id;
  self.game_style = game_style;
  self.participant_user = new Object();
  self.role_array = new Array();
  self.container_object = new Object();
  self.container_array = new Array();
  self.game_object = null;
  self.current_user_id = null;
  self.current_user = Parse.User.current();
  if(self.current_user){
    self.current_user_id =self.current_user.id;
  }

  switch(game_style){
    case "NorthAmerica":
      self.Set_NA_Template();
      self.role_array = ["PrimeMinister","LeaderOpposition","MemberGovernment","MemberOpposition","ReplyPM","LOReply"];
      self.role_groupo_obj = {
        PrimeMinister: "Gov",
        LeaderOpposition: "Opp",
        MemberGovernment: "Gov",
        MemberOpposition: "Opp",
        ReplyPM: "Gov",
        LOReply: "Opp",
      }
      self.container_array = ["PM_Container","LO_Container","MG_Container","MO_Container","PMR_Container","LOR_Container"];
      for( var i=0; i< self.role_array.length; i++){
        self.participant_user[self.role_array[i]] = null;
        self.container_object[self.role_array[i]] = self.container_array[i];
      }
      self.max_number_Audience = 3;
      break;
    case "BP":
      self.Set_BP_Template();
      self.role_array = ["PrimeMinister","LeaderOpposition","DeptyPrimeMinister","DeptyLeaderOpposition",
                      "MemberGovernment","MemberOpposition","GovermentWhip","OppositionWhip"];
      self.role_groupo_obj = {
        PrimeMinister: "OG",
        LeaderOpposition: "OO",
        DeptyPrimeMinister: "OG",
        DeptyLeaderOpposition: "OO",
        GovernmentWhip: "CG",
        OppositionWhip: "CO",
        GovermentReply: "GW",
        OppositionReply: "OW",
      }
      self.container_array = ["PM_Container","LO_Container","DPM_Container","DLO_Container",
                            "MG_Container","MO_Container","GW_Container","OW_Container"];
      for( var i=0; i< self.role_array.length; i++){
        self.participant_user[self.role_array[i]] = null;
        self.container_object[self.role_array[i]] = self.container_array[i];
      }
      self.max_number_Audience = 2;
      break;
    case "Asian":
      self.Set_Asian_Template();
      self.role_array = ["PrimeMinister","LeaderOpposition","DeptyPrimeMinister","DeptyLeaderOpposition",
                      "GovernmentWhip","OppositionWhip","GovermentReply","OppositionReply"];
      self.role_groupo_obj = {
        PrimeMinister: "Gov",
        LeaderOpposition: "Opp",
        DeptyPrimeMinister: "Gov",
        DeptyLeaderOpposition: "Opp",
        GovernmentWhip: "Gov",
        OppositionWhip: "Opp",
        GovermentReply: "Gov",
        OppositionReply: "Opp",
      }
      self.container_array = ["PM_Container","LO_Container","DPM_Container","DLO_Container",
                            "GW_Container","OW_Container","GR_Container","OR_Container"];
      for( var i=0; i< self.role_array.length; i++){
        self.participant_user[self.role_array[i]] = null;
        self.container_object[self.role_array[i]] = self.container_array[i];
      }
      self.max_number_Audience = 2;
      break;
    default:
      console.log("invalid game type");
      return;
  };
  self.handleEvents();

}

ShowEvent.prototype.update_game_info = function(game_id, game_style){

  var self = this;
  var Game = Parse.Object.extend("Game");
  var game_query = new Parse.Query(Game);
  game_query.get(self.game_id, {
    success: function(game_obj){
      self.game_object = game_obj;
      self.show_date_time();
      self.show_game_motion();
      self.update_debater_participant_data();
      self.fill_debater_container();
      self.fill_audience_container();
      console.log(game_obj);

      self.show_hangout_button();

    },
    error: function(obj,error){
      console.log(error);
    }
  });
}

ShowEvent.prototype.show_hangout_button = function(){

  var self = this;  
  var user_id = Parse.User.current().id;
  if(!user_id){
    return;
  }
  var hangout_container = $("#game_container_" + self.game_id).find(".hangout_container");
  hangout_container.html("");

  var participants_obj = self.game_object.get("participant_role");
  var audience_array = self.game_object.get("audience_participants");
  var is_participate = false;

  if(audience_array){
    for(var i=0; i< audience_array.length; i++)   {
      if(audience_array[i] == user_id){
        is_participate = true;
      }
    }
  }
  if(participants_obj){
    for(key in participants_obj){
      if(participants_obj[key]== user_id){
        is_participate = true;
      }
    }
  }
  
  if(is_participate){

    var hangout_id_obj = self.game_object.get("hangout_id");
    var hangout_domain = hangout_id_obj.main;
    var game_style = self.game_object.get("style");
    var game_id = self.game_object.id;

    switch(game_style){
      case "NorthAmerica":
        hangout_app_id = hangout_NA_id;
      break;
      case "BP":
        hangout_app_id = hangout_BP_id;
      break;
      case "Asian":
        hangout_app_id = hangout_Asian_id;
      break;

    }
    var hangout_query_key = "&gd=";
    var hangout_query_value = "?gid=";
    var hangout_gid = "?gid=";
    var hangout_query_split = "_";
    var first_query_value = user_id;
    var second_query_value = game_id;
    var hangout_link_str= hangout_domain + hangout_gid + hangout_app_id + hangout_query_key
           + first_query_value + hangout_query_split + second_query_value;

    var data = {hangout_link: hangout_link_str};
    var Hangout_html_Template = _.template($('[data-template="Hangout_button_Template"]').html());
    var HangoutButton_html_text = Hangout_html_Template( data );
    var hangout_container = $("#game_container_" + self.game_id).find(".hangout_container");
    hangout_container.append(HangoutButton_html_text);
  }
}

ShowEvent.prototype.show_game_motion = function(){

    var self = this;
    var str_motion = self.game_object.get("motion");
    var game_motion_element = $("#game_container_" + self.game_id).find("#game_motion");
    game_motion_element.html(str_motion);
}

ShowEvent.prototype.show_date_time = function(){

    var self = this;
    var date_time = self.game_object.get("date_time");    
    var datetime_element = $("#event_datetime");
    datetime_element.html(date_time);
};




ShowEvent.prototype.handleEvents = function(){

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



ShowEvent.prototype.CancelGame = function(e){
  var self = this;
  var $target = $(e.currentTarget);
  var role_name =  $target.data('role');

  self.show_loading_icon(role_name);

  Parse.Cloud.run('CancelGame', { game_id: self.game_object.id, role: role_name},{
    success: function(game_obj) {
      self.game_object = game_obj;
      self.update_debater_participant_data();
      self.fill_debater_container();
      self.fill_audience_container();
      self.show_hangout_button();
    },
    error: function(error) {
      var error_JSON = JSON.parse(error.message);
      alert(error_JSON.code + ":" +  error_JSON.message);
      var game_obj = error_JSON.game_obj;
      self.game_object.set("participant_role", game_obj.participant_role);
      self.game_object.set("audience_participants", game_obj.audience_participants);
      self.update_debater_participant_data();
      self.fill_debater_container();
      self.fill_audience_container();
      self.show_hangout_button();
    }
  });
}





ShowEvent.prototype.JoinGame = function(e){

  var self = this;
  var $target = $(e.currentTarget);
  var role_name =  $target.data('role');

 if(!self.current_user_id){
  alert("you need to login to join the game");
  return;
 } 



 if( self.group_involved &&  self.role_groupo_obj[role_name] != self.group_involved){
   console.log(self.group_involved);
   alert("you cannot join multiple group");
   return;
  }

  self.show_loading_icon(role_name);

  Parse.Cloud.run('JoinGame', { game_id: self.game_object.id, role: role_name},{
    success: function(game_obj) {
      self.game_object = game_obj;
      self.update_debater_participant_data();
      self.fill_debater_container();
      self.show_hangout_button();
    },
    error: function(error) {
      var error_JSON = JSON.parse(error.message);
      alert(error_JSON.code + ":" +  error_JSON.message);
      var game_obj = error_JSON.game_obj;
      self.game_object.set("participant_role", game_obj.participant_role);
      self.game_object.set("audience_participants", game_obj.audience_participants);
      self.update_debater_participant_data();
      self.fill_debater_container();
      self.fill_audience_container();
      self.show_hangout_button();
    }
  });
}


ShowEvent.prototype.show_loading_icon = function(role_name_str){

  var self = this;
  var participant_container = $("#game_container_" + self.game_id).find("." + self.container_object[role_name_str]);
  participant_container.html("<div class='loader'>Loading...</div>");

}


ShowEvent.prototype.CancelGame_Audience = function(e){


  Parse.Cloud.run('CancelGame_Audience', { game_id: self.game_object.id },{
    success: function(game_obj) {
      self.game_object = game_obj;
      self.update_debater_participant_data();
      self.fill_debater_container();
      self.fill_audience_container();
      self.show_hangout_button();
    },
    error: function(error) {
      var error_JSON = JSON.parse(error.message);
      alert(error_JSON.code + ":" +  error_JSON.message);
      var game_obj = error_JSON.game_obj;
      self.game_object.set("participant_role", game_obj.participant_role);
      self.game_object.set("audience_participants", game_obj.audience_participants);
      self.update_debater_participant_data();
      self.fill_debater_container();
      self.fill_audience_container();
      self.show_hangout_button();
    }
  });


}


ShowEvent.prototype.JoinGame_Audience = function(e){

  var self = this;
 if(!self.current_user_id){
  alert("you need to login to join the game");
  return;
 } 

 if( self.group_involved  &&  self.group_involved != "audience" ){
   console.log(self.group_involved);
   alert("you cannot join multiple group");
   return;
  }


  Parse.Cloud.run('JoinGame_Audience', { game_id: self.game_object.id },{
    success: function(game_obj) {
      self.game_object = game_obj;
      self.update_debater_participant_data();
      self.fill_debater_container();
      self.fill_audience_container();
      self.show_hangout_button();
    },
    error: function(error) {
      var error_JSON = JSON.parse(error.message);
      alert(error_JSON.code + ":" +  error_JSON.message);
      var game_obj = error_JSON.game_obj;
      self.game_object.set("participant_role", game_obj.participant_role);
      self.game_object.set("audience_participants", game_obj.audience_participants);
      self.update_debater_participant_data();
      self.fill_debater_container();
      self.fill_audience_container();
      self.show_hangout_button();
    }
  });
}


ShowEvent.prototype.update_debater_participant_data = function(){

  var self = this;
  for(var key in self.participant_user){
    self.participant_user[key] = null;
  }
  self.group_involved = null;
  //update the participant array with game object data
  participant_array_in_gameobj = self.game_object.get("participant_role");
  if(participant_array_in_gameobj && (typeof self.participant_user) === "object"){
    for(var key in participant_array_in_gameobj){
      self.participant_user[key] = participant_array_in_gameobj[key];
      if(self.participant_user[key] == self.current_user_id){
        self.group_involved = self.role_groupo_obj[key];
      }
    }
  }
};


ShowEvent.prototype.fill_debater_container = function(){
  var self = this;

//debater participant

  for(var key in self.participant_user){
    if(self.participant_user[key]){
      if(self.participant_user[key] == self.current_user_id){
        self.fill_debater_container_currentuser_applied(key);
      }else{
        self.fill_container_someone_applied(key);
      }
    }else{
      self.fill_container_NoApplicant(key);
    }
  }
};




ShowEvent.prototype.fill_audience_container = function(){

  var self = this;
  var audience_array = new Array();
  audience_array = self.game_object.get("audience_participants");
  var current_user_participate = false;

// init the table

  var audience_container = $("#game_container_" + self.game_id).find(".audience_table");
  audience_container.html("");


  if(audience_array){
    for(var i=0; i<audience_array.length; i++){
      if(audience_array[i]==self.current_user_id){
        self.append_currentuser_audience();
        current_user_participate = true;
        self.group_involved = "audience";
      }else{
        self.append_other_audience(audience_array[i]);
      }
    }
    if( !current_user_participate && audience_array.length < 3){
      self.append_participant_block();
    }
  }else{
    self.append_participant_block();
  }




}

ShowEvent.prototype.append_participant_block = function(){

  var self = this;
  var audience_join_element = "<button class='participate_audience_button'>Join</button>"

  var audience_container = $("#game_container_" + self.game_id).find(".audience_table");
  audience_container.append(audience_join_element);
}


ShowEvent.prototype.append_other_audience = function(user_id){

  var self = this;

  var User = Parse.Object.extend("User");
  var user_query = new Parse.Query(User);
  user_query.get(user_id, {
    success: function(user_obj){
      var data = { 
        first_name: user_obj.get("FirstName"), 
        last_name: user_obj.get("LastName"), 
        picture_src: user_obj.get("Profile_picture"), 
      };
      var OtherAudienceApplied_html_Template = _.template($('[data-template="Other_Audience_Applied_Template"]').html());
      var OtherAudienceApplied_html_text = OtherAudienceApplied_html_Template( {usr_info:data} );
      var audience_list = $("#game_container_" + self.game_id).find(".audience_table");
      audience_list.append(OtherAudienceApplied_html_text);
    },
    error: function(obj,error){
      console.log(error);
    }
  });
}




ShowEvent.prototype.append_currentuser_audience = function(){

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

ShowEvent.prototype.fill_debater_container_currentuser_applied = function(role_name_str){

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


ShowEvent.prototype.fill_container_someone_applied = function(role_name_str){

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


ShowEvent.prototype.fill_container_NoApplicant = function(role_name_str){

    var self = this;
    var data = { role_name: role_name_str };

    NoApplicant_html_Template = _.template($('[data-template="NoApplicant_Template"]').html());
    var NoApplicant_html_text = NoApplicant_html_Template(data);
    var participant_container = $("#game_container_" + self.game_id).find("." + self.container_object[role_name_str]);
    participant_container.html(NoApplicant_html_text);

};


ShowEvent.prototype.Set_NA_Template = function(){
    var self = this;
    NA_html_Template = _.template($('[data-template="NA_Template"]').html());
    var game_table_element = $("#game_container_" + self.game_id).find(".participant_table");
    var NA_html_text = NA_html_Template();
    game_table_element.html(NA_html_text);
};

ShowEvent.prototype.Set_Asian_Template = function(){
    var self = this;
    Asian_html_Template = _.template($('[data-template="Asian_Template"]').html());
    var game_table_element = $("#game_container_" + self.game_id).find(".participant_table");
    var Asian_html_text = Asian_html_Template();
    game_table_element.html(Asian_html_text);
};

ShowEvent.prototype.Set_BP_Template = function(){
    var self = this;
    BP_html_Template = _.template($('[data-template="BP_Template"]').html());
    var game_table_element = $("#game_container_" + self.game_id).find(".participant_table");
    var BP_html_text = BP_html_Template();
    game_table_element.html(BP_html_text);
};

