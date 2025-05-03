import { Component, inject } from '@angular/core';
import { AdminWebsiteService } from '../../../../../services/admin/admin-website.service';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-admin-dashboard-website-add-contract',
  imports: [Select, DatePicker, IftaLabel, InputText, ReactiveFormsModule, Button],
  templateUrl: './admin-dashboard-website-add-contract.component.html',
})
export class AdminDashboardWebsiteAddContractComponent {
  websiteService = inject(AdminWebsiteService);
  formGroup!: FormGroup;
  reccurence = [
    {
      name: 'Mensuel',
      value: 'monthly',
    },
    {
      name: 'Annuel',
      value: 'annual',
    },
  ];
  tva = [
    {
      name: '0%',
      value: '0',
    },
    {
      name: '5.5%',
      value: '5.5',
    },
    {
      name: '10%',
      value: '10',
    },
    {
      name: '20%',
      value: '20',
    },
  ];

  constructor(private messageService: MessageService) {
    this.formGroup = new FormGroup({
      uuidWebsite: new FormControl('', [Validators.required]),
      prestation: new FormControl('', [Validators.required]),
      reccurence: new FormControl('', [Validators.required]),
      tva: new FormControl('', [Validators.required]),
      annualCost: new FormControl('', [Validators.required]),
      firstPaymentAt: new FormControl(Date, [Validators.required]),
    });
  }

  getWebsite() {
    return this.websiteService.website().map(web => {
      return { name: web.title, value: web.uuid };
    });
  }

  onSubmit() {
    if (this.formGroup.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulaire invalid',
      });
      return;
    }

    const firstPaymentDate = this.formGroup.get('firstPaymentAt')?.value;

    const payload = {
      uuidWebsite: this.formGroup.get('uuidWebsite')?.value,
      prestation: this.formGroup.get('prestation')?.value,
      reccurence: this.formGroup.get('reccurence')?.value,
      tva: this.formGroup.get('tva')?.value,
      annualCost: this.formGroup.get('annualCost')?.value,
      firstPaymentAt: this.formatDate(firstPaymentDate),
      lastPaymentAt: this.formatDate(firstPaymentDate),
      nextPaymentAt: this.getNextPaymentDate(),
    };

    this.websiteService.createWebsiteContract(payload).subscribe({
      next: data => {
        this.messageService.add({
          severity: 'success',
          summary: 'Contrat créer avec succes',
        });
        this.formGroup.reset();
      },
      error: error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur de création du contrat',
        });
      },
    });
  }

  formatDate(date: Date): string {
    if (!date) return '';

    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}/${mm}/${dd}`;
  }

  getNextPaymentDate(): string {
    // Il y avait une faute de frappe ici : 'firstpaymentAt' au lieu de 'firstPaymentAt'
    const firstPaymentDate = this.formGroup.get('firstPaymentAt')?.value;

    if (firstPaymentDate) {
      const nextPaymentDate = new Date(firstPaymentDate);
      nextPaymentDate.setDate(nextPaymentDate.getDate() + 30);

      // Formatage au format yyyy/mm/dd
      const yyyy = nextPaymentDate.getFullYear();
      const mm = String(nextPaymentDate.getMonth() + 1).padStart(2, '0');
      const dd = String(nextPaymentDate.getDate()).padStart(2, '0');

      return `${yyyy}/${mm}/${dd}`;
    }
    return ''; // ou une valeur par défaut
  }
}
