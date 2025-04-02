<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Having;

class HavingController extends Controller
{
    public function index()
    {
        try{
            return response()->json([
                1,
                Having::all()
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
                'connection_id' => 'required|exists:connections,id'
            ]);
    
            $having = Having::create($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function show(Having $having)
    {
        try{
            return response()->json([
                1,
                $having
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, Having $having)
    {
        try{
            $fields = $request->validate([
                'users_id' => 'required|exists:users,id',
                'connection_id' => 'required|exists:connections,id'
            ]);
    
            $having->update($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function destroy(Having $having){
        try {
            $having->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}