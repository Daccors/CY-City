<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Localisation;

class LocalisationController extends Controller
{
    public function index()
    {
        try{
        return response()->json([
            1,
            Localisation::all()
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
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric'
            ]);
    
            $localisation = Localisation::create($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function show(Localisation $localisation)
    {
        try{
            return response()->json([
                1,
                $user
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, Localisation $localisation)
    {
        try{
            $fields = $request->validate([
                'latitude' => 'sometimes|numeric',
                'longitude' => 'sometimes|numeric'
            ]);
    
            $localisation->update($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
        
    }

    public function destroy(Localisation $localisation)
    {
        try {
            $user->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}