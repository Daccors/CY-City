<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Token;

class LoginController extends Controller
{
    public function login(Request $request){
        $credentials = $request->only('email', 'password');

        if(Auth::attempt($credentials)){
            $user = Auth::user();
            //$token = $user->createToken('NomDuToken')->plainTextToken;

            $existingToken = Token::where('user_id', $user->id)->first();

            if ($existingToken) {
                return response()->json(['token' => $existingToken->token], 200);
            }

            // Générer un nouveau token
            $tokenString = Str::random(60);

            // Sauvegarder le token en base de données
            Token::create([
                'user_id' => $user->id,
                'token' => $tokenString
            ]);

            return response()->json(['token' => 'A'], 200);
        }
        else{
            return response()->json(['token' => 'B'], 401);
        }
    }
}
