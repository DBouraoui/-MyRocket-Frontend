import {Component, inject, OnInit} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {UserSettingsService} from '../../../services/user/user-settings.service';
import {DropdownModule} from 'primeng/dropdown';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';
import {IftaLabel} from 'primeng/iftalabel';
import {IconField} from 'primeng/iconfield';
import {InputIcon} from 'primeng/inputicon';
import {Select} from 'primeng/select';
import {SelectButton} from 'primeng/selectbutton';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'app-user-form-settings',
  imports: [
    InputText,
    ReactiveFormsModule,
    DropdownModule,
    ButtonDirective,
    Ripple,
    IftaLabel,
    IconField,
    InputIcon,
    Select,
    SelectButton,
  ],
  templateUrl: './user-form-settings.component.html',
})
export class UserFormSettingsComponent implements OnInit {
  messageService = inject(MessageService);
  isLoading:boolean = false;
  countries = [
    {
      name: 'USA',
    },
    {
      name: 'France',
    },
    {
      name: 'Belgique',
    },
    {
      name: 'Suisse',
    }
  ]
  TypeOption =[
    {
      name: "Sociétée",
      value: true,
    },
    {
      name: "Particulier",
      value: false
    }
  ]
  userSettingsService = inject(UserSettingsService);
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      firstname: new FormControl(this.userSettingsService.user()?.firstname),
      lastname: new FormControl(this.userSettingsService.user()?.lastname),
      companyName: new FormControl(this.userSettingsService.user()?.companyName ),
      address: new FormControl(this.userSettingsService.user()?.address,[ Validators.required]),
      postCode: new FormControl(this.userSettingsService.user()?.postCode,[ Validators.required]),
      city: new FormControl(this.userSettingsService.user()?.city,[ Validators.required]),
      country: new FormControl({name: this.userSettingsService.user()?.country},[ Validators.required]),
      phone: new FormControl(this.userSettingsService.user()?.phone,[ Validators.required]),
      email: new FormControl(this.userSettingsService.user()?.email,[ Validators.required]),
      isCompany: new FormControl(!!this.userSettingsService.user()?.companyName,[Validators.required]),
    })
  }

  onSubmit() {
    this.isLoading = true;
    if (this.formGroup.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Les données sont invalides',
      });
      return;
    }

    const country = this.formGroup.get('country')?.value;

    const payload = {
      uuid: this.userSettingsService.user()?.uuid,
      email: this.formGroup.get('email')?.value,
      phone: this.formGroup.get('phone')?.value,
      firstname: this.formGroup.get('name')?.value,
      lastname: this.formGroup.get('name')?.value,
      companyName: this.formGroup.get('companyName')?.value,
      address: this.formGroup.get('address')?.value,
      postCode: this.formGroup.get('postCode')?.value,
      city: this.formGroup.get('city')?.value,
      country: country.name,
    }


    this.userSettingsService.updateProfile(payload).subscribe({
      next: (data) => {
        this.messageService.clear();
        this.messageService.add({
          severity: 'success',
          summary: 'Les données on étais modifiées',
        });
        this.userSettingsService.refreshInformations().subscribe();
        this.isLoading = false;
      },
      error: (error) => {
        this.messageService.clear();
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur d\'envoie des données',
        });
        this.isLoading = false;
      }
    })
  }

  rollback() {
    this.formGroup.get('email')?.setValue(this.userSettingsService.user()?.email);
    this.formGroup.get('firstname')?.setValue(this.userSettingsService.user()?.firstname);
    this.formGroup.get('lastname')?.setValue(this.userSettingsService.user()?.lastname);
    this.formGroup.get('companyName')?.setValue(this.userSettingsService.user()?.companyName);
    this.formGroup.get('address')?.setValue(this.userSettingsService.user()?.address);
    this.formGroup.get('postCode')?.setValue(this.userSettingsService.user()?.postCode);
    this.formGroup.get('city')?.setValue(this.userSettingsService.user()?.city);
    this.formGroup.get('country')?.setValue({name: this.userSettingsService.user()?.country});

    this.messageService.clear();
    this.messageService.add({
      severity: 'info',
      summary: 'Les données on été remise comme a l\'origine',
    });
  }

}
