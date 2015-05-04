<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Mixidea</title>

	<link href="{{ asset('/css/app.css') }}" rel="stylesheet"> 
	<link href='//fonts.googleapis.com/css?family=Roboto:400,300' rel='stylesheet' type='text/css'>

</head>
<body>

	@yield('config_init')
	@yield('cxense_init')



	<nav class="navbar navbar-default">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle Navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">Mixidea</a>
			</div>

			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li><a href="{{ url('/') }}">Home</a></li>
					<li><a href="{{ url('/') }}">Event</a></li>
					<li><span id="Mypage"></span></li>
				</ul>

				<ul class="nav navbar-nav navbar-right">
						<li><span id="profile_pict"></span></li>
						<li><span id="mixidea_remark"></span></li>
						<li><span id="login"></span></li>
				</ul>
			</div>
		</div>
	</nav>


	<!-- Scripts -->
	<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.1/js/bootstrap.min.js"></script>


	@yield('page_script')



</body>
</html>
