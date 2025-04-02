<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\SmartLamp;

class SmartLampController extends Controller
{
    public function index()
    {
        try{
            return response()->json([
                1,
                SmartLamp::all()
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
            'stat' => 'required|string',
            'intensity' => 'required|numeric',
            'battery' => 'required|numeric',
            'presence' => 'required|boolean'
        ]);

        $smartLamp = SmartLamp::create($fields);

        return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function show(SmartLamp $smartLamp)
    {
        try{
            return response()->json([
                1,
                $smartLamp
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, SmartLamp $smartLamp)
    {
        try{
            
        $fields = $request->validate([
            'localisations_id' => 'sometimes|exists:localisations,id',
            'stat' => 'sometimes|string',
            'intensity' => 'sometimes|numeric',
            'battery' => 'sometimes|numeric',
            'presence' => 'sometimes|boolean'
        ]);

        $smartLamp->update($fields);

        return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function destroy(SmartLamp $smartLamp)
    {
        try {
            $smartLamp->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}