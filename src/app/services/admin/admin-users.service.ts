import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../../types/User';
import { environment } from '../../../../environment';

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
}
