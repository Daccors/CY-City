<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Bike;

class BikeController extends Controller{
    public function index(){
        try{
            return response()->json([
                1,
                Bike::all()
                ]);
            }
            catch(Exception $e){
                return response()->json(0);
            }
    }

    public function store(Request $request){
        try{
            $fields = $request->validate([
                'localisations_id' => 'required|exists:localisations,id',
                'brand' => 'required|string',
                'type' => 'required|string',
                'availability' => 'required|string'
            ]);
    
            $bike = Bike::create($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
        
    }

    public function show(Bike $bike){
        try{
            return response()->json([
                1,
                $bike
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, Bike $bike){
        try{
            $fields = $request->validate([
                'localisations_id' => 'sometimes|exists:localisations,id',
                'brand' => 'sometimes|string',
                'type' => 'sometimes|string',
                'availability' => 'sometimes|string'
            ]);
    
            $bike->update($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
        
    }

    public function destroy(Bike $bike){
        try {
            $bike->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}