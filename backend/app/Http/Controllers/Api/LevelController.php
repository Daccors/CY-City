<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Level;

class LevelController extends Controller
{
    public function index()
    {
        return Level::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'type' => 'string',
            'points' => 'required|integer'
        ]);

        $level = Level::create($fields);

        return response()->json([
            $level,
            'message' => 'Level created successfully'
        ], 201);
    }

    public function show(Level $level)
    {
        return $level;
    }

    public function update(Request $request, Level $level)
    {
        $fields = $request->validate([
            'type' => 'sometimes|string',
            'points' => 'required|integer'
        ]);

        $level->update($fields);

        return response()->json([
            'level' => $level,
            'message' => 'Level updated successfully'
        ], 200);
    }

    public function destroy(Level $level)
    {
        $level->delete();
        return ['message' => 'Niveau supprimé'];
    }
}