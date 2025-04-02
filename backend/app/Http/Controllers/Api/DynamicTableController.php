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
        try{
            $modelClass = "App\\Models\\" . ucfirst($table);
            return response()->json([
                1,
                $modelClass::all()
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
        
    }

    public function store(Request $request, $table)
    {
        try{
            $modelClass = "App\\Models\\" . ucfirst($table);
            $data = $modelClass::create($request->all());

            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function show($table, $id)
    {
        try{
            $modelClass = "App\\Models\\" . ucfirst($table);
        $record = $modelClass::find($id);

        if (!$record){
            return response()->json(['message' => 'Record not found'], 404);
        }

        return response()->json([
            1,
            $record]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, $table, $id)
    {

        try{
            $modelClass = "App\\Models\\" . ucfirst($table);
            $record = $modelClass::find($id);
            $record->update($request->all());

            return response()->json([
                1,
                $record]);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function destroy($table, $id)
    {
        try{
            $record->delete();
            return response()->json(1);
        }
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}
