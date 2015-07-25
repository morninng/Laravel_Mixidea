
// window.onloadで初めのタブの情報を読み出し
  init();

  function init(){
  
	eval("game_frame_object_" + first_game_id + " = new GameFrame('" + first_game_id + "','" + first_game_style + "');");
	eval("game_frame_object_" + first_game_id + ".initialize();");
	eval("game_frame_object_" + first_game_id + ".update_game_info();");
  }

// タブをクリックしたときに呼ばれる関数

  function onclick_tab(game_id, game_style){

    if( eval("typeof game_frame_object_" + game_id) == 'undefined') {
      eval("game_frame_object_" + game_id + " = new GameFrame('" + game_id + "','" + game_style + "');");
      eval("game_frame_object_" + game_id + ".initialize();");
      eval("game_frame_object_" + game_id + ".update_game_info();");
    }
//    eval("game_participate_object_" + game_id + ".update_game_info();");

  }


