<?php

namespace App\Http\Controllers\Api;

use App\Models\TableMetaData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class TableMetaDataController extends Controller
{
    public function index(){
        return TableMetaData::all();
    }

    public function store(Request $request){
        $fields = $request->validate([
            'ObjectType' => 'required|string|unique:table_meta_data,ObjectType',
            'atributs' => 'required|array',
            'relevantAtt' => 'required|array',
            'display' => 'required|array',
            'displayFormats' => 'nullable|array',
            'icon' => 'nullable|string',
        ]);

        

        $data = TableMetaData::create($fields);

        return response()->json([
            $data,
            'message' => 'new data type created successfully'
        ], 201);
    }

    public function show(TableMetaData $data){
        return $data;
    }
    
    public function update(Request $request, $id) {
        $data = TableMetaData::findOrFail($id);
        
        $fields = $request->validate([
            'ObjectType' => 'sometimes|string|unique:table_meta_data,ObjectType,' . $id,
            'atributs' => 'sometimes|array',
            'relevantAtt' => 'sometimes|array',
            'display' => 'sometimes|array',
            'displayFormats' => 'nullable|array',
            'icon' => 'nullable|string',
        ]);
    
        $data->update($fields);
        
        return response()->json([
            'data' => $data,
            'message' => 'Data type updated successfully'
        ]);
    }
    
    public function destroy($id) {
        $data = TableMetaData::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'message' => 'Data type deleted successfully'
        ]);
    }
}