
function GameFrame(game_id, game_style){
  var self = this;
  self.game_id = game_id;
  self.game_style = game_style;
}

GameFrame.prototype.initialize = function(){

	var self = this;
  	self.CreateTableTemplate(self.game_style);
	self.CreateAudienceTemplate();
	self.create_rolename_array(self.game_style);	
	self.participant_object = new ParticipantMgr();
	self.participant_object.initialize(self.game_style);

	for(var i = 0; i< self.role_array.length; i++){
		self.CreateUserObj(self.role_array[i], self.container_array[i]);
	//	self.UpdateUserObj(self.role_array[i]);
	}
}

GameFrame.prototype.update_game_info = function(){

  var self = this;
  var Game = Parse.Object.extend("Game");
  var game_query = new Parse.Query(Game);
  game_query.get(self.game_id, {
    success: function(game_obj){
      self.game_object = game_obj;
      self.show_date_time();
      self.show_game_motion();
      self.participant_object.update(game_obj);
	  self.UpdateUserObjAll();

//      self.update_debater_participant_data();
//      self.fill_debater_container();
//      self.fill_audience_container();
//      console.log(game_obj);

//      self.show_hangout_button();

    },
    error: function(obj,error){
      console.log(error);
    }
  });
}



GameFrame.prototype.CreateUserObj = function(role_name, container_name){
	var self = this;
	console.log("create user obj : " + role_name);
	console.log("create user obj : " + container_name);
	console.log("self.role_obj_" + role_name + " = new Role_Status_VM('" + role_name + "','" + self.game_id + "'," + self + ");" );
	eval("self.role_obj_" + role_name + " = new Role_Status_VM();" );
	var role_obj = eval("self.role_obj_" + role_name);
	role_obj.initialize(role_name, self.game_id, self);
	//eval("self.role_obj_" + role_name + " = new Role_Status_VM('" + role_name + "','" + self.game_id +  "','" + self + "');" );
	//var role_obj = eval("self.role_obj_" + role_name);
	var applied_element = document.getElementById(container_name);
	console.log(applied_element)
	ko.applyBindings( role_obj, applied_element);
//	eval("ko.applyBindings( self.role_obj_" + role_name + " , document.getElementById('" + container_name + "'));" );
	console.log("");
}


GameFrame.prototype.UpdateUserObjAll = function(){
	var self = this;
	for(var i = 0; i< self.role_array.length; i++){
		self.UpdateUserObj(self.role_array[i]);
	}
}

GameFrame.prototype.UpdateUserObj = function(role_name){
	var self = this;
	var role_obj = eval("self.role_obj_" + role_name);
	role_obj.update_user_status();
//	eval("self.user_obj_" + role_name + ".update_user_status();");
}

GameFrame.prototype.create_rolename_array = function(game_style){
	
	var self = this;
	switch(game_style){
	  case 'NorthAmerica':
		self.role_array = ["PrimeMinister","LeaderOpposition","MemberGovernment","MemberOpposition","ReplyPM","LOReply"];
		self.container_array = ["PM_Container_" + self.game_id,
		"LO_Container_" + self.game_id,
		"MG_Container_" + self.game_id,
		"MO_Container_" + self.game_id,
		"PMR_Container_" + self.game_id,
		"LOR_Container_" + self.game_id];
		break;
	  case 'Asian':
	  	self.role_array = ["PrimeMinister","LeaderOpposition","DeptyPrimeMinister","DeptyLeaderOpposition",
                      "GovernmentWhip","OppositionWhip","GovermentReply","OppositionReply"];
        self.container_array = [
        "PM_Container_" + self.game_id,
        "LO_Container_" + self.game_id,
        "DPM_Container_" + self.game_id,
        "DLO_Container_" + self.game_id,
        "GW_Container_" + self.game_id,
        "OW_Container_" + self.game_id,
        "GR_Container_" + self.game_id,
        "OR_Container_" + self.game_id,];
		break;
	  case 'BP':
	  	self.role_array = ["PrimeMinister","LeaderOpposition","DeptyPrimeMinister","DeptyLeaderOpposition",
                      "MemberGovernment","MemberOpposition","GovermentWhip","OppositionWhip"];
      	self.container_array = [
      	"PM_Container_" + self.game_id,
      	"LO_Container_" + self.game_id,
      	"DPM_Container_" + self.game_id,
      	"DLO_Container_" + self.game_id,
        "MG_Container_" + self.game_id,
        "MO_Container_" + self.game_id,
        "GW_Container_" + self.game_id,
        "OW_Container_" + self.game_id];
		break;
	}


	var audience_role_array_full = ["audience1","audience2","audience3","audience4"];
	var audience_container_array_full = [
		"Audience1_Container_" + self.game_id,
		"Audience2_Container_" + self.game_id,
		"Audience3_Container_" + self.game_id,
		"Audience4_Container_" + self.game_id];
//	var audience_role_array = audience_role_array_full.slice(0,number_audience);
//	var audience_container_array = audience_container_array_full.slice(0,number_audience);

	self.role_array = self.role_array.concat(audience_role_array_full);
	self.container_array = self.container_array.concat(audience_container_array_full);

}


GameFrame.prototype.CreateAudienceTemplate = function(){

	var self = this;
	var audience_data =   [
		{container_name:"Audience1_Container_" + self.game_id},
		{container_name:"Audience2_Container_" + self.game_id},
		{container_name:"Audience3_Container_" + self.game_id},
		{container_name:"Audience4_Container_" + self.game_id}
		];

	//var audience_data_use = audience_data.slice(0, number_audience);
	var audience_data_use = audience_data;
	var audience_data_template = _.template($('[data-template="audience_list_template"]').html());
	var audience_data_html = audience_data_template({list:audience_data_use});
	var audience_list_element = $("#game_container_" +  self.game_id).find(".audience_list");

	audience_list_element.html(audience_data_html);

}



GameFrame.prototype.CreateTableTemplate = function(){

	var self = this;
	var participant_table_element = $("#game_container_" +  self.game_id).find(".participant_table");
	var data = {game_id: self.game_id};

	switch(self.game_style){
	  case 'NorthAmerica':
		NA_html_Template = _.template($('[data-template="NA_Template"]').html());
		var NA_html_text = NA_html_Template(data);
		participant_table_element.html(NA_html_text);
		break;
	  case 'Asian':
		Asian_html_Template = _.template($('[data-template="Asian_Template"]').html());
		var Asian_html_text = Asian_html_Template(data);
		participant_table_element.html(Asian_html_text);
		break;
	  case 'BP':
		BP_html_Template = _.template($('[data-template="BP_Template"]').html());
		var BP_html_text = BP_html_Template(data);
		participant_table_element.html(BP_html_text);
		break;
	}
}


GameFrame.prototype.show_date_time = function(){

    var self = this;
    var date_time = self.game_object.get("date_time");    
    var datetime_element = $("#event_datetime");
    datetime_element.html(date_time);
};


GameFrame.prototype.show_game_motion = function(){

    var self = this;
    var str_motion = self.game_object.get("motion");
    var game_motion_element = $("#game_container_" + self.game_id).find(".game_motion");
    game_motion_element.html(str_motion);
}
