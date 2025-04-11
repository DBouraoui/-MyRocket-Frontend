import {Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {getUsersAdminResponse, Token, User} from '../types/User';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  users :WritableSignal<User[]> = signal([]);

  constructor(
    private http: HttpClient
  ) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8000/api/user', {
      params: {
        all: true
      }
    });
  }

  refreshUsers() {
   return this.getUsers().pipe(
      tap(data => this.users.set(data)),
    )
  }

}
