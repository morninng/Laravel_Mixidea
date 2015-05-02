<?php namespace App\Http\Controllers;


		include(app_path().'/Http/Controllers/include/secret_config.php');

class MixideahomeController extends Controller {
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

		public function home()
	{

		return view('mixidea_home')
				->with("mixidea_app_config",$this->config_array);
	}

}
