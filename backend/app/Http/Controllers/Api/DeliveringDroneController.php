<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\DeliveringDrone;

class DeliveringDroneController extends Controller
{
    public function index()
    {
        return DeliveringDrone::all();
    }

    public function store(Request $request)
    {
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

        return response()->json([
            $drone,
            'message' => 'Delivering Drone created successfully'
        ], 201);
    }

    public function show(DeliveringDrone $drone)
    {
        return $drone;
    }

    public function update(Request $request, DeliveringDrone $drone)
    {
        $fields = $request->validate([
            'addresses_id' => 'sometimes|exists:addresses,id',
            'localisations_id' => 'sometimes|exists:localisations,id',
            'stat' => 'sometimes|string',
            'batterie' => 'sometimes|numeric',
            'capacity' => 'sometimes|numeric',
            'departure' => 'sometimes',
            'estimated_arrival_time' => 'sometimes'
        ]);

        $drone->update($fields);

        return response()->json([
            'drone' => $drone,
            'message' => 'Delivering Drone updated successfully'
        ], 200);
    }

    public function destroy(DeliveringDrone $drone)
    {
        $drone->delete();
        return ['message' => 'Drone de livraison supprimé'];
    }
}