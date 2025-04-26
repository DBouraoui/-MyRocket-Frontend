import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { User } from '../../types/User';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserSettingsService {
  user: WritableSignal<User | null> = signal(null);

  constructor(private http: HttpClient) {}

  fetchInformations(): Observable<User> {
    return this.http.get<User>(`${environment.SERVER_URL}/api/user/me`);
  }

  updateProfile(payload: any): Observable<User> {
    return this.http.put<User>(`${environment.SERVER_URL}/api/user`, payload);
  }

  updatePassword(payload: any): Observable<User> {
    return this.http.patch<User>(`${environment.SERVER_URL}/api/user`, payload);
  }

  refreshInformations() {
    return this.fetchInformations().pipe(
      tap(data => {
        this.user.set(data);
      })
    );
  }
}
