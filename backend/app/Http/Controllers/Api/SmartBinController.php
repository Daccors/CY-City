<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\SmartBin;

class SmartBinController extends Controller
{
    public function index()
    {
        return SmartBin::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'localisations_id' => 'required|exists:localisations,id',
            'capacity' => 'required|numeric',
            'opened' => 'required|boolean',
            'last_collection' => 'required|date',
            'stat' => 'required|string'
        ]);

        $smartBin = SmartBin::create($fields);

        return response()->json([
            $smartBin,
            'message' => 'Smart Bin created successfully'
        ], 201);
    }

    public function show(SmartBin $smartBin)
    {
        return $smartBin;
    }

    public function update(Request $request, SmartBin $smartBin)
    {
        $fields = $request->validate([
            'localisations_id' => 'sometimes|exists:localisations,id',
            'capacity' => 'sometimes|numeric',
            'opened' => 'sometimes|boolean',
            'last_collection' => 'sometimes|date',
            'stat' => 'sometimes|string'
        ]);

        $smartBin->update($fields);

        return response()->json([
            'smartBin' => $smartBin,
            'message' => 'Smart Bin updated successfully'
        ], 200);
    }

    public function destroy(SmartBin $smartBin)
    {
        $smartBin->delete();
        return ['message' => 'Poubelle intelligente supprimée'];
    }
}