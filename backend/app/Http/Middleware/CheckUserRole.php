<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckUserRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, $role)
    {
        $roles = explode('|', $roles);
        
        if (!Auth::check()) {
            return redirect('/login')->with('error', 'Vous devez être connecté.');
 // Redirige vers la page de connexion si non authentifié
        }

        // Vérifier si l'utilisateur a le rôle approprié
        if (Auth::user()->role !== $role) {
            return redirect('/home'); // Rediriger vers une page spécifique si l'utilisateur n'a pas le rôle
        }

        return $next($request);
    }
}
