function MyPage(){
  this.initialize();
}

MyPage.prototype.initialize = function(game_id, game_type){

  self=this;
  self.current_user_id = null;
  self.current_user  = Parse.User.current();
  if(self.current_user){
    self.current_user_id =self.current_user.id;
  }
  self.load_event_data();
  self.load_activity();

};

MyPage.prototype.load_event_data = function(){
  
  var self = this;

  var Event = Parse.Object.extend("Event");
  var event_query = new Parse.Query(Event);
  event_query.include();

  $("#my_event_list").append(date_element);  
  
};

MyPage.prototype.load_activity = function(){

};



MyPage.prototype.handleEvents = function(){
    var self = this;
// スクロールして、最下部までいったら、もっとページを読む処理
    game_container_element.on("click", ".participate_button", function(e){

    });
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
    var my_page_event = $("#event_list");
    game_table_element.html(NA_html_Template);
};

