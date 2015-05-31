@extends('mixidea_home_layout')



@section('page_context')
<div class="container">
 <div class="col-sm-3 hidden-xs" id="left_panel">
   profile
 </div>
 <div class="col-sm-6 col-xs-12" id="center_context">
   <div id="own_event_list">
    event you are plannning to join
    <span id="my_event_list"></span>
   </div>
   <div id="past_activity">
     <span id="activity_list">
   </div>
 </div>
 <div class="col-sm-3 hidden-xs" >
  ad space
 </div>
</div>


@stop

@section('page_script')

  <script src ="{{ asset('/js/Mixidea_mypage.js') }}"></script>
  <script>
   new ShowEvent()
  </script>
@stop
