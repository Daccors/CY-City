<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Consult;

class ConsultController extends Controller
{
    public function index()
    {
        return Consult::all();
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'user_id' => 'required|exists:users,id',
            'article_id' => 'required|exists:articles,id'
        ]);

        $consult = Consult::create($fields);

        return response()->json([
            $consult,
            'message' => 'Consult created successfully'
        ], 201);
    }

    public function show(Consult $consult)
    {
        return $consult;
    }

    public function update(Request $request, Consult $consult)
    {
        $fields = $request->validate([
            'user_id' => 'required|exists:users,id',
            'article_id' => 'required|exists:articles,id'
        ]);

        $consult->update($fields);

        return response()->json([
            'consult' => $consult,
            'message' => 'Consult updated successfully'
        ], 200);
    }

    public function destroy(Consult $consult)
    {
        $consult->delete();
        return ['message' => 'Consultation supprimée'];
    }
}