<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Consult;

class ConsultController extends Controller
{
    public function index()
    {
        try{
            return response()->json([
                1,
                Consult::all()
                ]);
            }
            catch(Exception $e){
                return response()->json(0);
            }
    }

    public function store(Request $request)
    {
        try{
            $fields = $request->validate([
                'user_id' => 'required|exists:users,id',
                'article_id' => 'required|exists:articles,id'
            ]);
    
            $consult = Consult::create($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function show(Consult $consult)
    {
        try{
            return response()->json([
                1,
                $consult
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function destroy(Consult $consult)
    {
        try {
            $consult->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}