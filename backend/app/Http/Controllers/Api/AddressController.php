<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Address;

class AddressController extends Controller
{
    public function index(){
        try{
            return response()->json([
                1,
                Address::all()
                ]);
            }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function store(Request $request){
        try{
            $fields = $request->validate([
                'number' => 'required|string',
                'name' => 'required|string'
            ]);
    
            $address = Address::create($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
        
    }

    public function show(Address $address){
        try{
            return response()->json([
                1,
                $address
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, Address $address){
        try{
            $fields = $request->validate([
                'number' => 'sometimes|string',
                'name' => 'sometimes|string'
            ]);
    
            $address->update($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function destroy(Address $address){
        try{
            $address->delete();
            return response()->json(1);
         } 
        catch (\Exception $e){
            return response()->json(0);
        }
    }
}