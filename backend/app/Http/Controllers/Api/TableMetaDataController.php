<?php

namespace App\Http\Controllers\Api;

use App\Models\TableMetadata;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class TableMetadataController extends Controller
{
    /**
     * Récupère toutes les configurations d'affichage
     */
    public function index(){
        return TableMetaData::all();
    }

    public function store(Request $request){
        $fields = $request->validate([
            'ObjectType' => 'required|string|unique:table_metadata,ObjectType',
            'atributs' => 'required|array',
            'relevantAtt' => 'required|array',
            'display' => 'required|array',
            'displayFormats' => 'nullable|array',
            'icon' => 'nullable|string',
        ]);

        

        $data = TableMetadata::create($fields);

        return response()->json([
            $data,
            'message' => 'new data type created successfully'
        ], 201);
    }

    public function show(TableMetaData $data){
        return $data;
    }
    
    public function update(Request $request, $id){

        $fields = $request->validate([
            'ObjectType' => 'required|string|unique:table_metadata,object_type,' . $id,
            'atributs' => 'required|array',
            'relevantAtt' => 'required|array',
            'display' => 'required|array',
            'displayFormats' => 'nullable|array',
            'icon' => 'nullable|string',
        ]);

        $data->update($fields);
    }
    public function destroy($id)
    {
        $data->delete();
    }
}