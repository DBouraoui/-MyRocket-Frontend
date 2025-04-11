import {Injectable, signal, WritableSignal} from '@angular/core';
import {Contact, ContactsResponse} from '../types/Contact';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminContactsService {
  contacts: WritableSignal<Contact[]> = signal([]);

  constructor(private http: HttpClient) {}

  fetchContacts(): Observable<ContactsResponse> {
    return this.http.get<ContactsResponse>('http://localhost:8000/api/contact', {
      params: {
        all: true,
        withImageUrls: true
      }
    });
  }

  deleteContact(contact: Contact): Observable<Contact> {
   return this.http.delete<Contact>('http://localhost:8000/api/contact', {
      params: {
        uuid: contact.uuid
      }
    })
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
