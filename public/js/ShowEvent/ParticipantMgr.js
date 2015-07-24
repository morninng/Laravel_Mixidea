
function ParticipantMgr(){

	var self = this;

}

ParticipantMgr.prototype.initialize = function(game_style){

	var self = this;

	self.game_style = game_style;
	self.setGameData();
	self.audience_object_array = new Object();
	self.participant_object_array = new Object();
	
}
ParticipantMgr.prototype.update = function(game_obj){

	var self = this;
	var audience_role_array = ["audience1","audience2","audience3","audience4"];

	for(var key in self.participant_object_array){
    	delete self.participant_object_array[key];
	}
	self.participant_object_array = game_obj.get("participant_role");

	var audience_array = game_obj.get("audience_participants");	
	for(var i=0; i<audience_array.length; i++){
		self.participant_object_array[audience_role_array[i]] = audience_array[i];
	}
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
