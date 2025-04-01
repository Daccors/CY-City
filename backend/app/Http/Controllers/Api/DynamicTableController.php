<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Eloquent\Model;

class DynamicTableController extends Controller
{
    public function index($table)
    {
        if (!Schema::hasTable($table)) {
            return response()->json(['message' => 'Table not found'], 404);
        }

        $modelClass = "App\\Models\\" . ucfirst($table);
        return response()->json($modelClass::all());
    }

    public function store(Request $request, $table)
    {
        if (!Schema::hasTable($table)) {
            return response()->json(['message' => 'Table not found'], 404);
        }

        $modelClass = "App\\Models\\" . ucfirst($table);
        $data = $modelClass::create($request->all());

        return response()->json($data, 201);
    }

    public function show($table, $id)
    {
        if (!Schema::hasTable($table)) {
            return response()->json(['message' => 'Table not found'], 404);
        }

        $modelClass = "App\\Models\\" . ucfirst($table);
        $record = $modelClass::find($id);

        if (!$record){
            return response()->json(['message' => 'Record not found'], 404);
        }

        return response()->json($record);
    }

    public function update(Request $request, $table, $id)
    {
        if (!Schema::hasTable($table)) {
            return response()->json(['message' => 'Table not found'], 404);
        }

        $modelClass = "App\\Models\\" . ucfirst($table);
        $record = $modelClass::find($id);

        if (!$record) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $record->update($request->all());

        return response()->json($record);
    }

    public function destroy($table, $id)
    {
        if (!Schema::hasTable($table)) {
            return response()->json(['message' => 'Table not found'], 404);
        }

        $modelClass = "App\\Models\\" . ucfirst($table);
        $record = $modelClass::find($id);

        if (!$record) {
            return response()->json(['message' => 'Record not found'], 404);
        }

        $record->delete();

        return response()->json(['message' => 'Deleted successfully']);
    }
}
