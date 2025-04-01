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
use App\Http\Controllers\Api\TableMetaDataController;
use App\Http\Controllers\Api\SearchController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');*/

Route::get('/allTables/objects', function (){
    $result = [
        'bikes' => \App\Models\Bike::all(),
        'deliveringDrones' => \App\Models\DeliveringDrone::all(),
        'informationScreens' => \App\Models\InformationScreen::all(),
        'parkingSensors' => \App\Models\ParkingSensor::all(),
        'smartBins' => \App\Models\SmartBin::all(),
        'smartLamps' => \App\Models\SmartLamp::all(),
    ];
    
    $tables = [];
    
    $tables = collect(\DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"))
            ->pluck('name')
            ->all();

    $ignoreTables = [
        'migrations', 'failed_jobs', 'password_resets', 'personal_access_tokens',
        'users', 'actions', 'addresses', 'articles', 'bikes', 'connections', 'consults',
        'delivering_drones', 'havings', 'information_screens', 'levels', 'localisations',
        'modifies', 'parking_sensors', 'smart_bins', 'smart_lamps'
    ];
    
    foreach ($tables as $table) {
        if (in_array($table, $ignoreTables)){
            continue;
        }
        
        $modelName = \Illuminate\Support\Str::studly(\Illuminate\Support\Str::singular($table));
        $modelClass = "App\\Models\\{$modelName}";
        
        if (class_exists($modelClass)) {
            $key = \Illuminate\Support\Str::camel($table);
            try {
                $result[$key] = $modelClass::all();
            } catch (\Exception $e) {
                $result[$key] = ["error" => "Erreur lors du chargement des données: " . $e->getMessage()];
            }
        }
    }
    return $result;
});

Route::prefix('allTables')->group(function (){

    Route::get('search', [SearchController::class, 'search']);
    Route::get('users/search', [SearchController::class, 'search']);
    Route::get('articles/search', [SearchController::class, 'search']);

    Route::apiResource('users', UserController::class);
    Route::apiResource('action', ActionController::class);
    Route::apiResource('address', AddressController::class);
    Route::apiResource('articles', ArticleController::class);
    Route::apiResource('having', HavingController::class);
    Route::apiResource('level', LevelController::class);
    Route::apiResource('localisation', LocalisationController::class);
    Route::apiResource('modify', ModifyController::class);
    
    Route::prefix('objects')->group(function (){
        Route::apiResource('bike', BikeController::class);
        Route::apiResource('drone', DeliveringDroneController::class);
        Route::apiResource('screen', InformationScreenController::class);
        Route::apiResource('parking', ParkingSensorController::class);
        Route::apiResource('bin', SmartBinController::class);
        Route::apiResource('lamp', SmartLampController::class);
        
        Route::post('createTable', [CreateTableController::class, 'createTable']);

        Route::get('search', [SearchController::class, 'search']);
        
        Route::get('{table}', [DynamicTableController::class, 'index']);
        Route::post('{table}', [DynamicTableController::class, 'store']);
        Route::get('{table}/{id}', [DynamicTableController::class, 'show']);
        Route::put('{table}/{id}', [DynamicTableController::class, 'update']);
        Route::delete('{table}/{id}', [DynamicTableController::class, 'destroy']);
    });
});

Route::apiResource('data', TableMetaDataController::class);