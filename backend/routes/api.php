<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\ActionController;
use App\Http\Controllers\Api\AddressController;
use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\BikeController;
use App\Http\Controllers\Api\ConnectionController;
use App\Http\Controllers\Api\ConsultController;
use App\Http\Controllers\Api\DeliveringDroneController;
use App\Http\Controllers\Api\HavingController;
use App\Http\Controllers\Api\InformationScreenController;
use App\Http\Controllers\Api\LevelController;
use App\Http\Controllers\Api\LocalisationController;
use App\Http\Controllers\Api\ModifyController;
use App\Http\Controllers\Api\ParkingSensorController;
use App\Http\Controllers\Api\SmartBinController;
use App\Http\Controllers\Api\SmartLampController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/

Route::apiResource('user', UserController::class);
Route::apiResource('action', ActionController::class);
Route::apiResource('address', AddressController::class);
Route::apiResource('bike', BikeController::class);
Route::apiResource('drone', DeliveringDroneController::class);
Route::apiResource('having', HavingController::class);
Route::apiResource('screen', InformationScreenController::class);
Route::apiResource('level', LevelController::class);
Route::apiResource('localisation', localisationController::class);
Route::apiResource('modify', ModifyController::class);
Route::apiResource('parking', ParkingSensorController::class);
Route::apiResource('bin', SmartBinController::class);
Route::apiResource('lamp', SmartLampController::class);