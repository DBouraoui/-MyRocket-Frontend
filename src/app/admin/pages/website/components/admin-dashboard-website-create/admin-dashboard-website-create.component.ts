import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminUsersService } from '../../../../../services/admin/admin-users.service';
import { MessageService } from 'primeng/api';
import { Select } from 'primeng/select';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { AdminWebsiteService } from '../../../../../services/admin/admin-website.service';

@Component({
  selector: 'app-admin-dashboard-website-create',
  imports: [Select, IftaLabel, InputText, Button, ReactiveFormsModule],
  templateUrl: './admin-dashboard-website-create.component.html',
})
export class AdminDashboardWebsiteCreateComponent {
  formGroupe!: FormGroup;
  websiteType = [
    {
      name: 'Mutualisé',
      value: 'mutualised',
    },
    {
      name: 'VPS',
      value: 'vps',
    },
  ];
  websiteStatus = [
    {
      name: 'Actif',
      value: 'active',
    },
    {
      name: 'Inacatif',
      value: 'inactive',
    },
    {
      name: 'En creation',
      value: 'pending',
    },
    {
      name: 'En maintenance',
      value: 'maintenance',
    },
  ];

  constructor(
    private userService: AdminUsersService,
    private messageService: MessageService,
    private adminService: AdminWebsiteService
  ) {
    this.formGroupe = new FormGroup({
      uuidUser: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
    });
  }

  getUsers() {
    return this.userService.users().map(user => {
      return { name: user.email, value: user.uuid };
    });
  }

  onSubmit() {
    if (this.formGroupe.invalid) {
      this.messageService.add({
        severity: 'error',
        summary: 'Formulaire invalid',
      });
      return;
    }

    const payload = {
      uuidUser: this.formGroupe.get('uuidUser')?.value,
      title: this.formGroupe.get('title')?.value,
      description: this.formGroupe.get('description')?.value,
      url: 'http://www.' + this.formGroupe.get('url')?.value,
      status: this.formGroupe.get('status')?.value,
      type: this.formGroupe.get('type')?.value,
    };

    this.adminService.createWebsite(payload).subscribe({
      next: result => {
        this.messageService.add({
          severity: 'success',
          summary: 'Site web créer',
        });
        this.formGroupe.reset();
      },
      error: error => {
        console.log(error);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur de création du site web',
        });
      },
    });
  }
}
