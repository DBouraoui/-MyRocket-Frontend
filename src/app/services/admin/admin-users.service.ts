import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../../types/User';
import { environment } from '../../../../environment';
import { Project } from '../../types/Project';

@Injectable({
  providedIn: 'root',
})
export class AdminUsersService {
  users: WritableSignal<User[]> = signal([]);

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.SERVER_URL}/api/administrateur/user`, {
      params: {
        all: true,
      },
    });
  }

  refreshUsers() {
    return this.getUsers().pipe(tap(data => this.users.set(data)));
  }

  createUser(payload: object): Observable<object> {
    return this.http.post(`${environment.SERVER_URL}/api/administrateur/user`, payload);
  }

  deleteUser(uuid: string): Observable<object> {
    return this.http.delete(`http://localhost:8000/api/administrateur/user/${uuid}`);
  }
}
