<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\InformationScreen;

class InformationScreenController extends Controller
{
    public function index()
    {
        return InformationScreen::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'localisations_id' => 'required|exists:localisations,id',
            'type_of_content' => 'required|string',
            'stat' => 'required|string',
            'last_content_update' => 'required|date'
        ]);

        $screen = InformationScreen::create($fields);

        return response()->json([
            $screen,
            'message' => 'Information Screen created successfully'
        ], 201);
    }

    public function show(InformationScreen $screen)
    {
        return $screen;
    }

    public function update(Request $request, InformationScreen $screen)
    {
        $fields = $request->validate([
            'localisations_id' => 'sometimes|exists:localisations,id',
            'type_of_content' => 'sometimes|string',
            'stat' => 'sometimes|string',
            'last_content_update' => 'sometimes|date'
        ]);

        $screen->update($fields);

        return response()->json([
            'screen' => $screen,
            'message' => 'Information Screen updated successfully'
        ], 200);
    }

    public function destroy(InformationScreen $screen)
    {
        $screen->delete();
        return ['message' => 'Écran d\'information supprimé'];
    }
}