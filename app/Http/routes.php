<?php

Route::get('/', 'WelcomeController@index');
Route::get('home', 'MixideahomeController@home');

Route::get('/event/createEvent', 'MixideaEventController@create');
Route::get('/event/showEvent/{event_id}', 'MixideaEventController@ShowEvent');
Route::get('/event/showEventList/', 'MixideaEventController@ShowEventList');



Route::get('/mypage', 'MixideaMypageController@index');

Route::get('/signin', 'AuthController@signin');


Route::get('context/main', 'MixideaContextController@main');
Route::get('context/list/keyword/{keyword}', 'MixideaContextController@keyword');
Route::get('context/list/category/{genre}', 'MixideaContextController@category');
Route::get('context/list/type/{type}', 'MixideaContextController@type');
Route::get('context/show/{game_id}', 'MixideaContextController@keyword');

Route::get('user/main', 'MixideaUserController@main');
Route::get('user/edit_profile', 'MixideaUserController@edit_profile');


Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);
