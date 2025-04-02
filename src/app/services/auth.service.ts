import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/allTables/users'
  private token: string | null = null;
  private userID: string;
  private userRole: string;
  private userRoleSubject = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    this.updateUserRole();
  }

  public register(proviedData: any) {
    return this.http.post(this.apiUrl, proviedData).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  login(email: string, password: string, rememberMe: boolean): any  {
    return this.http.post<any>("http://localhost:8000/api/login", { email, password }).pipe(
      tap(response => {
        if (response) {
          this.token = response.token;
          this.userID = response.user_id;
          localStorage.setItem('user_id', this.userID);
          if (rememberMe) {
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

  getUserRole(): string | null {
    const token = this.getToken(); 
    if (!token) {
      return null;
    }

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
