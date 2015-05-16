

console.log("test");

function Event(){
	this.event_array={ ZwfdHOj0Eg: 'abcde' , u7ab9xmCo8: 'title', xSq9xEzaqh: 'third event'};
	this.retrieve_roop();
}

Event.prototype.retrieve_roop = function(){

	for(var key in this.event_array){
		this.retrieve_data(key)
	}

}

Event.prototype.retrieve_data  = function(key_string){

		console.log("before callback " + key_string);
		console.log("before callback " + this.event_array[key_string]);
		var Event = Parse.Object.extend("Event");
		var event_query = new Parse.Query(Event);
		var self = this;
		
		event_query.get(key_string, {
			success: function(event_obj){
				console.log("inside callback keystring " + key_string);
				console.log("inside callback value " + self.event_array[key_string]);
				console.log("data from parse " + event_obj.get("title"));
				console.log("----------------");
			},
			error: function(obj,error){
				console.log(error);
			}
		});

}


 var event_obj = new Event();
