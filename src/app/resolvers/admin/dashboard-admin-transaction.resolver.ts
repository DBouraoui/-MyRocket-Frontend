import { ResolveFn } from '@angular/router';
import { Observable } from 'rxjs';
import { TransactionUser } from '../../types/Transaction';
import { inject } from '@angular/core';
import { AdminTransactionService } from '../../services/admin/admin-transaction.service';

export const dashboardAdminTransactionResolver: ResolveFn<Observable<TransactionUser[]>> = () => {
  const transactionService = inject(AdminTransactionService);

  return transactionService.refreshTransactions();
};
