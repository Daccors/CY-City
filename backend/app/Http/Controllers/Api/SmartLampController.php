<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\SmartLamp;

class SmartLampController extends Controller
{
    public function index()
    {
        return SmartLamp::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'localisations_id' => 'required|exists:localisations,id',
            'stat' => 'required|string',
            'intensity' => 'required|numeric',
            'battery' => 'required|numeric',
            'presence' => 'required|boolean'
        ]);

        $smartLamp = SmartLamp::create($fields);

        return response()->json([
            $smartLamp,
            'message' => 'Smart Lamp created successfully'
        ], 201);
    }

    public function show(SmartLamp $smartLamp)
    {
        return $smartLamp;
    }

    public function update(Request $request, SmartLamp $smartLamp)
    {
        $fields = $request->validate([
            'localisations_id' => 'sometimes|exists:localisations,id',
            'stat' => 'sometimes|string',
            'intensity' => 'sometimes|numeric',
            'battery' => 'sometimes|numeric',
            'presence' => 'sometimes|boolean'
        ]);

        $smartLamp->update($fields);

        return response()->json([
            'smartLamp' => $smartLamp,
            'message' => 'Smart Lamp updated successfully'
        ], 200);
    }

    public function destroy(SmartLamp $smartLamp)
    {
        $smartLamp->delete();
        return ['message' => 'Lampadaire intelligent supprimé'];
    }
}