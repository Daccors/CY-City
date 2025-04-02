<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\ParkingSensor;

class ParkingSensorController extends Controller
{
    public function index()
    {
        return ParkingSensor::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'localisations_id' => 'required|exists:localisations,id',
            'availability' => 'required|string'
        ]);

        $parkingSensor = ParkingSensor::create($fields);

        return response()->json([
            $parkingSensor,
            'message' => 'Parking Sensor created successfully'
        ], 201);
    }

    public function show(ParkingSensor $parkingSensor)
    {
        return $parkingSensor;
    }

    public function update(Request $request, ParkingSensor $parkingSensor)
    {
        $fields = $request->validate([
            'localisations_id' => 'sometimes|exists:localisations,id',
            'availability' => 'sometimes|string'
        ]);

        $parkingSensor->update($fields);

        return response()->json([
            'parkingSensor' => $parkingSensor,
            'message' => 'Parking Sensor updated successfully'
        ], 200);
    }

    public function destroy(ParkingSensor $parkingSensor)
    {
        $parkingSensor->delete();
        return ['message' => 'Capteur de stationnement supprimé'];
    }
}