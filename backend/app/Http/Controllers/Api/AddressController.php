<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Address;

class AddressController extends Controller
{
    public function index(){
        return Address::all();
    }

    public function store(Request $request){
        $fields = $request->validate([
            'number' => 'required|string',
            'name' => 'required|string'
        ]);

        $address = Address::create($fields);

        return response()->json([
            $address,
            'message' => 'Address created successfully'
        ], 201);
    }

    public function show(Address $address){
        return $address;
    }

    public function update(Request $request, Address $address){
        $fields = $request->validate([
            'number' => 'sometimes|string',
            'name' => 'sometimes|string'
        ]);

        $address->update($fields);

        return response()->json([
            'address' => $address,
            'message' => 'Address updated successfuly'
        ], 200);
    }

    public function destroy(Address $address){
        $address->delete();
        return ['message' => 'Adresse supprimée'];
    }
}