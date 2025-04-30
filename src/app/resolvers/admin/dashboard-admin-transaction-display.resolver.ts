import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { AdminTransactionService } from '../../services/admin/admin-transaction.service';
import { Observable } from 'rxjs';
import { Transaction } from '../../types/Transaction';

export const dashboardAdminTransactionDisplayResolver: ResolveFn<
  Observable<Transaction[]>
> = () => {
  const transactionService = inject(AdminTransactionService);

  return transactionService.refreshTransactionForDisplay();
};
