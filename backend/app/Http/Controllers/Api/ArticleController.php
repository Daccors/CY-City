<?php
namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Article;

class ArticleController extends Controller
{
    public function index(){
        return Article::all();
    }

    public function store(Request $request){
        $fields = $request->validate([
            'title' => 'required|string',
            'photo' => 'nullable|string',
            'author' => 'required|string',
            'description' => 'required|string',
            'content' => 'required|string',
            'keyword' => 'nullable|string'
        ]);

        $article = Article::create($fields);

        return response()->json([
            $article,
            'message' => 'Article created successfully'
        ], 201);
    }

    public function show(Article $article){
        return $article;
    }

    public function update(Request $request, Article $article){
        $fields = $request->validate([
            'title' => 'sometimes|string',
            'photo' => 'nullable|string',
            'author' => 'sometimes|string',
            'description' => 'sometimes|string',
            'content' => 'sometimes|string',
            'keyword' => 'sometimes|string'
        ]);

        $article->update($fields);

        return response()->json([
            'article' => $article,
            'message' => 'Article updated successfully'
        ], 200);
    }

    public function destroy(Article $article){
        $article->delete();
        return ['message' => 'Article supprimé'];
    }
}
