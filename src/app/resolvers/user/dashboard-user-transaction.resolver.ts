import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { Transaction } from '../../types/Transaction';
import { inject } from '@angular/core';
import { UserTransactionsService } from '../../services/user/user-transactions.service';

export const dashboardUserTransactionResolver: ResolveFn<Observable<Transaction[]>> = (
) => {
  const transactionService = inject(UserTransactionsService);

  return transactionService.refreshTransaction();
};
