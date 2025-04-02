<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Level;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * @return \Illuminate\Http\Response
     */
    public function index(){
        try{
        return response()->json([
            1,
            User::all()
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function store(Request $request){
        try{
            $fields = $request->validate([
                'username' => 'required|string',
                'surname' => 'required|string',
                'photo' => 'nullable|string',
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'gender' => 'nullable|in:H,F,X',
                'birthdate' => 'nullable|date',
                'status' => 'nullable|string',
                'password' => 'required|min:6',
                'address_id' => 'nullable|exists:addresses,id'
            ]);
        
            $defaultLevel = Level::create([
                'type' => 'simple',
                'points' => 0
            ]);
            $fields['level_id'] = $defaultLevel->id;
            $fields['password'] = Hash::make($fields['password']);

            $user = User::create($fields);

             return response()->json(1);
            }
            
            catch (\Illuminate\Validation\ValidationException $e) {
                return response()->json(0);
            } 
            catch (\Exception $e) {
                return response()->json(0);
            }
    }

    public function show(User $user){
        try{
            return response()->json([
                1,
                $user
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, User $user){
        try {
            $fields = $request->validate([
                'username' => 'sometimes|string',
                'surname' => 'sometimes|string',
                'photo' => 'sometimes|nullable|string',
                'name' => 'sometimes|string',
                'email' => [
                    'sometimes', 
                    'email',
                    'unique:users,email,' . $user->id
                ],
                'gender' => 'sometimes|in:H,F,X',
                'birthdate' => 'sometimes|date',
                'status' => 'sometimes|string',
                'password' => 'sometimes|min:6',
                'level_id' => 'sometimes|exists:levels,id',
                'address_id' => 'sometimes|nullable|exists:addresses,id'
            ]);

            if (isset($fields['password'])){
                $fields['password'] = Hash::make($fields['password']);
            }

            $user->update($fields);

            return response()->json(1);
        } 
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
    public function destroy(User $user){
        try {
            $user->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}