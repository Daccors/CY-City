<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Level;

class LevelController extends Controller
{
    public function index()
    {
        try{
            return response()->json([
                1,
                Level::all()
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
                'type' => 'string',
                'points' => 'required|integer'
            ]);
    
            $level = Level::create($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function show(Level $level)
    {
        try{
            return response()->json([
                1,
                $level
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, Level $level)
    {
        try{
            $fields = $request->validate([
                'type' => 'sometimes|string',
                'points' => 'required|integer'
            ]);
    
            $level->update($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function destroy(Level $level)
    {
        try {
            $level->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}