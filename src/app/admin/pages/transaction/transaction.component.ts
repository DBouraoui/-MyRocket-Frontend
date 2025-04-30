import { Component } from '@angular/core';
import { AdminTransactionService } from '../../../services/admin/admin-transaction.service';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Select } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { CreateTransactionComponent } from './components/create-transaction/create-transaction.component';
import { DisplayTransactionComponent } from './components/display-transaction/display-transaction.component';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CreateTransactionComponent,
    DisplayTransactionComponent,
  ],
  templateUrl: './transaction.component.html',
})
export class TransactionComponent {}
