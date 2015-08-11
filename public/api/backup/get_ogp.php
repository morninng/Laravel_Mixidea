<?PHP

	require_once('./../opengraph-master/OpenGraph.php');

	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=utf-8");


	$graph = OpenGraph::fetch('http://cookpad.com/recipe/1606942'); 



	$url_str = $_POST; 
	var_dump($url_str);

	$ogp_json = array();

	foreach ($graph as $key => $value) {
		$one_ogp = array( $key => $value );
		array_push($ogp_json, $one_ogp);
	}
	$ogp_json_str2 = serialize($ogp_json);
	$ogp_json_str = json_encode($ogp_json);
	echo $ogp_json_str;

?>

