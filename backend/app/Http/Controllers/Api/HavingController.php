<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Having;

class HavingController extends Controller
{
    public function index()
    {
        return Having::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'users_id' => 'required|exists:users,id',
            'connection_id' => 'required|exists:connections,id'
        ]);

        $having = Having::create($fields);

        return response()->json([
            $having,
            'message' => 'Having record created successfully'
        ], 201);
    }

    public function show(Having $having)
    {
        return $having;
    }

    public function update(Request $request, Having $having)
    {
        $fields = $request->validate([
            'users_id' => 'required|exists:users,id',
            'connection_id' => 'required|exists:connections,id'
        ]);

        $having->update($fields);

        return response()->json([
            'having' => $having,
            'message' => 'Having record updated successfully'
        ], 200);
    }

    public function destroy(Having $having)
    {
        $having->delete();
        return ['message' => 'Enregistrement Having supprimé'];
    }
}