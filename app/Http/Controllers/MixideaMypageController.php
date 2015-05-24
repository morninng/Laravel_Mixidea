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

class MixideaMypageController extends Controller {

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


	}
}
