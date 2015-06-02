function ShowEvent(game_id, game_type){
  this.initialize(game_id, game_type);
}

ShowEvent.prototype.initialize = function(game_id, game_type){

  self=this;
  self.game_container = "";
  self.game_id = game_id;
  self.game_type = game_type;
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

  switch(game_type){
    case "NorthAmerica":
      self.Set_NA_Template();
      self.role_array = ["PrimeMinister","LeaderOpposition","MemberGovernment","MemberOpposition","ReplyPM","LOReply"];
      self.container_array = ["PM_Container","LO_Container","MG_Container","MO_Container","PMR_Container","LOR_Container"];
      for( var i=0; i< self.role_array.length; i++){
        self.participant_user[self.role_array[i]] = null;
        self.container_object[self.role_array[i]] = self.container_array[i];
      }
      self.max_number_Audience = 3;
      break;
    case "BP":
      console.log("under development");
      break;
    case "Asin":
      console.log("under development");
      break;
    default:
      console.log("invalid game type");
      return;
  };

//  this.handleEvents();
  var Game = Parse.Object.extend("Game");
  var game_query = new Parse.Query(Game);
  game_query.get(self.game_id, {
    success: function(game_obj){
      self.game_object = game_obj;
      self.show_date_time();
      self.show_game_motion();
      self.update_participant_data();
      self.fill_container();
      self.handleEvents();
      console.log(game_obj);

    },
    error: function(obj,error){
      console.log(error);
    }
  });
};


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

ShowEvent.prototype.update_participant_data = function(){

  var self = this;
  for(var key in self.participant_user){
    self.participant_user[key] = null;
  }
  //update the participant array with game object data
  participant_array_in_gameobj = self.game_object.get("participant_role");
  if(participant_array_in_gameobj && (typeof self.participant_user) === "object"){
    for(var key in participant_array_in_gameobj){
      self.participant_user[key] = participant_array_in_gameobj[key]
    }
  }
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
};

ShowEvent.prototype.CancelGame = function(e){
  var self = this;
  var $target = $(e.currentTarget);
  var role_name =  $target.data('role');

  Parse.Cloud.run('CancelGame', { game_id: self.game_object.id, role: role_name},{
    success: function(game_obj) {
      self.game_object = game_obj;
      self.update_participant_data();
      self.fill_container();
    },
    error: function(error) {
      var error_JSON = JSON.parse(error.message);
      alert(error_JSON.code + ":" +  error_JSON.message);
      var game_obj = error_JSON.game_obj;
      self.game_object.set("participant_role", game_obj.participant_role);
      self.update_participant_data();
      self.fill_container();
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

  Parse.Cloud.run('JoinGame', { game_id: self.game_object.id, role: role_name},{
    success: function(game_obj) {
      self.game_object = game_obj;
      self.update_participant_data();
      self.fill_container();
    },
    error: function(error) {
      var error_JSON = JSON.parse(error.message);
      alert(error_JSON.code + ":" +  error_JSON.message);
      var game_obj = error_JSON.game_obj;
      self.game_object.set("participant_role", game_obj.participant_role);
      self.update_participant_data();
      self.fill_container();
    }
  });
}



ShowEvent.prototype.fill_container = function(){

  var self = this;

  for(var key in self.participant_user){
    if(self.participant_user[key]){
      if(self.participant_user[key] == self.current_user_id){
        self.fill_container_currentuser_applied(key);
      }else{
        self.fill_container_someone_applied(key);
      }
    }else{
      self.fill_container_NoApplicant(key);
    }
  }
};

ShowEvent.prototype.fill_container_currentuser_applied = function(role_name){

  var user_first_name = "";
  var user_last_name = "";
  var user_picture_src = "";

  if(self.current_user){
    user_first_name = self.current_user.get("FirstName");
    user_last_name = self.current_user.get("LastName");
    user_picture_src = self.current_user.get("Profile_picture");
  }

  var CurrentUserApplied_Template = 
                             "<div class='role'> <p><font-weight: bol>" + role_name + "</font-weight></p></div>" +
                             "<div class='participant' style='float:left;'>" + user_first_name+ "&nbsp;" + user_last_name + "</div>" +
                              "<div class='event_button' style='float:right;margin-right:5px; margin-left:5px;'>" +
                                "<button class='cancel_button' data-role=" + role_name +
                                ">Cancel</button>" +
                              "</div>" +
                              "<div class='comment' align='center' style='clear:both'>You have joined</div>";

    var participant_container = $("#game_container_" + self.game_id).find("." + self.container_object[role_name]);
    participant_container.html(CurrentUserApplied_Template);

};

ShowEvent.prototype.fill_container_someone_applied = function(role_name){

  var self=this;
  var user_id = self.participant_user[role_name];
  console.log(user_id);

  var User = Parse.Object.extend("User");
  var user_query = new Parse.Query(User);
  user_query.get(user_id, {
    success: function(user_obj){
      var user_first_name = user_obj.get("FirstName");
      var user_last_name = user_obj.get("LastName");
      var user_picture_src = user_obj.get("Profile_picture");

       var ParticipantApplied_Template = 
                             "<div class='role'> <p><font-weight: bol>" + role_name + "</font-weight></p></div>" +
                             "<div class='participant' style='float:left;'>" + user_first_name+ "&nbsp;" + user_last_name + "</div>";

      var participant_container = $("#game_container_" + self.game_id).find("." + self.container_object[role_name]);
      participant_container.html(ParticipantApplied_Template);

    },
    error: function(obj,error){
      console.log(error);
    }
  });



  console.log("someone applied")
};

ShowEvent.prototype.fill_container_NoApplicant = function(role_name){

  var NoApplicant_Template = "<div class='role'> <p><font-weight: bol>" + role_name +
                             "</font-weight></p></div>" +
                              "<div class='event_button' style='float:right;margin-right:5px; margin-left:5px;'>" +
                                "<button class='participate_button' data-role=" + role_name +
                                ">Join</button>" +
                              "</div>" +
                              "<div class='comment' style='clear:both'></div>";

    var participant_container = $("#game_container_" + this.game_id).find("." + self.container_object[role_name]);
    participant_container.html(NoApplicant_Template);

};


ShowEvent.prototype.Set_NA_Template = function(){
  var NA_html_Template = "<table class='table table-bordered'>" +
       "<thead><tr><th>Government</th><th>Opposition</th></tr></thead>" + 
       "<tbody>" +
        "<tr><td><div class='PM_Container'>" +
            "</div></td>" +
            "<td><div class='LO_Container'>" +
            "</div></td></tr>" +
        "<tr><td><div class='MG_Container'>" +
            "</div></td>" +
            "<td><div class='MO_Container'></div>" +
            "</td></tr>" +
        "<tr><td><div class='PMR_Container'>" +
            "</div></td>" +
            "<td><div class='LOR_Container'>" +
            "</div></td></tr>" +
       "</tbody>" +
      "</table>";
    var game_table_element = $("#game_container_" + this.game_id).find(".participant_table");
    game_table_element.html(NA_html_Template);
};

