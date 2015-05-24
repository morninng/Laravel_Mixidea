<?php namespace App\Http\Controllers;

		include(app_path().'/Http/Controllers/include/secret_config.php');

class MixideaUserController extends Controller {
	/**
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
	 * @return Response
	 */

	public function mypage()
	{
		return view('mixidea_event_create')
				->with("mixidea_app_config",$this->config_array);
	}

	public function show_profile($user_id)
	{
		return view('mixidea_event_create')
				->with("mixidea_app_config",$this->config_array);
	}

	public function edit_profile()
	{
		return view('mixidea_edit_profile')
				->with("mixidea_app_config",$this->config_array);
	}

	public function show_past_activity($user_id)
	{
		return view('mixidea_event_create')
				->with("mixidea_app_config",$this->config_array);
	}

}
