<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Level;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use App\Mail\Welcomemail;
use Illuminate\Mail\Message;

class UserController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        try{$fields = $request->validate([
            'username' => 'required|unique:users,username',
            'surname' => 'required',
            'photo' => 'nullable',
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'gender' => 'nullable|in:H,F,X',
            'birthdate' => 'nullable|date',
            'status' => 'nullable',
            'password' => 'required|min:6',
            'address_id' => 'nullable'
        ]);}
        catch(Exception $e){
            return $e.getCode();
        }

        $defaultLevel = Level::create([
            'type' => 'simple',
            'points' => 0
        ]);
        $fields['level_id'] = $defaultLevel->id;
        $fields['password'] = Hash::make($fields['password']);
        $fields['status'] = 'inactive';

        $user = User::create($fields);

        $token = Str::random(64);
        DB::table('email_verification_tokens')->insert([
            'user_id' => $user->id,
            'token' => $token,
            'created_at' => now()
        ]);

        Mail::to($user->email)->send(new Welcomemail($user, $token));

        return response()->json('true');
    }

    public function show(User $user){
        return $user;
    }

    public function update(Request $request, User $user){
        $fields = $request->validate([
            'username' => 'sometimes',
            'surname' => 'sometimes',
            'photo' => 'sometimes',
            'name' => 'sometimes',
            'email' => [
                'sometimes', 
                'email', 
                'unique:users,email,' . $user->id
            ],
            'gender' => 'sometimes|in:H,F,X',
            'birthdate' => 'sometimes|date',
            'status' => 'sometimes',
            'password' => 'sometimes|min:6',
            'level_id' => 'sometimes',
            'address_id' => 'sometimes'
        ]);

        $user->update($fields);

        return response()->json([
            'message' => 'User updated successfully'
        ], 200);
    }

    public function destroy(User $user){
        return ['message' => 'Utilisateur supprimé'];
    }

    public function verifyEmail($token)
    {
        $verificationData = DB::table('email_verification_tokens')->where('token', $token)->first();
    
        if (!$verificationData) {
            return response()->json(['message' => 'Token invalide'], 400);
        }
    
        $user = User::find($verificationData->user_id);
        $user->status = 'active';
        $user->save();
    
        DB::table('email_verification_tokens')->where('token', $token)->delete();
    
        return redirect()->to('/login')->with('message', 'Votre compte a été activé avec succès!');
    }

}