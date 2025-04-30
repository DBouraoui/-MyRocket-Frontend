import { Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environment';
import { Observable, tap } from 'rxjs';
import { Transaction, TransactionUser } from '../../types/Transaction';

@Injectable({
  providedIn: 'root'
})
export class AdminTransactionService {
  TransactionUsers: WritableSignal<TransactionUser[]> = signal([]);
  TransactionToDisplay: WritableSignal<Transaction[]> = signal([])

  constructor(private http: HttpClient) { }

  fetchTransactions(): Observable<TransactionUser[]> {
    return this.http.get<TransactionUser[]>(`${environment.SERVER_URL}/api/administrateur/transaction/user`);
  }

  refreshTransactions(): Observable<TransactionUser[]> {
    return this.fetchTransactions().pipe(
      tap((transactions: TransactionUser[]) => {
        this.TransactionUsers.set(transactions);
      })
    )
  }

  fetchTransactionTodisplay():Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${environment.SERVER_URL}/api/administrateur/transaction`,{
      params: {
        fromAllUser:true
      }
    });
  }

  refreshTransactionForDisplay():Observable<Transaction[]> {
      return this.fetchTransactionTodisplay().pipe(
        tap((trans:Transaction[])=>{
          this.TransactionToDisplay.set(trans);
        })
      )
  }

  createtransaction(payload : Object) {
    return this.http.post<Object>(`${environment.SERVER_URL}/api/administrateur/transaction`, payload);
  }


}
