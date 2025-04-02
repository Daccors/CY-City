<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Bike;

class BikeController extends Controller{
    public function index(){
        return Bike::all();
    }

    public function store(Request $request){
        $fields = $request->validate([
            'localisations_id' => 'required|exists:localisations,id',
            'brand' => 'required|string',
            'type' => 'required|string',
            'availability' => 'required|string'
        ]);

        $bike = Bike::create($fields);

        return response()->json([
            $bike,
            'message' => 'Bike created successfully'
        ], 201);
    }

    public function show(Bike $bike){
        return $bike;
    }

    public function update(Request $request, Bike $bike){
        $fields = $request->validate([
            'localisations_id' => 'sometimes|exists:localisations,id',
            'brand' => 'sometimes|string',
            'type' => 'sometimes|string',
            'availability' => 'sometimes|string'
        ]);

        $bike->update($fields);

        return response()->json([
            'bike' => $bike,
            'message' => 'Bike updated successfully'
        ], 200);
    }

    public function destroy(Bike $bike){
        $bike->delete();
        return ['message' => 'Vélo supprimé'];
    }
}