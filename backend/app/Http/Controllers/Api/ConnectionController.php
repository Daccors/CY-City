<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Connection;

class ConnectionController extends Controller
{
    public function index()
    {
        try{
            return response()->json([
                1,
                Connection::all()
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
                'user_id' => 'required|exists:users,id'
            ]);
    
            $connection = Connection::create($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
        
    }

    public function show(Connection $connection)
    {
        try{
            return response()->json([
                1,
                $connection
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function destroy(Connection $connection)
    {
        try {
            $connection->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}