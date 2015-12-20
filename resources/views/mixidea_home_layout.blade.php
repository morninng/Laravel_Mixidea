<html>
<head>
	@yield('header_meta')
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link href="{{ asset('/css/app.css') }}" rel="stylesheet"> 
  <link href="/css/Header_nav.css" rel="stylesheet"> 
  <link href="/css/original_bootstrap.css" rel="stylesheet"> 
</head>
<body>

@include('include.config_init')

@include('include.cxense_tag')

@include('include.facebook_plug')

  <header>
    <div id="Head_Logo">Mixidea</div>
    <nav>
      <ul class="main-nav">
        <li id="nav_home"><a href="/">Home</a></li>
        <li id="nav_eventlist"><a href="/event/showEventList">Event</a></li>
        <li id="nav_mypage"><a href="/user/mypage">MyPage</a></li>

        <li id="nav_profile_pict"></li>
        <li id="nav_logout"></li>
        <li id="nav_login"></li>
      </ul>
    </nav>
  </header>

	@yield('page_context')

	<!-- Scripts -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>

  <script src="{{ asset('/js/Header_User.js') }}"></script>
	<script>
	  var header_obj = new Header_User();
	  function onloadfunc(){
	    header_obj.initialize();
	  }
	  window.onload = onloadfunc;
	</script>

	@yield('page_template')

	@yield('page_script')



</body>
</html>
