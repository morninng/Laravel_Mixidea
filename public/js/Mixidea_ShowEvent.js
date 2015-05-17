
function ShowEvent(game_id, game_type){
  this.initialize(game_id, game_type);
}



ShowEvent.prototype.initialize = function(game_id, game_type){

  this.game_container = "";
  this.game_id = game_id;
  this.game_type = game_type;
  this.participant_user = new Object();
  this.role_array = new Array();
  this.container_array = new Array();

  switch(game_type){
    case "NorthAmerica":
      this.Set_NA_Template();
      this.role_array = ["PrimeMinister","LeaderOpposition","MemberGovernment","MemberOpposition","ReplyPM","LOReply"];
      this.container_array = []
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
/*
  this.handleEvents();
  this.Retrieve_GameInfo().then(function(){
    this.fill_container_NoApplicant();
    this.fill_container_UserApplied();
    this.fill_conainer_userInfo();
  });
*/
};


ShowEvent.prototype.Set_NA_Template = function(){
  var NA_html_Template = "<table class='table table-bordered'>" +
       "<thead><tr><th>Government</th><th>Opposition</th></tr></thead>" + 
       "<tbody>" +
        "<tr><td><div id='PM_Container'>" +
            "</div></td>" +
            "<td><div id='LO_Container'>" +
            "</div></td></tr>" +
        "<tr><td><div id='MG_Container'>" +
            "</div></td>" +
            "<td><div id='MO_Container'></div>" +
            "</td></tr>" +
        "<tr><td><div id='PMR_Container'>" +
            "</div></td>" +
            "<td><div id='LOR_Container'>" +
            "</div></td></tr>" +
       "</tbody>" +
      "</table>";
    var game_table_element = $("#game_container_" + this.game_id).find(".participant_table");
    game_table_element.append(NA_html_Template);

};

