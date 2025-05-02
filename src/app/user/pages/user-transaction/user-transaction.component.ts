import { Component, inject } from '@angular/core';
import { UserTransactionsService } from '../../../services/user/user-transactions.service';
import { Transaction } from '../../../types/Transaction';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import {
  UserTransactionDisplayComponent
} from '../../components/user-transaction-display/user-transaction-display.component';

@Component({
  selector: 'app-user-transaction',
  imports: [DropdownModule, CommonModule, UserTransactionDisplayComponent],
  templateUrl: './user-transaction.component.html',
})
export class UserTransactionComponent {
  transactionService = inject(UserTransactionsService);
  protected readonly parseInt = parseInt;


  /**
   * Retourne le nombre total de transactions
   */
  countTransactions(): number {
    return this.transactionService.transactions().length;
  }

  /**
   * Retourne la transaction la plus récente
   */
  getLastTransaction(): Transaction {
    return this.transactionService.transactions()[this.countTransactions() - 1];
  }


}
