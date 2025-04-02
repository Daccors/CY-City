<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Action;

class ActionController extends Controller
{
    public function index(){
        try{
            return response()->json([
                1,
                Action::all()
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function store(Request $request){
        try{
            $fields = $request->validate([
                'users_id' => 'exists:users,id',
                'delivering_drones_id' => 'nullable|exists:delivering_drones,id',
                'smart_bins_id' => 'nullable|exists:smart_bins,id',
                'information_screen_id' => 'nullable|exists:information_screens,id',
                'parking_sensors_id' => 'nullable|exists:parking_sensors,id',
                'smart_lamp_id' => 'nullable|exists:smart_lamps,id',
                'bike_id' => 'nullable|exists:bikes,id',
                'action_type' => 'required|string'
            ]);

            $action = Action::create($fields);

            return response()->json(1);

        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function show(Action $action){
        try{
            return response()->json([
                1,
                $action
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
        
    }

    public function update(Request $request, Action $action){
        try{
            $fields = $request->validate([
                'users_id' => 'nullable|sometimes|exists:users,id',
                'delivering_drones_id' => 'nullable|sometimes|exists:delivering_drones,id',
                'smart_bins_id' => 'nullable|sometimes|exists:smart_bins,id',
                'information_screen_id' => 'nullable|sometimes|exists:information_screens,id',
                'parking_sensors_id' => 'nullable|sometimes|exists:parking_sensors,id',
                'smart_lamp_id' => 'nullable|sometimes|exists:smart_lamps,id',
                'bike_id' => 'nullable|sometimes|exists:bikes,id',
                'action_type' => 'sometimes|string'
            ]);
    
            $action->update($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function destroy(Action $action){
        try{
            $action->delete();
            return response()->json(1);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }
}