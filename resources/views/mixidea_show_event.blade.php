@extends('mixidea_home_layout')

@section('header_meta')

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

    <p><font color="green"><h4>Debater Participant</h4></font></p>
    <center><span id="hangout_area"></span></center>
    <div class="participant_table"></div>

    <p><font color="green"><h4>Adjucator/Audience Participant</h4></font></p>
    <div class="audience_table"></div>

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

    <p><font color="green"><h4>Debater Participant</h4></font></p>
    <center><span id="hangout_area"></span></center>
    <div class="participant_table"></div>

    <p><font color="green"><h4>Adjucator/Audience Participant</h4></font></p>
    <div class="audience_table"></div>
  </div>
</div>

    @endfor
  @endif
@endfor

  </div>
</div>

@stop




@section('page_template')

<script type = "text/template" data-template="Other_ParticipantApplied_Template">

  <div class='role'> <p><font-weight: bol> <%= usr_info.role_name  %> </font-weight></p></div>
  <div class='participant' style='float:left;'>
      <div class="image_container" style="float:left; margin-left:5px;">
        <img src="<%=usr_info.picture_src %>">
      </div>
     <div class="profile_container" style="float:left; margin-left:10px;">
      <%= usr_info.first_name %>  &nbsp;  <%= usr_info.last_name  %> 
      </div>
   </div>
</script>



<script type = "text/template" data-template="Other_Audience_Applied_Template">
  <div style='border:1px solid; float:left;'>
    <p>Audience</p>
    <div class='participant' style='float:left;'>
      <div class="image_container" style="float:left; margin-left:5px;">
        <img src="<%=usr_info.picture_src %>">
      </div>
      <div class="profile_container" style="float:left; margin-left:10px;">
        <%=  usr_info.first_name  %>  &nbsp;<%=  usr_info.last_name %> 
      </div>
    </div>
    <div class='comment' align='center' style='clear:both'><font color="red">&nbsp;&nbsp;</font></div>
  </div>
</script>



<script type = "text/template" data-template="CurrentUserApplied_Audience_Template">
  <div style='border:1px solid; float:left;'>
    <p>Audience</p>
    <div class='participant' style='float:left;'>
      <div class="image_container" style="float:left; margin-left:5px;">
        <img src="<%=usr_info.picture_src %>">
      </div>
      <div class="profile_container" style="float:left; margin-left:10px;">
        <%=  usr_info.first_name  %>  &nbsp;<%=  usr_info.last_name %> 
      </div>
    </div>
    <div class='event_button' style='float:left;margin-right:5px; margin-left:5px;'>
        <button class='btn btn-inverse cancel_audience_button' data-role= <%= usr_info.role_name  %> >
          <i class="glyphicon glyphicon-book"></i> Cancel
        </button>
    </div>
    <div class='comment' align='center' style='clear:both'><font color="red">You have joined</font></div>
  </div>
</script>



<script type = "text/template" data-template="CurrentUserApplied_Template">
  <div class='role'> <p><font-weight: bol> <%= usr_info.role_name %> </font-weight></p></div>
  <div class='participant' style='float:left;'>
    <div class="image_container" style="float:left; margin-left:5px;">
      <img src="<%=usr_info.picture_src %>">
    </div>
    <div class="profile_container" style="float:left; margin-left:10px;">
      <%=  usr_info.first_name  %>  &nbsp;<%=  usr_info.last_name %> 
    </div>
  </div>
  <div class='event_button' style='float:right;margin-right:5px; margin-left:5px;'>
      <button class='btn btn-inverse cancel_button' data-role= <%= usr_info.role_name  %> >
        <i class="glyphicon glyphicon-book"></i> Cancel
      </button>
  </div>
  <div class='comment' align='center' style='clear:both'><font color="red">You have joined</font></div>
</script>





<script type="text/template" data-template="NoApplicant_Template">
  <div class='role'> <p><font-weight: bol> <%= role_name %> </font-weight></p></div>
  <div class='event_button' style='float:right;margin-right:5px; margin-left:5px;'>
      <button class='btn btn-primary participate_button' data-role= <%= role_name %> >
        <i class="glyphicon glyphicon-book"></i> Join
      </button>
  </div>
  <div class='comment' style='clear:both'></div>
</script>


<script type="text/template" data-template="NA_Template">
  <table class='table table-bordered'>
   <thead><tr><th>Government</th><th>Opposition</th></tr></thead>
   <tbody>
   <tr><td><div class='PM_Container'></div></td><td><div class='LO_Container'></div></td></tr>
   <tr><td><div class='MG_Container'></div></td><td><div class='MO_Container'></div></td></tr>
   <tr><td><div class='PMR_Container'></div></td><td><div class='LOR_Container'></div></td></tr>
   </tbody>
  </table>
</script>


<script type="text/template" data-template="Asian_Template">
  <table class='table table-bordered'>
   <thead><tr><th>Proposition</th><th>Opposition</th></tr></thead>
   <tbody>
   <tr><td><div class='PM_Container'></div></td><td><div class='LO_Container'></div></td></tr>
   <tr><td><div class='DPM_Container'></div></td><td><div class='DLO_Container'></div></td></tr>
   <tr><td><div class='GW_Container'></div></td><td><div class='OW_Container'></div></td></tr>
   <tr><td><div class='GR_Container'></div></td><td><div class='OR_Container'></div></td></tr>
   </tbody>
  </table>
</script>

<script type="text/template" data-template="BP_Template">
  <table class='table table-bordered'>
   <thead><tr><th>OpeningGovernment</th><th>OpeningOpposition</th></tr></thead>
   <tbody>
   <tr><td><div class='PM_Container'></div></td><td><div class='LO_Container'></div></td></tr>
   <tr><td><div class='DPM_Container'></div></td><td><div class='DLO_Container'></div></td></tr>
   </tbody>
   <thead><tr><th>ClosintGovernment</th><th>ClosingOpposition</th></tr></thead>
   <tbody>
   <tr><td><div class='MG_Container'></div></td><td><div class='MO_Container'></div></td></tr>
   <tr><td><div class='GW_Container'></div></td><td><div class='OW_Container'></div></td></tr>
   </tbody>
  </table>
</script>



@stop



@section('page_script')


  <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script src="{{ asset('/js/header_nav_draw.js') }}"></script>
  <script src ="{{ asset('/js/Mixidea_ShowEvent.js') }}"></script>

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
  var game_participate_object_{{ $initial_game_id }} = new ShowEvent( "{{ $initial_game_id }}", "{{ $initial_game_style }}" );
 

  function onclick_tab(game_id, game_style){


    if( eval("typeof game_participate_object_" + game_id) == 'undefined') {
      eval("game_participate_object_" + game_id + " = new ShowEvent('" + game_id + "','" + game_style + "');");
    }else{
      eval("game_participate_object_" + game_id + ".update_game_info('" + game_id + "','" +game_style + "');");
    }

  }

</script>

@stop

