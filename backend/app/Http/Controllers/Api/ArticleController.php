<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Article;

class ArticleController extends Controller
{
    public function index(){
        try{
            return response()->json([
                1,
                Article::all()
                ]);
            }
            catch(Exception $e){
                return response()->json(0);
            }
    }

    public function store(Request $request){
        try{
            $fields = $request->validate([
                'title' => 'required|string',
                'photo' => 'nullable|string',
                'author' => 'required|string',
                'description' => 'required|string',
                'content' => 'required|string',
                'keyword' => 'nullable|string'
            ]);
    
            $article = Article::create($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }

    public function show(Article $article){
        try{
            return response()->json([
                1,
                $article
            ]);
        }
        catch(Exception $e){
            return response()->json(0);
        }
    }

    public function update(Request $request, Article $article){
        try{
            $fields = $request->validate([
                'title' => 'sometimes|string',
                'photo' => 'nullable|string',
                'author' => 'sometimes|string',
                'description' => 'sometimes|string',
                'content' => 'sometimes|string',
                'keyword' => 'sometimes|string'
            ]);
    
            $article->update($fields);
    
            return response()->json(1);
        }
        catch (\Illuminate\Validation\ValidationException $e){
            return response()->json(0);
        } 
        catch (\Exception $e) {
            return response()->json(0);
        } 
    }

    public function destroy(Article $article){
        try {
            $article->delete();
            return response()->json(1);
         } 
        catch (\Exception $e) {
            return response()->json(0);
        }
    }
}
