<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Action;

class ActionController extends Controller
{
    public function index(){
        return Action::all();
    }

    public function store(Request $request){
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

        return response()->json([
            $action,
            'message' => 'Action created successfully'
        ], 201);
    }

    public function show(Action $action){
        return $action;
    }

    public function update(Request $request, Action $action){
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

        return response()->json([
            'action' => $action,
            'message' => 'Action updated successfully'
        ], 200);
    }

    public function destroy(Action $action){
        $action->delete();
        return ['message' => 'Action supprimée'];
    }
}