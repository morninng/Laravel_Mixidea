@extends('mixidea_home_layout')

@section('config_init')
<script type="text/javascript">
	console.log("config initialization");
	var parse_app_id = "{{ $mixidea_app_config['parse_app_id'] }}";
	var parse_js_key = "{{ $mixidea_app_config['parse_js_key'] }}";
	var cxense_site_id = "{{ $mixidea_app_config['cxense_site_id'] }}";
	var facebook_app_id = "{{ $mixidea_app_config['facebook_app_id'] }}";
	var facebook_app_version = "{{ $mixidea_app_config['facebook_app_version'] }}";
</script>

<script src="//www.parsecdn.com/js/parse-1.4.2.min.js"></script>

<script type="text/javascript">
  Parse.initialize(parse_app_id, parse_js_key);
  window.fbAsyncInit = function() {
    Parse.FacebookUtils.init({ // this line replaces FB.init({
      appId      : facebook_app_id, // Facebook App ID
      status     : true,  // check Facebook Login status
      cookie     : true,  // enable cookies to allow Parse to access the session
      xfbml      : true,  // initialize Facebook social plugins on the page
      version    : facebook_app_version // point to the latest Facebook Graph API version
    });
 
    // Run code after the Facebook SDK is loaded.
  };
 
  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
</script>



@stop


@section('cxense_init')

<!-- Cxense script begin -->
<script type="text/javascript">
var cX = cX || {}; cX.callQueue = cX.callQueue || [];
cX.callQueue.push(['setSiteId', cxense_site_id]);
cX.callQueue.push(['sendPageViewEvent']);
</script>
<script type="text/javascript">
(function(d,s,e,t){e=d.createElement(s);e.type='text/java'+s;e.async='async';
e.src='http'+('https:'===location.protocol?'s://s':'://')+'cdn.cxense.com/cx.js';
t=d.getElementsByTagName(s)[0];t.parentNode.insertBefore(e,t);})(document,'script');
</script>
<!-- Cxense script end -->

@stop


@section('page_context')

    <style type="text/css">
    li { border-bottom:1px dashed #CCCCCC;
         margin-bottom:5px;  
       }
    </style>

  <ul>
    <li> <span id="profile_picture"></span></li>
    <li><bold>FirstName</bold> : <span id="profile_first_name"></span></li>
    <li><bold>Last Name</bold> : <span id="profile_last_name"></span></li>
    <li><bold>Link to Facebook</bold> : <span id="profile_link"></span></li>
  </ul>
 
@stop

@section('page_script')

  <script src="{{ asset('/js/header_nav_draw.js') }}"></script>
  <script src ="{{ asset('/js/retrieve_user_data.js') }}"></script>
  
@stop
