<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Modify;

class ModifyController extends Controller
{
    public function index()
    {
        try{
            return response()->json([
                1,
                Modify::all()
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
                'users_id' => 'required|exists:users,id',
                'users_id_2' => 'required|exists:users,id',
                'comments' => 'nullable|string'
            ]);
    
            $modify = Modify::create($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function show(Modify $modify)
    {
        try{
            return response()->json([
                1,
                $modify
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, Modify $modify)
    {
        try{
            $fields = $request->validate([
                'users_id' => 'required|exists:users,id',
                'users_id_2' => 'required|exists:users,id',
                'comments' => 'nullable|string'
            ]);
    
            $modify->update($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function destroy(Modify $modify)
    {
        try {
            $modify->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}