
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
	for(var i = 0; i< self.role_array.length; i++){
		self.CreateUserObj(self.role_array[i], self.container_array[i]);
		self.UpdateUserObj(self.role_array[i]);
	}
}



GameFrame.prototype.CreateUserObj = function(role_name, container_name){
	var self = this;

	eval("self.role_obj_" + role_name + " = new Role_Status_VM('" + role_name + "');" );
	var role_obj = eval("self.role_obj_" + role_name);
	var applied_element = document.getElementById(container_name);
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


	var audience_data =   [
							{container_name:"Audience1_Container"},
							{container_name:"Audience2_Container"},
							{container_name:"Audience3_Container"},
							{container_name:"Audience4_Container"}
							];

	//var audience_data_use = audience_data.slice(0, number_audience);
	var audience_data_use = audience_data;
	var audience_data_template = _.template($('[data-template="audience_list_template"]').html());
	var audience_data_html = audience_data_template({list:audience_data_use});

	$("#audience_list").html(audience_data_html);

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


