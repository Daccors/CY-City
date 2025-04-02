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
            //$token = $user->createToken('NomDuToken')->plainTextToken;
            return response()->json(1);
        }
        else{
            return response()->json(0);
        }
    }
}