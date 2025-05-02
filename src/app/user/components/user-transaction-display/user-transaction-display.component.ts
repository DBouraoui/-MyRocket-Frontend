import { Component, inject } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { NgIf } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { Transaction } from '../../../types/Transaction';
import { UserTransactionsService } from '../../../services/user/user-transactions.service';

@Component({
  selector: 'app-user-transaction-display',
  imports: [
    Dialog,
    NgIf,
    ButtonDirective,
    Tooltip,
  ],
  templateUrl: './user-transaction-display.component.html',
})
export class UserTransactionDisplayComponent {
  transactionService = inject(UserTransactionsService);

  protected readonly parseInt = parseInt;
  transactionDetailsVisible: boolean = false;
  selectedTransaction: Transaction | null = null;
  totalTransactions: number = 0;


  /**
   * Calcule le montant HT à partir du montant TTC et du taux de TVA
   */
  calculateHT(amount: string | number, tva: string | number): number {
    const amountNum = typeof amount === 'string' ? parseFloat(amount) : amount;
    const tvaNum = typeof tva === 'string' ? parseFloat(tva) : tva;

    return parseFloat((amountNum / (1 + tvaNum / 100)).toFixed(2));
  }

  /**
   * Calcule le montant de TVA
   */
  calculateTVA(amount: string | number, tva: string | number): number {
    const amountNum = typeof amount === 'string' ? parseFloat(amount) : amount;
    const tvaNum = typeof tva === 'string' ? parseFloat(tva) : tva;

    const ht = this.calculateHT(amountNum, tvaNum);
    return parseFloat((amountNum - ht).toFixed(2));
  }


  sortOptions = [
    { label: 'Date (récent → ancien)', value: 'date-desc' },
    { label: 'Date (ancien → récent)', value: 'date-asc' },
    { label: 'Montant (élevé → bas)', value: 'amount-desc' },
    { label: 'Montant (bas → élevé)', value: 'amount-asc' },
  ];

  /**
   * Affiche les détails d'une transaction
   */
  showTransactionDetails(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.transactionDetailsVisible = true;
  }

  downloadPDF(transaction: Transaction): void {

  }
}
