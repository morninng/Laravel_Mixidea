<?PHP

	require_once('./opengraph-master/OpenGraph.php');

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=utf-8");



	$url_str_array = $_POST; 
	$connected_url_str = implode("", $url_str_array);
	$decoded_url = rawurldecode( $connected_url_str );
	$graph = OpenGraph::fetch($decoded_url); 

	$ogp_json = array();
	foreach ($graph as $key => $value) {
		$one_ogp = array( $key => $value );
		array_push($ogp_json, $one_ogp);
	}
	$ogp_json_str = json_encode($ogp_json);
	echo $ogp_json_str;

?>

