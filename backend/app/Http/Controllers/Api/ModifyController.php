<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Modify;

class ModifyController extends Controller
{
    public function index()
    {
        return Modify::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'users_id' => 'required|exists:users,id',
            'users_id_2' => 'required|exists:users,id',
            'comments' => 'nullable|string'
        ]);

        $modify = Modify::create($fields);

        return response()->json([
            $modify,
            'message' => 'Modify record created successfully'
        ], 201);
    }

    public function show(Modify $modify)
    {
        return $modify;
    }

    public function update(Request $request, Modify $modify)
    {
        $fields = $request->validate([
            'users_id' => 'required|exists:users,id',
            'users_id_2' => 'required|exists:users,id',
            'comments' => 'nullable|string'
        ]);

        $modify->update($fields);

        return response()->json([
            'modify' => $modify,
            'message' => 'Modify record updated successfully'
        ], 200);
    }

    public function destroy(Modify $modify)
    {
        $modify->delete();
        return ['message' => 'Enregistrement Modify supprimé'];
    }
}