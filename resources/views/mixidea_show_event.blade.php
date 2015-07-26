@extends('mixidea_home_layout')

@section('header_meta')

  <meta property="og:title" content= "{{$event_title}}"/>
  <title>Mixidea: {{$event_title}}</title>

  <link rel="stylesheet" type="text/css" href="{{ asset('/css/loading.css') }}">

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
        $round_obj = $round_array[$i];
        $game_array = $round_obj['game_array'];
        $number_of_game = count($game_array);
    ?>

  @if( $number_of_game < 2)
    <?php 
      $game_first_array = $game_array[0];
      $game_id = $game_first_array['game_ID'];
      $game_style = $game_first_array['style'];
    ?>
    @if ($i == 0)
      <li class="active"><a href="#{{$Round_name_array[$i]}}" aria-controls="{{$Round_name_array[$i]}}" data-toggle="tab" onClick="onclick_tab( '{{$game_id}}' , '{{$game_style}}'  )"> {{$Round_name_array[$i]}} Round</a></li>
    @else
      <li><a href="#{{$Round_name_array[$i]}}" aria-controls="{{$Round_name_array[$i]}}" data-toggle="tab" onClick="onclick_tab( '{{$game_id}}' , '{{$game_style}}' )"> {{$Round_name_array[$i]}} Round</a></li>
    @endif
  @else

    <li class="dropdown active">
      <a href="#" id="{{$Round_name_array[$i]}}TabDrop1" class="dropdown-toggle"  data-toggle="dropdown">{{$Round_name_array[$i]}} Round<span class="caret"></span></a>
      <ul class="dropdown-menu"  aria-labelledby="{{$Round_name_array[$i]}}TabDrop1" >

    @for ($j = 0; $j < $number_of_game; $j++)
      <?php
            $game = $game_array[$j];
            $game_id = $game['game_ID'];
            $game_type = $game['type'];
      ?>
        <li ><a href="#{{$Round_name_array[$i]}}Round_{{$Game_name_array[$j]}}" data-toggle="tab"  onClick="onclick_tab('{{$event_id}}','{{$game_id}}'">  Game A</a></li>
    @endfor

  @endif

@endfor
</ul>  


<!-- /********** main contents under tab pane  ******/ -->


  <div class="tab-content">



@for ($i = 0; $i < count($event_hierarchy['round_array']); $i++)
  <?php 
        $round_array =  $event_hierarchy['round_array'];
        $round_obj = $round_array[$i];
        $game_array = $round_obj['game_array'];
        $number_of_game = count($game_array);
    ?>

  @if( $number_of_game < 2)

   <?php
    $game_first_array = $game_array[0];
    $game_id = $game_first_array['game_ID'];
    $game_style = $game_first_array['style'];
  ?>
    @if($i==0)
<div role="tabpanel" class="tab-pane active" id="{{$Round_name_array[$i]}}">
    @else
<div role="tabpanel" class="tab-pane" id="{{$Round_name_array[$i]}}">
    @endif

  <div id="game_container_{{$game_id}}">

    <p><h3>motion: <span id="game_motion"></span></h3></p><br>
    <div align="center" class="hangout_container"></div>
    <p><font color="green"><h4>Debater Participant</h4></font></p>
    <center><span id="hangout_area"></span></center>
    <div class="participant_table"></div>

    <p><font color="green"><h4>Adjucator/Audience Participant</h4></font></p>
    <div class="audience_list"></div>

  </div>
</div>

  @else

    @for ($j = 0; $j < $number_of_game; $j++)

   <?php
      $game = $game_array[$j];
      $game_id = $game['game_ID'];
      $game_style = $game['style'];
   ?>
<div role="tabpanel" class="tab-pane" id="{{$Round_name_array[$i]}}Round_{{$Game_name_array[$j]}}">
  <div id="game_container_{{$game_id}}">
    <p> <h3>motion: <span id="game_motion"></span></h3></p><br>
     <div align="center" class="hangout_container"></div>
    <p><font color="green"><h4>Debater Participant</h4></font></p>
    <center><span id="hangout_area"></span></center>
    <div class="participant_table"></div>

    <p><font color="green"><h4>Adjucator/Audience Participant</h4></font></p>
    <div class="audience_list"></div>
  </div>
</div>

    @endfor
  @endif
@endfor

  </div>
</div>

@stop




@section('page_template')




<script type="text/html" id="role_status_template">
  <div data-bind= "visible:participant_visible">
     <div class='role'>
       <p><font-weight: bol> <span data-bind ="text:role_name"> </span> </font-weight></p>
     </div>
     <div class="user_container" data-bind="visible: user_visible">
        <div class="image_container" style="float:left; margin-left:5px;">
          <img data-bind="attr: {src: pict_src}">
        </div>
        <div class="profile_container"  style="float:left; margin-left:10px;">
          <div data-bind ="text:user_name"></div>
          <p data-bind = "text:user_profile_belonging"></p>
          <p data-bind = "text:user_profile_intro"></p> 
        </div>
     </div>
     <div class="button-container" data-bind="visible:participant_button_visible">
        <div class='event_button' style='float:right;margin-right:5px; margin-left:5px;'>
            <div data-bind="visible:cancel_game_visible">
              <button class='btn btn-inverse cancel_button' data-bind = "click:Cancel_Game" >
                <i class="glyphicon glyphicon-book"></i> Cancel
              </button>
            </div>
            <div data-bind="visible:join_game_visible">
              <button class='btn btn-primary participate_button' data-bind = "click:Join_Game_trigger"  >
                <i class="glyphicon glyphicon-book"></i> Join
              </button>
            </div>
        </div>
      </div>
      <div style='clear:both'>
      </div>
      <div align='center' data-bind="visible:user_dialog_visible">
        <div data-bind="visible:profile_input_visible">
          <div style="border: 1px solid;">
              <form>
                  <p align="left">
                    Nationaltity: 
                    <select data-bind="options:availableCountries, selectedOptions:chosenCountries "></select>
                  </p>
                  <p align="left">
                    Belongings:
                    <input type="text" data-bind="textInput:user_profile_belonging"></input>
                  </p>
                  <p align="left">
                    self introduction:
                    <textarea data-bind="textInput:user_profile_introduction"></textarea>
                  </p>
                  <p align="center">
                    <button data-bind="click: click_input_profile">next</button>
                    <button data-bind="click: click_cancel_joining">cancel</button>
                  </p>
              </form>
          </div>
        </div>

        <div data-bind="visible:profile_confirm_visible">
          <div style="border: 1px solid;">
              <form>
                  <p align="left">
                    Nationaltity: 
                    <span data-bind="text:user_nationality"></span>
                  </p>
                  <p align="left">
                    Belongings:
                    <span data-bind="text:user_profile_belonging"></span>
                  </p>
                  <p align="left">
                    self introduction:
                    <span data-bind="textInput:user_profile_introduction"></span>
                  </p>
                  <p align="center">
                    <button data-bind="click: click_goto_declaration">next</button>
                    <button data-bind="click: click_cancel_joining">cancel</button>
                  </p>
              </form>
          </div>
        </div>

        <div data-bind="visible: user_declaration_visible">
          <div style="border: 1px solid;">
            <form>
              <p align="left"><input type="checkbox" value="use_pc" data-bind="checked:declaration_check, click:declaration_check_click ">You need to use Desktop or Laptop to join game</p>
              <p align="left"><input type="checkbox" value="join_on_time" data-bind="checked:declaration_check, click:declaration_check_click ">You should join at this timing, if you cannot you need to cancel in advance</p>
              <p align="left"><input type="checkbox" value="share_experience" data-bind="checked:declaration_check, click:declaration_check_click">You should summerize what is discussed after the game </p>
              <p align="left"><input type="checkbox" value="use_chrome" data-bind="checked:declaration_check, click:declaration_check_click">Chrome browser is better for qualified condition </p>
              <p align="center">
                    <button class="btn btn-inverse" data-bind="click: click_cancel_joining">cancel</button>
                    <button data-bind="visible:before_declaration_visible" disabled class="btn btn-primary">Join</button>
                    <button class="btn btn-primary" data-bind="click: click_confirm_join , visible:after_declaration_visible">Join confirm<i class="glyphicon glyphicon-book"></i></button>
              </p>
            </form>
          <div>
        </div>
      </div>
      <div style="clear:both" class='loader' align="center" data-bind = "visible:loading_visible"> Loading </div>
</script>


<script type="text/template" data-template="audience_list_template">
 <% _.each(list, function(e,i){ %>
  <div id= '<%= e.container_name %>'data-bind="template:{name:'role_status_template'}" style="float:left;"></div>
 <% }); %>
</script>

<script type="text/template" data-template="NA_Template">
  <table class='table table-bordered'>
   <thead><tr><th>Government</th><th>Opposition</th></tr></thead>
   <tbody>
   <tr><td><div id='PM_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td>
       <td><div id='LO_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td></tr>
   <tr><td><div id='MG_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td>
       <td><div id='MO_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td></tr>
   <tr><td><div id='PMR_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td>
       <td><div id='LOR_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td></tr>
   </tbody>
  </table>
</script>


<script type="text/template" data-template="Asian_Template">
  <table class='table table-bordered'>
   <thead><tr><th>Proposition</th><th>Opposition</th></tr></thead>
   <tbody>
   <tr><td><div id='PM_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td>
       <td><div id='LO_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td></tr>
   <tr><td><div id='DPM_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td>
       <td><div id='DLO_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td></tr>
   <tr><td><div id='GW_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td>
       <td><div id='OW_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td></tr>
   <tr><td><div id='GR_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td>
        <td><div id='OR_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td></tr>
   </tbody>
  </table>
</script>

<script type="text/template" data-template="BP_Template">
  <table class='table table-bordered'>
   <thead><tr><th>OpeningGovernment</th><th>OpeningOpposition</th></tr></thead>
   <tbody>
   <tr><td><div id='PM_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td>
       <td><div id='LO_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td></tr>
   <tr><td><div id='DPM_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td>
       <td><div id='DLO_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td></tr>
   </tbody>
   <thead><tr><th>ClosintGovernment</th><th>ClosingOpposition</th></tr></thead>
   <tbody>
   <tr><td><div id='MG_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td>
       <td><div id='MO_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td></tr>
   <tr><td><div id='GW_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td>
       <td><div id='OW_Container_<%= game_id %>' data-bind="template: {name: 'role_status_template'}"></div></td></tr>
   </tbody>
  </table>
</script>


<script type = "text/template" data-template="Hangout_button_Template">

  <a class='event_hangout_button' style='text-decoration:none;' href='<%= hangout_link %>' >
    <img src='https://ssl.gstatic.com/s2/oz/images/stars/hangout/1/gplus-hangout-60x230-normal.png' alt='Start a Hangout' style='border:0;width:230px;height:60px;'/>
  </a>

</script>



@stop



@section('page_script')

<?php  $number_of_game = count($game_array); ?>

<?php
  $round_array =  $event_hierarchy['round_array'];
  $round_obj = $round_array[0];
  $game_array = $round_obj['game_array'];
  $game_first_array = $game_array[0];
  $initial_game_id = $game_first_array['game_ID'];
  $initial_game_style = $game_first_array['style'];
?>

<script>

  var first_game_id="{{ $initial_game_id }}";
  var first_game_style = "{{ $initial_game_style }}";

</script>

  <script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/knockout/3.3.0/knockout-min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script src="{{ asset('/js/header_nav_draw.js') }}"></script>
  <script src ="{{ asset('/js/ShowEvent/RoleStatus.js') }}"></script>
  <script src ="{{ asset('/js/ShowEvent/ParticipantMgr.js') }}"></script>
  <script src="{{ asset('/js/ShowEvent/GameFrame.js') }}"></script>
  <script src ="{{ asset('/js/ShowEvent/MixideaShowEvent.js') }}"></script>



@stop

