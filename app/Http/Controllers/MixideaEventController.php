<?php namespace App\Http\Controllers;

define( 'PARSE_SDK_DIR', './../vendor/parse/php-sdk/src/Parse/' );
require './../vendor/autoload.php';
use Parse\ParseObject;
use Parse\ParseQuery;
use Parse\ParseACL;
use Parse\ParsePush;
use Parse\ParseUser;
use Parse\ParseInstallation;
use Parse\ParseException;
use Parse\ParseAnalytics;
use Parse\ParseFile;
use Parse\ParseCloud;
use Parse\ParseClient;
use Parse\ParseSessionStorage;


include(app_path().'/Http/Controllers/include/secret_config.php');

class MixideaEventController extends Controller {

	/**
	 * Create a new controller instance.
	 * @return void
	 */

	public $config_array = array();

	public function __construct()
	{
		$mixidea_config = new Mixidea_Config();
		$this->config_array= $mixidea_config->get_config();
	}

	/**
	 * Show the application dashboard to the user.
	 *
	 * @return Response
	 */

	public function create()
	{

		return view('mixidea_event_create')
				->with("mixidea_app_config",$this->config_array);
	}

	public function showEvent($event_id)
	{
		
		$app_id = $this->config_array['parse_app_id'];
		$rest_key = $this->config_array['parse_rest_key'];
		$master_key = $this->config_array['parse_master_key'];
		ParseClient::initialize( $app_id, $rest_key, $master_key );

		$query = new ParseQuery("Event");
		try {
		  $event_obj = $query->get($event_id);
		  $event_title = $event_obj->get("title");
		  $event_hierarchy = $event_obj->get("event_hierarchy");
		  $event_genre_array = $event_obj->get("genre");
		  $event_type = $event_obj->get("type");
		  $event_style = $event_obj->get("style");
		  $event_genre = "";
/*
		  $event_hierarchy = $event_obj->get('event_hierarchy');
		  echo "event hierarchy";
		  print_r(json_encode($event_hierarchy) );

		  $round_array = $event_hierarchy['round_array'];
		  echo "<br>round array<br>";
		  print_r(json_encode($round_array) );

		  $game_obj = $round_array[0];
		  echo "<br>game object<br>";
		  print_r(json_encode($game_obj));

		  $game_array = $game_obj['game_array'];
		  echo "<br>game array<br>";
		  print_r(json_encode($game_array  ));

		  $round_ID = $game_obj['round_ID'];
		  echo "<br>round id<br>";
		  print_r(json_encode($round_ID  ));


		  $game_first_array = $game_array[0];
		  echo "<br>game first array<br>";
		  print_r(json_encode($game_first_array));

		  $game_ID = $game_first_array['game_ID'];
		  echo "<br>game ID<br>";
		  print_r(json_encode($game_ID));
*/

		  foreach ($event_genre_array as $event_genre_str){
			  $event_genres = $event_genre . $event_genre_str . ",";
		  }
		  $event_genres = substr($event_genres , 0, -1);


		return view('mixidea_show_event')
				->with("mixidea_app_config",$this->config_array)
				->with("event_id",$event_id)
				->with("event_title",$event_title)
				->with("event_genres",$event_genres)
				->with("event_type",$event_type)
				->with("event_hierarchy",$event_hierarchy)
				->with("event_style",$event_style);
		
		} catch (ParseException $ex) {
			echo "event might not exist";
		}
	}


	public function showEventList()
	{
		return view('mixidea_event_create')
				->with("mixidea_app_config",$this->config_array);
	}
}
