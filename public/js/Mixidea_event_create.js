
function CreateEvent(){
  var self = this;
  var number_game_str = document.forms.event_creation.num_game.value;
  var number_game_num = Number(number_game_str);
 
  var form_name_game_array = ["game_creation_1", "game_creation_2","game_creation_3",
                              "game_creation_4", "game_creation_5", "game_creation_6"];

  var str_game_genre_array = new Array();
  var str_game_style_array = new Array();
  var str_game_motion_array = new Array();
  var game_obj_array = new Array();

  var str_date = document.event_creation.date.value;
  var str_time = document.event_creation.time.value;
  console.log("str_date: " + str_date);
  console.log("str_time" +  str_time);
  var event_hour = str_time.split(":")[0];
  var event_minute = str_time.split(":")[1];
  var event_datetime = new Date(str_date);
  event_datetime.setHours(event_hour);
  event_datetime.setMinutes(event_minute);
  console.log("input time is " + event_datetime);

  var event_time_obj = new Object();
  event_time_obj = {
    year: event_datetime.getUTCFullYear(),
    month: event_datetime.getUTCMonth(),
    day: event_datetime.getUTCDate(),
    hour: event_datetime.getUTCHours(),
    minutes: event_datetime.getUTCMinutes()
  };
  console.log(event_time_obj);

  for(var i=0;i<number_game_num; i++){
    str_game_genre_array.push( eval( "document." + form_name_game_array[i] + ".genre.value") );
    str_game_style_array.push( eval( "document." + form_name_game_array[i] + ".style.value") );
    str_game_motion_array.push( eval( "document." + form_name_game_array[i] + ".motion.value") );
    var game_obj = {genre: str_game_genre_array[i], style: str_game_style_array[i], motion: str_game_motion_array[i]};
    game_obj_array.push(game_obj);
  }

  var event_object = {
    event_title: document.event_creation.title.value,
    event_description: document.event_creation.description.value,
    event_date_time_obj: event_time_obj,
    event_type: document.event_creation.type.value,
    game_object_array: game_obj_array
  }

  console.log(event_object);
  str_event_obj = JSON.stringify(event_object);

  Parse.Cloud.run('Cloud_CreateEvent', { event_obj: str_event_obj},{
    success: function(game_obj) {
      alert("event has been successfully created");
      //redirect to event show screen
    },
    error: function(error) {
      alert("something happen" + error.message);
      //data should be vaidated before upload and the error should not happen in server side
    }
  });
}
/*

  var self = this;
  self.round_obj = new Object();
  self.game_obj = new Object();
  self.event_obj = new Object();

  var str_title = document.event_creation.title.value;
  var str_date = document.event_creation.date.value;
  var str_time = document.event_creation.time.value;

  var event_hour = str_time.split(":")[0];
  var event_minute = str_time.split(":")[1];
  var event_datetime = new Date(str_date);
  event_datetime.setHours(event_hour);
  event_datetime.setMinutes(event_minute);
  console.log("input time is " + event_datetime);

  var str_genre = document.event_creation.genre.value;
  var str_type = document.event_creation.type.value;
  var str_style = document.event_creation.style.value;
  var str_description = document.event_creation.description.value;
  var str_motion = document.event_creation.motion.value;

  var Game = Parse.Object.extend("Game");
  var mixidea_game = new Game();
  mixidea_game.set("type", str_type);
  mixidea_game.set("style", str_style);
  mixidea_game.set("motion", str_motion);
  mixidea_game.set("date_time", event_datetime);

  mixidea_game.save().then(function(game_obj){
    self.game_obj = game_obj;
    var Round = Parse.Object.extend("Round");
    var mixidea_round = new Round();  
  	mixidea_round.add("game",game_obj.id);
  	return mixidea_round.save();

  }).then(function(round_obj){
    self.round_obj = round_obj;
    var Event = Parse.Object.extend("Event");
    var mixidea_event = new Event();
    mixidea_event.set("date_time", event_datetime);
    mixidea_event.add("genre", str_genre);
    mixidea_event.set("title", str_title);
    mixidea_event.set("type", str_type);
    mixidea_event.set("style", str_style);
    mixidea_event.set("description", str_description);
  	mixidea_event.add("round",round_obj.id);
  	mixidea_event.add("game",self.game_obj.id);


    var game_obj_id = self.game_obj.id;
  	var game_object = {game_ID: game_obj_id, type:str_style}
  	var game_array_obj = [game_object];
    var round_obj_id = round_obj.id;
  	var round_object = {round_ID: round_obj_id, game_array: game_array_obj};
  	var round_array_obj = [round_object];
  	var event_obj = {round_array: round_array_obj};
  	mixidea_event.set("event_hierarchy", event_obj);
  	return mixidea_event.save();

  }).then(function(event_obj) {
    self.event_obj = event_obj;
  	console.log("event,round,game was saved");
    self.round_obj.set('parent_event', self.event_obj.id);
    return self.round_obj.save();
  }).then(function(obj){

    self.game_obj.set('parent_event', self.event_obj.id);
    return self.game_obj.save();
  }).then(function(obj){
    console.log("everthing is created successfully");
  }), function(error) {
  	console.log("error happen" + error);
  };

}

*/
CreateEvent.prototype.create_JSON = function(game_id, game_type){



}



function game_number_change_form(){  
  var number_game_str = document.forms.event_creation.num_game.value;
  var number_game_num = Number(number_game_str);
  gamenumber_change(number_game_num);

}
function gamenumber_change(number_game_num){
  var game_create_form_data = [{caption_name: "First Game", form_id_num: "game_creation_1"},
                               {caption_name: "Second Game", form_id_num: "game_creation_2"},
                               {caption_name: "Third Game", form_id_num: "game_creation_3"},
                               {caption_name: "Fourth Game", form_id_num: "game_creation_4"},
                               {caption_name: "Fifth Game", form_id_num: "game_creation_5"},
                               {caption_name: "Sixth Game", form_id_num: "game_creation_6"}
                               ];

  game_create_form_data_use = game_create_form_data.slice(0, number_game_num);
  game_creation_template = _.template($('[data-template="game_create_template"]').html());
  game_creation_html = game_creation_template({list:game_create_form_data_use});
  $("#game_feed").html(game_creation_html);
}

(function initial_game_number(){
  gamenumber_change(1);
}());

