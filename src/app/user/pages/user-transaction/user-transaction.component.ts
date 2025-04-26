import { Component, inject } from '@angular/core';
import { UserTransactionsService } from '../../../services/user/user-transactions.service';
import { Transaction } from '../../../types/Transaction';
import { DropdownModule } from 'primeng/dropdown';
import { Dialog } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { Tooltip } from 'primeng/tooltip';
import { ButtonDirective } from 'primeng/button';

@Component({
  selector: 'app-user-transaction',
  imports: [DropdownModule, Dialog, CommonModule, Tooltip, ButtonDirective],
  templateUrl: './user-transaction.component.html',
})
export class UserTransactionComponent {
  transactionService = inject(UserTransactionsService);
  transactionDetailsVisible: boolean = false;
  selectedTransaction: Transaction | null = null;
  totalTransactions: number = 0;

  sortOptions = [
    { label: 'Date (récent → ancien)', value: 'date-desc' },
    { label: 'Date (ancien → récent)', value: 'date-asc' },
    { label: 'Montant (élevé → bas)', value: 'amount-desc' },
    { label: 'Montant (bas → élevé)', value: 'amount-asc' },
  ];

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

  /**
   * Convertit une chaîne de date au format "dd-mm-yyyy HH:MM:SS" en objet Date
   */
  private parseDate(dateString: string): Date {
    // Format: "dd-mm-yyyy HH:MM:SS"
    const parts = dateString.split(' ');
    const dateParts = parts[0].split('-');
    const timeParts = parts[1]?.split(':') || ['00', '00', '00'];

    // Attention: les mois en JavaScript commencent à 0
    return new Date(
      parseInt(dateParts[2]), // année
      parseInt(dateParts[1]) - 1, // mois (0-11)
      parseInt(dateParts[0]), // jour
      parseInt(timeParts[0]), // heures
      parseInt(timeParts[1]), // minutes
      parseInt(timeParts[2]) // secondes
    );
  }

  /**
   * Affiche les détails d'une transaction
   */
  showTransactionDetails(transaction: Transaction): void {
    this.selectedTransaction = transaction;
    this.transactionDetailsVisible = true;
  }

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

  protected readonly parseInt = parseInt;
}
