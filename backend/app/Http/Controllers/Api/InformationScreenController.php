<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\InformationScreen;

class InformationScreenController extends Controller
{
    public function index(){
        try{
            return response()->json([
                1,
                InformationScreen::all()
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
                'localisations_id' => 'required|exists:localisations,id',
                'type_of_content' => 'required|string',
                'stat' => 'required|string',
                'last_content_update' => 'required|date'
            ]);
    
            $screen = InformationScreen::create($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function show(InformationScreen $screen)
    {
        try{
            return response()->json([
                1,
                $screen
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, InformationScreen $screen)
    {
        try{
            $fields = $request->validate([
                'localisations_id' => 'sometimes|exists:localisations,id',
                'type_of_content' => 'sometimes|string',
                'stat' => 'sometimes|string',
                'last_content_update' => 'sometimes|date'
            ]);
    
            $screen->update($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
        
    }

    public function destroy(User $user){
        try {
            $screen->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}