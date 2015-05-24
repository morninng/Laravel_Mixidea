function ShowEventList(){

  this.initialFilterCondition();
  this.RetrieveInfo();
  this['month_list'] = new Array();
  this['weekday_list'] = new Array();
  this['date_list'] = new Array();
  this['hour_list'] = new Array();
  this['minute_list'] = new Array();
}

ShowEventList.prototype.click_update_feed = function(){

  this.updateFilterCondition();
  this.RetrieveInfo();

}

ShowEventList.prototype.initialFilterCondition = function(){

  var self = this;
  self['condition'] = new Object();
  self.condition.dateFrom = new Date();
  self.condition.timeFrom = "";
  self.condition.timeTo = "";
  self.condition.Gametype = "";
  self.condition.ParticipantLevel = "";

}

ShowEventList.prototype.updateFilterCondition = function(){

  var self = this;
  self.condition.date = "";
  self.condition.genre = "";
  self.condition.type = "";
  self.condition.time = "";
  self.condition.level = "";

}

ShowEventList.prototype.RetrieveInfo = function(){
  var self = this;
  var Event = Parse.Object.extend("Event");
  var event_query = new Parse.Query(Event);
//  event_query.equalTo("playerName", "Dan Stemkoski");
  if(self.condition.dateFrom){
    event_query.greaterThan('date_time',self.condition.dateFrom);
    console.log(self.condition.dateFrom);
  }

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
}


ShowEventList.prototype.ShowInfo = function(event_obj, i, num){


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


  if(i==0){

      self.addMonthElement(self.month_list[i])
      self.addDateElement(self.date_list[i], self.weekday_list[i]);

      var ul_sameDate_element = $('<ul>');
      ul_sameDate_element.addClass("same_date");
      var li_event = self.create_event_li_element( event_id, event_title,event_description,
                                      self.hour_list[i], self.minute_list[i] );
      ul_sameDate_element.append(li_event);
      $("#eventlist_feed").append(ul_sameDate_element);  

  }else{

    var sameday = true;
    if(self.month_list[i] != self.month_list[i-1]){
      self.addMonthElement(self.month_list[i])
      sameday=false;
    }

    if(self.date_list[i] != self.date_list[i-1]){
      self.addDateElement(self.date_list[i], self.weekday_list[i]);
      sameday=false;
    }

    if(sameday){
      var sameday_event_list_ul =  $("#eventlist_feed").find('.same_date').last();
      var li_event = self.create_event_li_element( event_id, event_title,event_description,
                                      self.hour_list[i], self.minute_list[i] );

      sameday_event_list_ul.append(li_event);
    }else{

      var ul_sameDate_element = $('<ul>');
      ul_sameDate_element.addClass("same_date");
      var li_event = self.create_event_li_element( event_id, event_title,event_description,
                                      self.hour_list[i], self.minute_list[i] );
      ul_sameDate_element.append(li_event);
      $("#eventlist_feed").append(ul_sameDate_element);  
    }
  }
  $("#eventlist_ul").append();
}

ShowEventList.prototype.addMonthElement = function(num_month){

      var self = this;
      var month_str = self.getMonthString(num_month);
      var month_element = $('<h1>')
      month_element.text(month_str);
      month_element.append('<hr>');
      $("#eventlist_feed").append(month_element);
}
ShowEventList.prototype.addDateElement = function(num_date, num_week_day){
      var self = this;
      var dateOfWeek_str = self.getDateOfWeekString(num_week_day);
      var date_str = self.getDateString(num_date);
      var date_element = $('<h3>');
      date_element.text(date_str + dateOfWeek_str);
      $("#eventlist_feed").append(date_element);  
}
ShowEventList.prototype.create_event_li_element = function( event_id,
                                      event_title,event_description, event_hour, event_min ){
      var self = this;

      var li_event = $('<li>');
      li_event.attr('style','border-bottom:1px solid #84b2e0')
      var div_event = $('<div>');
      var a_title = $('<a>');
      a_title.attr('href', '/event/showEvent/' + event_id);
      var minute_str = self.getMinuteString(event_min);
      a_title.text("time " + String(event_hour) + ":" +  minute_str  + " - - -title" + event_title);
      var p_description = $('<p>');
      p_description.text(event_description);
      div_event.append(a_title);
      div_event.append(p_description);
      li_event.append(div_event);

      return li_event;
}

ShowEventList.prototype.getMonthString = function(num_month){

  month_string_array = ['January','February','March','April','May',
                        'June','July','August','September','October',
                        'November','December'
                        ];
  return month_string_array[num_month];
}

ShowEventList.prototype.getDateOfWeekString = function(num_week_of_date){

  week_string_array = ['(Sun)','(Mon)','(Tue)','(Wed)','(Thu)',
                        '(Fri)','(Sat)'
                        ];
  return week_string_array[num_week_of_date];
}

ShowEventList.prototype.getDateString = function(num_date){
  num_date = num_date-1;
  dateString_array = ['1st','2nd','3rd','4th','5th','6th','7th','8th',
                      '9th','10th','11th','12th','13th','14th','15th','16th',
                      '17th','18th','19th','20th','21st','22nd','23rd','24th',
                      '25th','26th','27th','28th','29th','30th','31st'];
  return dateString_array[num_date];
}

ShowEventList.prototype.getMinuteString = function(num_minute){
  if(num_minute == 0){
    return "00";
  }
  return String(num_minute);
}

new ShowEventList();
