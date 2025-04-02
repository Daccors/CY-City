<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ParkingSensor;

class ParkingSensorController extends Controller
{
    public function index()
    {
        try{
            return response()->json([
                1,
                ParkingSensor::all()
                ]);
            }
            catch(Exception $e){
                return response()->json(0);
            }
    }

    public function store(Request $request)
    {
        try{
            $fields = $request->validate([
                'localisations_id' => 'required|exists:localisations,id',
                'availability' => 'required|string'
            ]);
    
            $parkingSensor = ParkingSensor::create($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function show(ParkingSensor $parkingSensor)
    {
        try{
            return response()->json([
                1,
                $parkingSensor
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, ParkingSensor $parkingSensor)
    {
        try{
            
        $fields = $request->validate([
            'localisations_id' => 'sometimes|exists:localisations,id',
            'availability' => 'sometimes|string'
        ]);

        $parkingSensor->update($fields);
        
        return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function destroy(ParkingSensor $parkingSensor)
    {
        try {
            $parkingSensor->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}