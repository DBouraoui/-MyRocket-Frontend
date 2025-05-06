import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Notification } from '../../types/Notification';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class UserNotificationsService {
  notifications: WritableSignal<Notification[]> = signal([]);

  constructor(private http: HttpClient) {}

  fetchNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${environment.SERVER_URL}/api/utilisateur/notification`);
  }

  refreshNotifications() {
    return this.fetchNotifications().pipe(
      tap((response: Notification[]) => {
        this.notifications.set(response);
      })
    );
  }

  deleteOneNotification(uuid: string): Observable<object> {
    return this.http.patch(`${environment.SERVER_URL}/api/utilisateur/notification/${uuid}`, {});
  }

  deleteAllNotification(): Observable<object> {
    return this.http.delete(`${environment.SERVER_URL}/api/utilisateur/notification/all`);
  }
}
