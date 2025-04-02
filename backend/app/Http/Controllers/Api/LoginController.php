<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function login(Request $request){
        $credentials = $request->only('email', 'password');

        if(Auth::attempt($credentials)){
            $user = Auth::user();
            if($user->status != 'active'){
                Auth::logout();
                return response()->json(['token' => 'B'], 401);
            }
            //$token = $user->createToken('NomDuToken')->plainTextToken;
            return response()->json(['token' => 'A'], 200);
        }
        else{
            return response()->json(['token' => 'B'], 401);
        }
    }
}
