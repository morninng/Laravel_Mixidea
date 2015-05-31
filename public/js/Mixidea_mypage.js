
function MyPage(){
  this['month_list'] = new Array();
  this['weekday_list'] = new Array();
  this['date_list'] = new Array();
  this['hour_list'] = new Array();
  this['minute_list'] = new Array();
  this.initialize();
}

MyPage.prototype.initialize = function(){

  self=this;
  self.current_user_id = null;
  self.current_user  = Parse.User.current();
  if(self.current_user){
    self.current_user_id =self.current_user.id;
  }
  self['event_condition'] = new Object();
  self.event_condition.dateFrom = new Date();

  self.load_event_data();
  self.load_activity();
};

MyPage.prototype.load_event_data = function(){
  
  var self = this;
  var event_relation = self.current_user.relation("event_participate");
  event_query = event_relation.query();
  event_query.greaterThan('date_time',self.event_condition.dateFrom);
  event_query.ascending('date_time');

  event_query.find({
    success: function(event_objects) {
      for (var i = 0; i < event_objects.length; i++) {
        self.ShowInfo(event_objects[i], i, event_objects.length);
      }
    },
    error: function(error) {
      alert("Error to retrieve event info: " + error.code + " " + error.message);
    }
  });
};

MyPage.prototype.ShowInfo = function(event_obj, i, num){

  console.log('show info' + i);
  var self = this;
  var dom_event_list = $('<li>');
  dom_event_a = $('<a>');
  var event_title = event_obj.get('title');
  var event_date = event_obj.get('date_time');
  var event_description = event_obj.get('description');
  var event_id = event_obj.id;
  
  self.month_list[i] = event_date.getMonth();
  self.weekday_list[i] = event_date.getDay();
  self.date_list[i] = event_date.getDate();
  self.hour_list[i] = event_date.getHours();
  self.minute_list[i] = event_date.getMinutes();
  console.log('month' + self.month_list[i]);
  console.log('week day' + self.weekday_list[i]);
  console.log('date' + self.date_list[i]);
  console.log('hour' + self.hour_list[i]);
  console.log('minute' + self.minute_list[i]);
  console.log(event_date);

  var li_event = self.create_event_li_element( event_id, event_title,event_description,
                                  self.month_list[i], self.date_list[i], self.weekday_list[i], 
                                  self.hour_list[i], self.minute_list[i] );

  $("#my_event_list").append(li_event);  

}

MyPage.prototype.create_event_li_element = function( event_id, event_title,event_description, 
                              event_month, event_day, event_week_day, event_hour, event_min ){
      var self = this;

      var str_month = self.getMonthString(event_month);
      var str_day = self.getDateString(event_day);
      var str_week_date = self.getDateOfWeekString(event_week_day);
      var str_hour = String(event_hour);
      var str_minute = self.getMinuteString(event_min);


      var li_event = $('<li>');
      li_event.attr('style','border-bottom:1px solid #84b2e0; margin-bottom: 10px')
      var div_event = $('<div>');
      div_event.attr('style','line-height: 70%;');
      var p_time = $('<p>');
      var strong_time = $('<strong>');
      var u_time = $('<u>');
      u_time.text("time:" + str_month  + " " + str_day + " " +  str_week_date + " " +  str_hour + ":" + str_minute);
      strong_time.append(u_time);
      p_time.append(strong_time);
      var p_title = $('<p>');
      var a_title = $('<a>');
      a_title.attr('href', '/event/showEvent/' + event_id);
      a_title.text("title:" + event_title);
      p_title.append(a_title);
      var p_description = $('<p>');
      p_description.text("description:" + event_description);
      div_event.append(p_time);
      div_event.append(p_title);
      div_event.append(p_description);
      li_event.append(div_event);

      return li_event;
}


MyPage.prototype.load_activity = function(){

};



MyPage.prototype.handleEvents = function(){
    var self = this;
// スクロールして、最下部までいったら、もっとページを読む処理
 //   game_container_element.on("click", ".participate_button", function(e){
   // });
};

MyPage.prototype.getMonthString = function(num_month){

  month_string_array = ['January','February','March','April','May',
                        'June','July','August','September','October',
                        'November','December'
                        ];
  return month_string_array[num_month];
}

MyPage.prototype.getDateOfWeekString = function(num_week_of_date){

  week_string_array = ['(Sun)','(Mon)','(Tue)','(Wed)','(Thu)',
                        '(Fri)','(Sat)'
                        ];
  return week_string_array[num_week_of_date];
}


MyPage.prototype.getDateString = function(num_date){
  num_date = num_date-1;
  dateString_array = ['1st','2nd','3rd','4th','5th','6th','7th','8th',
                      '9th','10th','11th','12th','13th','14th','15th','16th',
                      '17th','18th','19th','20th','21st','22nd','23rd','24th',
                      '25th','26th','27th','28th','29th','30th','31st'];
  return dateString_array[num_date];
}

MyPage.prototype.getMinuteString = function(num_minute){
  if(num_minute == 0){
    return "00";
  }
  return String(num_minute);
}