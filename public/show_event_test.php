

{"round_array":
  [
    {"game_array":
      [
       {"game_ID":"hGHYqpZ321","type":"NorthAmerica"}
      ],
     "round_ID":"MFyjJ0frFG"
    }
  ]
 }



<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap-theme.min.css">

<script>
function onclick_tab(event_id, round_id, game_id){
  console.log(event_id);
  console.log(round_id);
  console.log(game_id);
}
 window.onload=onclick_tab('1234','5678','9101112');

</script>

 b
<div role="tabpanel">

  <!-- Nav tabs -->
  <ul class="nav nav-tabs" role="tablist">
    <li  ><a href="#FirstRound" aria-controls="FirstRound" data-toggle="tab" onClick="onclick_tab('1111','5678','9101112')">FirstRound</a></li>
    <li ><a href="#SecondRound" aria-controls="SecondRound"  data-toggle="tab" onClick="onclick_tab('1fff','de','9abc')">SecondRound</a></li>
    <li class="dropdown active">
      <a href="#" id="ThirdTabDrop1" class="dropdown-toggle"  data-toggle="dropdown">Third Round<span class="caret"></span></a>
      <ul class="dropdown-menu"  aria-labelledby="ThirdTabDrop1" >
        <li ><a href="#ThirdRound_1stGame"    data-toggle="tab"  onClick="onclick_tab('','','')">  Game A</a></li>
        <li  class="active"><a href="#ThirdRound_2ndGame"  data-toggle="tab"  onClick="onclick_tab('aa','bb','cc')"> Game B</a></li>
      </ul>  
    </li>
  </ul>

  <!-- Tab panes -->
  <div class="tab-content">
    <div role="tabpanel" class="tab-pane" id="FirstRound">1st Game Context</div>
    <div role="tabpanel" class="tab-pane active" id="SecondRound">2nd Game Context</div>
    <div role="tabpanel" class="tab-pane" id="ThirdRound_1stGame" >DDD</div>
    <div role="tabpanel" class="tab-pane" id="ThirdRound_2ndGame" >EEE</div>
  </div>
</div>

<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>



http://getbootstrap.com/javascript/