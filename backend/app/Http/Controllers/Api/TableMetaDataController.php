<?php

namespace App\Http\Controllers\Api;

use App\Models\TableMetaData;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;

class TableMetaDataController extends Controller
{
    public function index(){
        try{
            return response()->json([
                1,
                TableMetaData::all()
                ]);
            }
            catch(Exception $e){
                return response()->json(0);
            }
    }

    public function store(Request $request){
        try{
            
        $fields = $request->validate([
            'ObjectType' => 'required|string|unique:table_meta_data,ObjectType',
            'atributs' => 'required|array',
            'relevantAtt' => 'required|array',
            'display' => 'required|array',
            'displayFormats' => 'nullable|array',
            'icon' => 'nullable|string',
        ]);

        $data = TableMetaData::create($fields);
        return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function show(TableMetaData $data){
        try{
            return response()->json([
                1,
                $data
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }
    
    public function update(Request $request, $id) {
        try{
            
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
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
    
    public function destroy($id) {
        try{
            
        $data = TableMetaData::findOrFail($id);
        $data->delete();
        
        return response()->json(1);
        }
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}