<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'WelcomeController@index');
Route::get('home', 'MixideahomeController@home');

Route::get('/event/createEvent', 'EventController@create');
Route::get('/event/showEvent/', 'EventController@Show');

Route::get('/signin', 'AuthController@signin');


Route::get('context/main', 'MixideaContextController@main');
Route::get('context/list/keyword/{keyword}', 'MixideaContextController@keyword');
Route::get('context/list/category/{genre}', 'MixideaContextController@category');
Route::get('context/list/type/{type}', 'MixideaContextController@type');

Route::get('user/main', 'MixideaUserController@main');
Route::get('user/edit_profile', 'MixideaUserController@edit_profile');


Route::controllers([
	'auth' => 'Auth\AuthController',
	'password' => 'Auth\PasswordController',
]);