import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminTransactionService } from '../../../../../services/admin/admin-transaction.service';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-create-transaction',
  imports: [
    Button,
    FormsModule,
    ReactiveFormsModule,
    Select,
  ],
  templateUrl: './create-transaction.component.html',
})
export class CreateTransactionComponent {
  formGroup!: FormGroup;

  constructor(
    private adminTransactionService: AdminTransactionService,
    private messageService :MessageService
  ) {
    this.formGroup = new FormGroup({
      uuidUser: new FormControl('', [Validators.required]),
      uuidWebsiteContract: new FormControl('', [Validators.required]),
    })
  }

  getUsers() {
    return this.adminTransactionService.TransactionUsers().map((transaction)=>{
      return {name:transaction.email, value: transaction.uuid};
    })
  }
  getContract() {
    const contract = this.adminTransactionService.TransactionUsers().filter((transaction) => {
      return transaction.uuid === this.formGroup.get('uuidUser')?.value;
    });

    let options = [];

    for (const transaction of contract) {
      if (transaction.websiteContracts && Array.isArray(transaction.websiteContracts)) {
        for (const webContract of transaction.websiteContracts) {
          options.push({ name: webContract.name, value: webContract.uuid });
        }
      }
    }

    return options;
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulaire invalide',
      })
      return;
    }

    const payload = {
      uuidUser: this.formGroup.get('uuidUser')?.value,
      uuidWebsiteContract: this.formGroup.get('uuidWebsiteContract')?.value,
    }

    this.adminTransactionService.createtransaction(payload).subscribe({
      next: (result) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
        });
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error de création de la transaction',
        })
      }
    })
  }
}
