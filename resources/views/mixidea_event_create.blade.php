@extends('mixidea_home_layout')



@section('page_context')

    <style type="text/css">
    li { border-bottom:1px dashed #CCCCCC;
         margin-bottom:5px;  
       }
    </style>
 <caption><strong>Event</strong></caption>
 <form name="event_creation" enctype="multipart/form-date"> 
  <ul>
    <li><label>Event Title:&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" name="title"></li>
    <li><label>Event Description:&nbsp;&nbsp;&nbsp;&nbsp;<textarea name="description"></textarea></li>
    <li><label>date:&nbsp;&nbsp;&nbsp;&nbsp;</label><input type="date" name="date"></li>
    <li><label>time:&nbsp;&nbsp;&nbsp;&nbsp;</label><input type="time" step="1800" name="time"></li>

    <li><label>Event Type:&nbsp;&nbsp;&nbsp;&nbsp;<input type="radio" name="type" checked="checked" value="debate">debate</li>

    <li><label>Number of game:&nbsp;&nbsp;&nbsp;&nbsp;
      <select name = "number_game" id="num_game" onchange="game_number_change_form()">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>
    </li>
  </ul>
 </form>
<br>




 <span id="game_feed"></span>

  <center><input value="create event & game" type="button" onClick="create_event()"></center>


<script type="text/template" data-template="game_create_template">
 <% _.each(list, function(e,i){ %>
  <form name= '<%= e.form_id_num %>' enctype='multipart/form-date'> 
     <caption><strong>'<%= e.caption_name %>'</strong></caption>
     <li><label>genre:&nbsp;&nbsp;&nbsp;&nbsp;
       <select name = 'genre'>
         <option value='politics'>politics</option>
         <option value='economics'>economics</option>
         <option value='international_relationship'>internatilonal relationship</option>
         <option value='life_style'>Life Style</option>
         <option value='love'>Love</option>
         <option value='technology'>Technology</option>
       </select>
     </li>
     <li><label>Event Style:&nbsp;&nbsp;&nbsp;&nbsp;<input type='radio' name='style' checked='checked' value='NorthAmerica'>North America</li>
     <li><label>Event Motion(only if you can decide in advance):&nbsp;&nbsp;&nbsp;&nbsp;<input type='text' name='motion'></li>
  </form>
 <% }); %>
</script>


@stop

@section('page_script')

  <script src="https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
  <script src ="{{ asset('/js/Mixidea_event_create.js') }}"></script>
  
@stop
