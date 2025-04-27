import { Component } from '@angular/core';
import { AdminWebsiteService } from '../../../../../services/admin/admin-website.service';
import { MessageService } from 'primeng/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { DatePicker } from 'primeng/datepicker';
import { IftaLabel } from 'primeng/iftalabel';

@Component({
  selector: 'app-admin-dashboard-website-maintenance',
  imports: [Select, InputText, ReactiveFormsModule, Button, DatePicker, IftaLabel],
  templateUrl: './admin-dashboard-website-maintenance.component.html',
})
export class AdminDashboardWebsiteMaintenanceComponent {
  formGroup!: FormGroup;
  reccurence = [
    {
      name: 'Mensuel',
      value: 'monthly',
    },
    {
      name: 'Annual',
      value: 'yearly',
    },
  ];

  constructor(
    private adminWebsiteService: AdminWebsiteService,
    private messageService: MessageService
  ) {
    this.formGroup = new FormGroup({
      reccurence: new FormControl('', [Validators.required]),
      monthlyCost: new FormControl('', [Validators.required]),
      uuidWebsite: new FormControl('', [Validators.required]),
      endAt: new FormControl(Date, [Validators.required]),
      startAt: new FormControl(Date, [Validators.required]),
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulaire invalide',
      });
      return;
    }

    const startAtDate = this.formGroup.get('startAt')?.value;

    const formattedStartAt = startAtDate
      ? `${startAtDate.getFullYear()}/${(startAtDate.getMonth() + 1).toString().padStart(2, '0')}/${startAtDate.getDate().toString().padStart(2, '0')}`
      : null;

    // Set firstPaymentAt to be the same as startAt
    const firstPaymentAtDate = startAtDate ? new Date(startAtDate) : null;

    // Set nextPaymentAt to be firstPaymentAt + 30 days
    const nextPaymentAtDate = firstPaymentAtDate ? new Date(firstPaymentAtDate) : null;
    if (nextPaymentAtDate) {
      nextPaymentAtDate.setDate(nextPaymentAtDate.getDate() + 30);
    }

    // Format the dates for the payload
    const formattedFirstPaymentAt = firstPaymentAtDate
      ? `${firstPaymentAtDate.getFullYear()}/${(firstPaymentAtDate.getMonth() + 1).toString().padStart(2, '0')}/${firstPaymentAtDate.getDate().toString().padStart(2, '0')}`
      : null;

    const formattedNextPaymentAt = nextPaymentAtDate
      ? `${nextPaymentAtDate.getFullYear()}/${(nextPaymentAtDate.getMonth() + 1).toString().padStart(2, '0')}/${nextPaymentAtDate.getDate().toString().padStart(2, '0')}`
      : null;

    const payload: object = {
      uuidWebsite: this.formGroup.get('uuidWebsite')?.value,
      reccurence: this.formGroup.get('reccurence')?.value,
      monthlyCost: this.formGroup.get('monthlyCost')?.value,
      endAt: this.formGroup.get('endAt')?.value,
      startAt: formattedStartAt,
      firstPaymentAt: formattedFirstPaymentAt,
      nextPaymentAt: formattedNextPaymentAt,
    };

    this.adminWebsiteService.createMaintenanceContract(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Contrat de maintenance Créer',
        });
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error de création du contrat de maintenance',
        });
        console.log(err);
      },
    });
  }

  getWebsite() {
    return this.adminWebsiteService.website().map(web => {
      return { name: web.title, value: web.uuid };
    });
  }
}
