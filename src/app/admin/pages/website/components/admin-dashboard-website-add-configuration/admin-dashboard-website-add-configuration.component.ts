import { Component } from '@angular/core';
import { AdminWebsiteService } from '../../../../../services/admin/admin-website.service';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { Button } from 'primeng/button';
import { SelectButton } from 'primeng/selectbutton';

@Component({
  selector: 'app-admin-dashboard-website-add-configuration',
  imports: [IftaLabel, InputText, Select, Button, ReactiveFormsModule, FormsModule, SelectButton],
  templateUrl: './admin-dashboard-website-add-configuration.component.html',
})
export class AdminDashboardWebsiteAddConfigurationComponent {
  formGroup!: FormGroup;
  typeOption = [
    {
      label: 'VPS',
      value: true,
    },
    {
      label: 'Mutualisé',
      value: false,
    },
  ];

  constructor(
    private websiteService: AdminWebsiteService,
    private messageService: MessageService
  ) {
    this.formGroup = new FormGroup({
      uuidWebsite: new FormControl('', [Validators.required]),
      username: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      port: new FormControl('', Validators.required),
      publicKey: new FormControl(''),
      isVps: new FormControl(false, Validators.required),
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

    if (this.formGroup.get('isVps')?.value) {
      const payload = {
        uuidWebsite: this.formGroup.get('uuidWebsite')?.value,
        username: this.formGroup.get('username')?.value,
        address: this.formGroup.get('address')?.value,
        password: this.formGroup.get('password')?.value,
        port: this.formGroup.get('port')?.value,
        publicKey: this.formGroup.get('publicKey')?.value,
      };

      this.websiteService.createWebsiteVps(payload).subscribe({
        next: result => {
          this.messageService.add({
            severity: 'success',
            summary: 'Config VPS créer',
          });
        },
        error: error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Soumission invalide une config existe déja peut être',
          });
        },
      });
    } else {
      const payload = {
        uuidWebsite: this.formGroup.get('uuidWebsite')?.value,
        username: this.formGroup.get('username')?.value,
        address: this.formGroup.get('address')?.value,
        password: this.formGroup.get('password')?.value,
        port: this.formGroup.get('port')?.value,
      };

      this.websiteService.createWebsiteMutualised(payload).subscribe({
        next: result => {
          this.messageService.add({
            severity: 'success',
            summary: 'Config Mutualiser créer',
          });
        },
        error: error => {
          this.messageService.add({
            severity: 'error',
            summary: 'Soumission invalide une config existe déja peut être',
          });
        },
      });
    }
  }

  getWebsite() {
    return this.websiteService.website().map(web => {
      return { name: web.title, value: web.uuid };
    });
  }
}
