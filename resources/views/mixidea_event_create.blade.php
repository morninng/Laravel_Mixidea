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
 <caption>Create Event</caption>
 <form name="event_creation" enctype="multipart/form-date"> 
  <ul>
    <li><label>Event Title:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="title"></li>
    <li><label>date:&nbsp;&nbsp;&nbsp;&nbsp;</label><input type="date" name="date"></li>
    <li><label>time:&nbsp;&nbsp;&nbsp;&nbsp;</label><input type="time" step="1800" name="time"></li>
    <li><label>genre:&nbsp;&nbsp;&nbsp;&nbsp;
      <select name = "genre">
        <option value="politics">politics</option>
        <option value="economics">economics</option>
        <option value="international_relationship">internatilonal relationship</option>
        <option value="life_style">Life Style</option>
        <option value="love">Love</option>
        <option value="technology">Technology</option>
      </select>
    </li>
    <li><label>Event Type:&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="type" checked="checked" value="debate">debate</li>
    <li><label>Event Style:&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="style" checked="checked" value="NorthAmerica">North America</li>

    <li><label>Event Motion(only if you can decide in advance):&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="motion"></li>
    <li><label>Event Description:&nbsp;&nbsp;&nbsp;&nbsp;<textarea name="description"></textarea></li>
  </ul>
    <center><input value="create event" type="button" onClick="create_event()"></center>
 </form>
@stop

@section('page_script')

  <script src="{{ asset('/js/header_nav_draw.js') }}"></script>
  <script src ="{{ asset('/js/retrieve_user_data.js') }}"></script>
  <script src ="{{ asset('/js/Mixidea_event.js') }}"></script>
  
@stop
