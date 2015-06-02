@extends('mixidea_home_layout')

@section('header_meta')
  <meta name ="genres" content= "{{$event_genres}}"/>
  <meta property="og:title" content= "{{$event_title}}"/>
  <title>Mixidea: {{$event_title}}</title>
@stop



@section('page_context')
 
<?php $Round_name_array = ["First","Second","Third","Fourth","Fifth","Sixth","Seventh","Eighth","Ninth"]; 
 $Game_name_array = ["Game_A","Game_B","Game_C","Game_D","Game_E","Game_F","Game_G","Game_H","Game_I","Game_J","Game_K","Game_L","Game_M","Game_N","Game_O","Game_P","Game_Q","Game_R","Game_S","Game_T","Game_U","Game_V","Game_W","Game_X","Game_Y","Game_Z"];
 ?>





    <h2>event title: {{$event_title}}</h2>
    <h4>description: {{$event_description}}</h4>
    <h4>date & time: <span id="event_datetime"></span></h4>




<!-- /**********tab panel for game  info***********/ -->

<div role="tabpanel">
  <ul class="nav nav-tabs" role="tablist">
 
@for ($i = 0; $i < count($event_hierarchy['round_array']); $i++)
  <?php 
        $round_array =  $event_hierarchy['round_array'];
        $game_obj = $round_array[$i];
        $game_array = $game_obj['game_array'];
        $number_of_game = count($game_array);
    ?>

  @if( $number_of_game < 2)
    <?php 
      $game_first_array = $game_array[0];
      $game_id = $game_first_array['game_ID'];
      $game_type = $game_first_array['type'];
    ?>
      <li class="active"><a href="#{{$Round_name_array[$i]}}" aria-controls="{{$Round_name_array[$i]}}" data-toggle="tab" onClick="onclick_tab( {{$event_id}},{{$game_id}} )">FirstRound</a></li>
  @else

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


<!-- /********** main contents under tab pane  ******/ -->



  <div class="tab-content">



@for ($i = 0; $i < count($event_hierarchy['round_array']); $i++)
  @if( $number_of_game < 2)

   <?php
    $game_first_array = $game_array[0];
    $game_id = $game_first_array['game_ID'];
    $game_type = $game_first_array['type'];
  ?>

<div role="tabpanel" class="tab-pane active" id="{{$Round_name_array[$i]}}">
  <div id="game_container_{{$game_id}}">

    <p><h3>motion: <span id="game_motion"></span></h3></p><br>
    <center><span id="hangout_area"></span></center>
    <div class="participant_table">

    </div>
  </div>
</div>

  @else

    @for ($j = 0; $j < $number_of_game; $j++)

   <?php
      $game = $game_array[$j];
      $game_id = $game['game_ID'];
      $game_type = $game['type'];
   ?>
<div role="tabpanel" class="tab-pane" id="{{$Round_name_array[$i]}}Round_{{$Game_name_array[$j]}}">
  <div id="game_container_{{$game_id}}">
    <p> <h3>motion: <span id="game_motion"></span></h3></p><br>
    <center><span id="hangout_area"></span></center>
    <div class="participant_table">
   </div>
  </div>
</div>

    @endfor
  @endif
@endfor

  </div>
</div>

@stop




@section('page_script')

  <script src="{{ asset('/js/header_nav_draw.js') }}"></script>
  <script src ="{{ asset('/js/retrieve_user_data.js') }}"></script>
  <script src ="{{ asset('/js/Mixidea_event.js') }}"></script>
  

  <script src ="{{ asset('/js/Mixidea_ShowEvent.js') }}"></script>
<?php
  $game_first_array = $game_array[0];
  $initial_game_id = $game_first_array['game_ID'];
  $initial_game_type = $game_first_array['type'];
?>
<script>
 new ShowEvent( "{{ $initial_game_id }}", "{{ $initial_game_type }}" );
</script>

@stop

