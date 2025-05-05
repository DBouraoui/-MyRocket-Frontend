import { Component } from '@angular/core';
import { AdminTransactionService } from '../../../../../services/admin/admin-transaction.service';
import { PrimeTemplate } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-display-transaction',
  imports: [PrimeTemplate, TableModule, CurrencyPipe],
  templateUrl: './display-transaction.component.html',
})
export class DisplayTransactionComponent {
  constructor(public transactionService: AdminTransactionService) {}
}
