import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserInfo } from '../../my-account/my-account.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   //BACK-END  
   private apiUrl='http://127.0.0.1:8000/api/user'

   constructor(private http: HttpClient) { }
 
   getUsers(): Observable<any[]> {
       return this.http.get<any[]>(this.apiUrl);
   }

   addUser(): boolean{
    return false;
   }
}
