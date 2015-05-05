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
	/*
	| Home Controller
	*/

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
		/*initialization of parse*/ 
		$app_id = $this->config_array['parse_app_id'];
		$rest_key = $this->config_array['parse_rest_key'];
		$master_key = $this->config_array['parse_master_key'];
		ParseClient::initialize( $app_id, $rest_key, $master_key );

		$query = new ParseQuery("Event");
		try {
		  $event_obj = $query->get($event_id);
		  $event_date = $event_obj->get("title");
		  echo $event_date;
		
		} catch (ParseException $ex) {
			echo "error to retrieve event obj";
		}


		return view('mixidea_event_create')
				->with("mixidea_app_config",$this->config_array);
	}


		public function showEventList()
	{

		return view('mixidea_event_create')
				->with("mixidea_app_config",$this->config_array);
	}



}
