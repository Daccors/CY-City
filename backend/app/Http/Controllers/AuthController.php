<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Token;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request)
{
    $request->validate([
        'email' => 'required|email',
        'password' => 'required'
    ]);

    $user = User::where('email', $request->email)->first();

    if (!$user || !\Hash::check($request->password, $user->password)) {
        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    // Vérifier si un token existe déjà pour cet utilisateur
    $existingToken = Token::where('user_id', $user->id)->first();

    if ($existingToken) {
        return response()->json(['token' => $existingToken->token]); // Retourner l'ancien token
    }

    // Générer un nouveau token unique
    $tokenString = Str::random(60);

    // Sauvegarder le token dans la base de données
    $token = Token::create([
        'user_id' => $user->id,
        'token' => $tokenString
    ]);

    return response()->json(['token' => $token->token]);
}
}
