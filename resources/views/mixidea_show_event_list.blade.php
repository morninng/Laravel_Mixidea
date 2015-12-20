@extends('mixidea_home_layout')



@section('header_meta')

<link rel="stylesheet" type="text/css" href="{{ asset('/css/Mixidea_eventlist.css') }}">

@stop

@section('page_context')
 <div style="float:right; margin-right: 30px;">
 	<a class="btn btn-success" href="/event/createEvent">Create New Event</a>
 </div>
 <div id="eventlist_feed"></div>

@stop




@section('page_script')

  <script src ="{{ asset('/js/Mixidea_event_list.js') }}"></script>

@stop

