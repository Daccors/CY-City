<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Level;

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
        $fields = $request->validate([
            'username' => 'required',
            'surname' => 'required',
            'photo' => 'nullable',
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'gender' => 'required|in:H,F,X',
            'birthdate' => 'required|date',
            'status' => 'required',
            'password' => 'required|min:6',
            'address_id' => 'nullable'
        ]);

        $defaultLevel = Level::create([
            'type' => 'simple',
            'points' => 0
        ]);
        $fields['level_id'] = $defaultLevel->id;

        $user = User::create($fields);

        return response()->json([
            $user,
            'message' => 'User created successfully'
        ], 201);
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
            'user' => $user,
            'message' => 'User updated successfully'
        ], 200);
    }

    public function destroy(User $user){
        $user->delete();
        return ['message' => 'Utilisateur supprimé'];
    }

}