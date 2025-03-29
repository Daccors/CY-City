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
use App\Http\Controllers\Api\CreateTableController;
use App\Http\Controllers\Api\DynamicTableController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/

Route::get('/allTables', function () {
    return [
        'users' => \App\Models\User::all(),
        'actions' => \App\Models\Action::all(),
        'addresses' => \App\Models\Address::all(),
        'articles' => \App\Models\Article::all(),
        'bikes' => \App\Models\Bike::all(),
        'connections' => \App\Models\Connection::all() ?? [],
        'consults' => \App\Models\Consult::all() ?? [],
        'deliveringDrones' => \App\Models\DeliveringDrone::all(),
        'havings' => \App\Models\Having::all(),
        'informationScreens' => \App\Models\InformationScreen::all(),
        'levels' => \App\Models\Level::all(),
        'localisations' => \App\Models\Localisation::all(),
        'modifies' => \App\Models\Modify::all() ?? [],
        'parkingSensors' => \App\Models\ParkingSensor::all(),
        'smartBins' => \App\Models\SmartBin::all(),
        'smartLamps' => \App\Models\SmartLamp::all(),
    ];
});

Route::get('/allTables/objects', function () {
    return [
        'bikes' => \App\Models\Bike::all(),
        'deliveringDrones' => \App\Models\DeliveringDrone::all(),
        'informationScreens' => \App\Models\InformationScreen::all(),
        'parkingSensors' => \App\Models\ParkingSensor::all(),
        'smartBins' => \App\Models\SmartBin::all(),
        'smartLamps' => \App\Models\SmartLamp::all(),
    ];
});

Route::prefix('allTables')->group(function () {
    Route::apiResource('user', UserController::class);
    Route::apiResource('action', ActionController::class);
    Route::apiResource('address', AddressController::class);
    Route::apiResource('article', ArticleController::class);
    Route::apiResource('having', HavingController::class);
    Route::apiResource('level', LevelController::class);
    Route::apiResource('localisation', LocalisationController::class);
    Route::apiResource('modify', ModifyController::class);
    
    Route::prefix('objects')->group(function () {
        Route::apiResource('bike', BikeController::class);
        Route::apiResource('drone', DeliveringDroneController::class);
        Route::apiResource('screen', InformationScreenController::class);
        Route::apiResource('parking', ParkingSensorController::class);
        Route::apiResource('bin', SmartBinController::class);
        Route::apiResource('lamp', SmartLampController::class);
        
        Route::post('createTable', [CreateTableController::class, 'createTable']);
    });
});

Route::get('allTables/objects/{table}/{id}', [DynamicTableController::class, 'show']);
Route::post('allTables/objects/{table}', [DynamicTableController::class, 'store']);
Route::put('allTables/objects/{table}/{id}', [DynamicTableController::class, 'update']);
Route::delete('allTables/objects/{table}/{id}', [DynamicTableController::class, 'destroy']);
Route::get('allTables/objects/{table}', [DynamicTableController::class, 'index']);