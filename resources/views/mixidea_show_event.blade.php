@extends('mixidea_home_layout')

@section('header_meta')
  <meta name ="genres" content= "{{$event_genres}}"/>
  <meta property="og:title" content= "{{$event_title}}"/>
  <title>Mixidea: {{$event_title}}</title>
@stop


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
 
<?php $Round_name_array = ["First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Ninth"]; 
 $Game_name_array = ["Game_A","Game_B","Game_C","Game_D","Game_E","Game_F","Game_G","Game_H","Game_I","Game_J","Game_K","Game_L","Game_M","Game_N","Game_O","Game_P","Game_Q","Game_R","Game_S","Game_T","Game_U","Game_V","Game_W","Game_X","Game_Y","Game_Z"];
 ?>

<div role="tabpanel">
  <ul class="nav nav-tabs" role="tablist">
 
@for ($i = 0; $i < count($event_hierarchy['round_array']); $i++)
  <?php 
        echo "number of event ".$i . "<br>";  
        $round_array =  $event_hierarchy['round_array'];
        $game_obj = $round_array[$i];
        $game_array = $game_obj['game_array'];
        $number_of_game = count($game_array);
        echo "game array count" . $number_of_game . "<br>";
    ?>

  @if( $number_of_game < 2)
    <?php 
      echo "count is smaller than 1 <br>";
      $game_first_array = $game_array[0];
      $game_id = $game_first_array['game_ID'];
      $game_type = $game_first_array['type'];
    ?>
      <li class="active"><a href="#{{$Round_name_array[$i]}}" aria-controls="{{$Round_name_array[$i]}}" data-toggle="tab" onClick="onclick_tab( {{$event_id}},{{$game_id}} )">FirstRound</a></li>
  @else
    <?php 
      echo "count is larger than 1 <br>"; ?>
    <li class="dropdown active">
      <a href="#" id="{{$Round_name_array[$i]}}TabDrop1" class="dropdown-toggle"  data-toggle="dropdown">{{$Round_name_array[$i]}} Round<span class="caret"></span></a>
      <ul class="dropdown-menu"  aria-labelledby="{{$Round_name_array[$i]}}TabDrop1" >

    @for ($j = 0; $j < $number_of_game; $j++)
      <?php
            $game = $game_array[$j];
            $game_id = $game['game_ID'];
            $game_type = $game['type'];
            echo $game_type;
            echo "number of games j" .  $j . "<br>";
            echo "number of games " . $number_of_game;
      ?>
        <li ><a href="#{{$Round_name_array[$i]}}Round_{{$Game_name_array[$j]}}" data-toggle="tab"  onClick="onclick_tab('{{$event_id}}','{{$game_id}}'">  Game A</a></li>
    @endfor

  @endif

@endfor
</ul>  

@stop

@section('page_script')

  <script src="{{ asset('/js/header_nav_draw.js') }}"></script>
  <script src ="{{ asset('/js/retrieve_user_data.js') }}"></script>
  <script src ="{{ asset('/js/Mixidea_event.js') }}"></script>
  
@stop

