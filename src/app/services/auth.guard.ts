import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const expectedRoles: string[] = route.data['roles']; // Rôle(s) attendu(s) pour cette page
  const userRole = authService.getUserRole(); // Récupérer le rôle actuel de l'utilisateur
  
  if (userRole != null && expectedRoles.includes(userRole)) {
    return true; // Accès autorisé
  }

  // Redirige l'utilisateur vers la page de connexion s'il n'a pas accès
  router.navigate(['/']);
  return false;
};
