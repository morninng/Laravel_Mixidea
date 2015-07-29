<?php namespace App\Http\Controllers;

include(app_path().'/Http/Controllers/include/secret_config.php');

class MixideaAdminController extends Controller {
	
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
	 * @return Response
	 */

	public function term_of_service()
	{
		return view('mixidea_term_of_service')
				->with("mixidea_app_config",$this->config_array);
	}

	public function privacy_policy()
	{
		return view('mixidea_privacy_policy')
				->with("mixidea_app_config",$this->config_array);
	}

	public function user_support()
	{
		return view('mixidea_user_support')
				->with("mixidea_app_config",$this->config_array);
	}

	public function mixidea_marketing()
	{
		return view('mixidea_marketing')
				->with("mixidea_app_config",$this->config_array);
	}


}
