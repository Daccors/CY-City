import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private userRoleSubject = new BehaviorSubject<string | null>(null);
  //constructor(private http: HttpClient) { }


  constructor() {
    this.updateUserRole();
    console.log("Reccupération du token local");
  }

  //BACK-END
  //return this.http.post<{ token: string }>('/api/login', { email, password, rememberMe })
  login(email: string, password: string, rememberMe: boolean): Observable<{ token: string } | null> {
    return this.testlogin(email, password).pipe(
      tap(response => {
        if (response) {
          this.token = response.token;

          if (rememberMe) { // Si rememberMe est true, on stocke le token
            localStorage.setItem('token', response.token);
          }
        }
        this.updateUserRole();
      })
    );
  }

  getToken(): string | null {
    return this.token || localStorage.getItem('token');
  }

  private testlogin(email: string, password: string): Observable<{ token: string } | null> {
    if (email === 'root@root' && password === 'root') {
      return of({ token: 'A' }); // Retourne un Observable avec un objet contenant un token
    }
    return of(null); // Retourne un Observable avec null
  }

  getUserRole(): string | null {
    const token = this.getToken(); // Récupère le token depuis localStorage
    if (!token) {
      return null;
    }

    // Simuler des rôles en fonction du token (normalement, on décode un JWT)
    console.log(token);
    if (token === 'A') return 'admin';
    if (token === 'B') return 'moderator';
    if (token === 'C') return 'user';

    return null;
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    this.userRoleSubject.next(null); 
  }

  private updateUserRole() {
    this.userRoleSubject.next(this.getUserRole());
  }

  getUserRoleObservable(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }
}
