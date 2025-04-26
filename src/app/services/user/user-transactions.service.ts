import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Transaction } from '../../types/Transaction';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root',
})
export class UserTransactionsService {
  transactions: WritableSignal<Transaction[]> = signal([]);

  constructor(private http: HttpClient) {}

  fetchTransaction(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.SERVER_URL}/api/transaction/me`);
  }

  refreshTransaction(): Observable<Transaction[]> {
    return this.fetchTransaction().pipe(
      tap(transactions => {
        this.transactions.set(transactions);
      })
    );
  }
}
