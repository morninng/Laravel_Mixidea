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
	 * @return Response
	 */

	public function create()
	{
		return view('mixidea_event_create')
				->with("mixidea_app_config",$this->config_array);
	}

	public function ShowEventList()
	{
		$app_id = $this->config_array['parse_app_id'];
		$rest_key = $this->config_array['parse_rest_key'];
		$master_key = $this->config_array['parse_master_key'];

		return view('mixidea_show_event_list')
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
		  $event_description = $event_obj->get("description");
		  $event_genre = "";

		  // foreach ($event_genre_array as $event_genre_str){
			 //  $event_genres = $event_genre . $event_genre_str . ",";
		  // }
		  // $event_genres = substr($event_genres , 0, -1);

		return view('mixidea_show_event')
				->with("mixidea_app_config",$this->config_array)
				->with("event_id",$event_id)
				->with("event_title",$event_title)
				->with("event_description",$event_description)
//				->with("event_genres",$event_genres)
				->with("event_type",$event_type)
				->with("event_hierarchy",$event_hierarchy)
				->with("event_style",$event_style);	
		} catch (ParseException $ex) {
			echo "event might not exist";
		}
	}
}
