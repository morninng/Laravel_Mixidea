@extends('mixidea_home_layout')



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

  <script src ="{{ asset('/js/Mixidea_event.js') }}"></script>
  
@stop
