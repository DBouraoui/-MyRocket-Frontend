import { Injectable, signal, WritableSignal } from '@angular/core';
import { Contact, ContactsResponse } from '../../types/Contact';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class AdminContactsService {
  contacts: WritableSignal<Contact[]> = signal([]);

  constructor(private http: HttpClient) {}

  fetchContacts(): Observable<ContactsResponse> {
    return this.http.get<ContactsResponse>(`${environment.SERVER_URL}/api/administrateur/contact`, {
      params: {
        all: true,
        withImageUrls: true,
      },
    });
  }

  deleteContact(contact: Contact): Observable<Contact> {
    return this.http.delete<Contact>(`${environment.SERVER_URL}/api/administrateur/contact`, {
      params: {
        uuid: contact.uuid,
      },
    });
  }

  refreshContacts() {
    return this.fetchContacts().pipe(
      tap(response => {
        if (response.success) {
          this.contacts.set(response.data);
        }
      })
    );
  }
}
