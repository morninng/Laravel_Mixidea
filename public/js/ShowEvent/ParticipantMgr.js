
function ParticipantMgr(){

	var self = this;

}

ParticipantMgr.prototype.initialize = function(game_style){

	var self = this;

	self.game_style = game_style;
	self.setGameData();
	self.audience_object_array = new Object();
	self.participant_object_array = new Object();
	self.own_role_array = new Array();
	self.own_group_name = null;
	
}
ParticipantMgr.prototype.update = function(debate_participant_object_array, audience_array){

	var self = this;
	var audience_role_array = ["audience1","audience2","audience3","audience4"];

	for(var key in self.participant_object_array){
    	delete self.participant_object_array[key];
	}
	if(debate_participant_object_array){
		self.participant_object_array = debate_participant_object_array;
	}
	if(audience_array){
		for(var i=0; i<audience_array.length; i++){
			self.participant_object_array[audience_role_array[i]] = audience_array[i];
		}
	}
	self.own_role_array = self.get_own_role_array();
	self.own_group_name = self.get_own_group_name()

}


ParticipantMgr.prototype.get_own_role_array = function(){

	var self = this;
	var role_array = new Array();
	var current_user = Parse.User.current();

	for(var key in self.participant_object_array){
		if(self.participant_object_array[key] == current_user.id){
			role_array.push(key);
		}
	}
	return role_array;
}

ParticipantMgr.prototype.is_yourself_have_role = function(){

	var self = this;
	if(self.own_role_array){
		if(self.own_role_array.length > 0){
			return true;
		}
	}
	return false;
}


ParticipantMgr.prototype.get_own_group_name = function(){

	var self = this;
	if(!self.own_role_array){
		return null;
	}
	var own_group_name = self.get_group_name(self.own_role_array[0]);

	return own_group_name;
}


ParticipantMgr.prototype.get_group_name = function(in_role_name){

	var self = this;
	return self.role_group_array[in_role_name];
}

ParticipantMgr.prototype.is_audience_role = function(in_role_name){

	var self = this;
	var group_name = self.role_group_array[in_role_name];
	if(group_name == "Aud"){
		return true;
	}
	return false;

}




ParticipantMgr.prototype.get_parse_id_from_rolename = function(role_name){

	var self = this;
	return self.participant_object_array[role_name];
}

ParticipantMgr.prototype.is_yourself_from_rolename = function(role_name){

	var self = this;
	parse_id = self.participant_object_array[role_name];
	if(!parse_id){
		return false;
	}

	current_user = Parse.User.current();
	if(current_user){
		if(current_user.id == parse_id){
			return true;
		}
	}
	return false;

}


ParticipantMgr.prototype.not_your_group_role = function(role_name){
	var self = this;
	var role_group_name = self.get_group_name(role_name);
	if(!role_group_name){
		return true;
	}

	if(role_group_name == self.own_group_name){
		return false;
	}
	return true;

}

ParticipantMgr.prototype.is_your_group_role = function(role_name){

	var self = this;
	var role_group_name = self.get_group_name(role_name);
	if(role_group_name == self.own_group_name){
		return true;
	}
	return false;
}

ParticipantMgr.prototype.valid_to_join = function(role_name){


}

ParticipantMgr.prototype.setGameData = function(){

	var self = this;
	var game_style = self.game_style;
	
	switch(game_style){
	  case 'NorthAmerica':
		self.role_array = ["PrimeMinister","LeaderOpposition","MemberGovernment","MemberOpposition","ReplyPM","LOReply","audince1","audince2","audince3","audince4"];
		self.role_group_array = {PrimeMinister:"Gov",LeaderOpposition:"Opp",MemberGovernment:"Gov",MemberOpposition:"Opp",ReplyPM:"Gov",LOReply:"Opp",audience1:"Aud",audience2:"Aud",audience3:"Aud",audience4:"Aud"};
		break;
	  case 'Asian':
	  	self.role_array = ["PrimeMinister","LeaderOpposition","DeptyPrimeMinister","DeptyLeaderOpposition",
                      "GovernmentWhip","OppositionWhip","GovermentReply","OppositionReply","audince1","audince2"];
		self.role_group_array = {PrimeMinister:"Gov",LeaderOpposition:"Opp",DeptyPrimeMinister:"Gov",DeptyLeaderOpposition:"Opp",GovernmentWhip:"Gov",OppositionWhip:"Opp",ReplyPM:"Gov",LOReply:"Opp",audience1:"Aud",audience2:"Aud"};
		break;
	  case 'BP':
	  	self.role_array = ["PrimeMinister","LeaderOpposition","DeptyPrimeMinister","DeptyLeaderOpposition",
                      "MemberGovernment","MemberOpposition","GovermentWhip","OppositionWhip","audince1","audince2"];
		self.role_group_array = {PrimeMinister:"OG",LeaderOpposition:"OO",DeptyPrimeMinister:"OG",DeptyLeaderOpposition:"OO",MemberGovernment:"CG",MemberOpposition:"CO",GovermentWhip:"CG",OppositionWhip:"CO",audience1:"Aud",audience2:"Aud"};
		break;
	}
}
