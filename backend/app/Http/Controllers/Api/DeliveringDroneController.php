<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\DeliveringDrone;

class DeliveringDroneController extends Controller
{
    public function index()
    {
        try{
            return response()->json([
                1,
                DeliveringDrone::all()
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
                'addresses_id' => 'required|exists:addresses,id',
                'localisations_id' => 'required|exists:localisations,id',
                'stat' => 'required|string',
                'batterie' => 'required|numeric',
                'capacity' => 'required|numeric',
                'departure' => 'required|date',
                'estimated_arrival_time' => 'required|date'
            ]);
    
            $drone = DeliveringDrone::create($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
        
    }

    public function show(DeliveringDrone $drone){
    try{
        return response()->json([
            1,
            $drone
        ]);
    }
    catch(Exception $e){
        return response()->json(0);
    }
}

    public function update(Request $request, DeliveringDrone $drone)
    {
        try{
            $fields = $request->validate([
                'addresses_id' => 'sometimes|exists:addresses,id',
                'localisations_id' => 'sometimes|exists:localisations,id',
                'stat' => 'sometimes|string',
                'batterie' => 'sometimes|numeric',
                'capacity' => 'sometimes|numeric',
                'departure' => 'sometimes|date',
                'estimated_arrival_time' => 'sometimes|date'
            ]);
    
            $drone->update($fields);
    
            return response()->json([
                'drone' => $drone,
                'message' => 'Delivering Drone updated successfully'
            ], 200);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
        
    }

    public function destroy(DeliveringDrone $drone){
        try {
            $drone->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}