<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\SmartBin;

class SmartBinController extends Controller
{
    public function index()
    {
        try{
            return response()->json([
                1,
                SmartBin::all()
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
                'capacity' => 'required|numeric',
                'opened' => 'required|boolean',
                'last_collection' => 'required|date',
                'stat' => 'required|string'
            ]);
    
            $smartBin = SmartBin::create($fields);
    
            return response()->json(1);
        } 
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        } 
        
    }

    public function show(SmartBin $smartBin)
    {
        try{
            return response()->json([
                1,
                $smartBin
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, SmartBin $smartBin)
    {
        try{
            
        $fields = $request->validate([
            'localisations_id' => 'sometimes|exists:localisations,id',
            'capacity' => 'sometimes|numeric',
            'opened' => 'sometimes|boolean',
            'last_collection' => 'sometimes|date',
            'stat' => 'sometimes|string'
        ]);

        $smartBin->update($fields);

        return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function destroy(SmartBin $smartBin)
    {
        try {
            $smartBin->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}