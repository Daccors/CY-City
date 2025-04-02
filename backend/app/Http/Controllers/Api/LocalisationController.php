<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Localisation;

class LocalisationController extends Controller
{
    public function index()
    {
        return Localisation::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric'
        ]);

        $localisation = Localisation::create($fields);

        return response()->json([
            $localisation,
            'message' => 'Localisation created successfully'
        ], 201);
    }

    public function show(Localisation $localisation)
    {
        return $localisation;
    }

    public function update(Request $request, Localisation $localisation)
    {
        $fields = $request->validate([
            'latitude' => 'sometimes|numeric',
            'longitude' => 'sometimes|numeric'
        ]);

        $localisation->update($fields);

        return response()->json([
            'localisation' => $localisation,
            'message' => 'Localisation updated successfully'
        ], 200);
    }

    public function destroy(Localisation $localisation)
    {
        $localisation->delete();
        return ['message' => 'Localisation supprimée'];
    }
}