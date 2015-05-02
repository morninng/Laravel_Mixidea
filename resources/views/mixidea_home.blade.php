@extends('mixidea_home_layout')




@section('config_init')

<script type="text/javascript">
	var parse_js_id = "{{ $mixidea_app_config['parse_js_key'] }}"
	document.write("js id is" + parse_js_id);
</script>



@stop

