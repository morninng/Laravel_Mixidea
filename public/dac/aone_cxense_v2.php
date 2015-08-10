<?PHP

	header("Content-Type: application/json; charset=utf-8");

	function setCxenseFirstpartyData($obj)
	{
		$username="cxense-team@dac.co.jp";
		$apikey="api&user&Qkc0a6QqYvTPjOsYbhR7Sg==";
		$date = date("Y-m-d\TH:i:s.000O");
		$signature=hash_hmac("sha256", $date, $apikey);
		$url = 'https://api.cxense.com/profile/user/external/update';
		$plainjson_payload = json_encode($obj);;

		$request_data = array(
		    'http' => array(
		        'header'  => "Content-Type: application/json; charset=UTF-8\r\n".
		                     "X-cXense-Authentication: username=$username date=$date hmac-sha256-hex=$signature\r\n",
		        'method'  => 'POST',
		        'content' => $plainjson_payload,
		    ),
		);
		$context  = stream_context_create($request_data);
		$result = file_get_contents($url, false, $context);
	}

	$id = $_POST['id']; 
	$segments_str = $_POST['segments']; 
	$segments_array = preg_split("/,/", $segments_str);
	$seg_obj_array = array();
	 
	foreach( $segments_array as $segment ){
		$segment_obj = array( 'group' => "dac-aoneseg",'item' => $segment );
		array_push($seg_obj_array, $segment_obj);
	}
	$user_seg_obj = array( 'id' => $id,'type' => "dac", 'profile' => $seg_obj_array );
	setCxenseFirstpartyData($user_seg_obj);


?>