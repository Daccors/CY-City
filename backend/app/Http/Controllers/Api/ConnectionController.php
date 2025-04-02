<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Connection;

class ConnectionController extends Controller
{
    public function index()
    {
        return Connection::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $connection = Connection::create($fields);

        return response()->json([
            $connection,
            'message' => 'Connection created successfully'
        ], 201);
    }

    public function show(Connection $connection)
    {
        return $connection;
    }

    public function update(Request $request, Connection $connection)
    {
        $fields = $request->validate([
            'user_id' => 'required|exists:users,id'
        ]);

        $connection->update($fields);

        return response()->json([
            'connection' => $connection,
            'message' => 'Connection updated successfully'
        ], 200);
    }

    public function destroy(Connection $connection)
    {
        $connection->delete();
        return ['message' => 'Connexion supprimée'];
    }
}