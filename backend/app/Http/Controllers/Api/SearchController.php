<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SearchController extends Controller
{
    public function search(Request $request){
        $searchTerm = $request->input('string');
        $objectsSearch = Str::contains($request->path(), 'objects/search');
        
        if (empty($searchTerm)){
            return response()->json(['message' => 'Search term is required'], 400);
        }
        
        $results = [];
        
        $tables = collect(DB::select("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"))
            ->pluck('name')
            ->all();
            
        $ignoreTables = [
            'migrations', 'failed_jobs', 'password_resets', 'personal_access_tokens',
            'connections', 'levels', 'modifies', 'actions', 'consults', 'havings'
        ];

        if ($objectsSearch) {
            $nonObjects = ['users', 'addresses', 'articles', 'localisations'];
            $ignoreTables = array_merge($ignoreTables, $nonObjects);
        }
        
        $excludeFields = ['password', 'created_at', 'updated_at', 'content', 'description', 'remember_token'];
        
        foreach ($tables as $table) {
            if (in_array($table, $ignoreTables)){
                continue;
            }
            
            if (Str::contains($table, $searchTerm)){
                $modelName = Str::studly(Str::singular($table));
                $modelClass = "App\\Models\\{$modelName}";
                
                if (class_exists($modelClass)) {
                    $tableData = $modelClass::all();
                    $filteredData = $tableData->map(function ($item) use ($excludeFields){
                        return collect($item)->except($excludeFields);
                    });
                    
                    $results[$table] = $filteredData;
                }
                continue;
            }
            $columns = Schema::getColumnListing($table);
            $query = DB::table($table);
            $whereAdded = false;
            
            foreach ($columns as $column){
                if (in_array($column, $excludeFields)){
                    continue;
                }
                if (!$whereAdded){
                    $query->where($column, 'LIKE', "%{$searchTerm}%");
                    $whereAdded = true;
                } else {
                    $query->orWhere($column, 'LIKE', "%{$searchTerm}%");
                }
            }
            
            if ($whereAdded){
                $matches = $query->get();
                
                if ($matches->count() > 0){
                    $filteredMatches = $matches->map(function ($item) use ($excludeFields){
                        return collect((array)$item)->except($excludeFields);
                    });
                    
                    $formattedTableName = Str::camel($table);
                    $results[$formattedTableName] = $filteredMatches;
                }
            }
        }
        
        return response()->json($results);
    }
}