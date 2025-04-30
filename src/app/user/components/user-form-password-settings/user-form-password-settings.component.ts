import { Component, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { IftaLabel } from 'primeng/iftalabel';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { Password } from 'primeng/password';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { MessageService } from 'primeng/api';
import { UserSettingsService } from '../../../services/user/user-settings.service';
import { NgIf } from '@angular/common';
import { tap } from 'rxjs';
import { wording } from '../../../../../environment';

@Component({
  selector: 'app-user-form-password-settings',
  imports: [Button, IftaLabel, IconField, InputIcon, Password, Checkbox, ReactiveFormsModule, NgIf],
  templateUrl: './user-form-password-settings.component.html',
})
export class UserFormPasswordSettingsComponent implements OnInit {
  messageService = inject(MessageService);
  userSettingsService = inject(UserSettingsService);
  isPasswordDifferent: boolean = true;
  isLoading: boolean = false;
  formGroup!: FormGroup;

  ngOnInit() {
    this.formGroup = new FormGroup({
      oldPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required]),
      confirmationNewPassword: new FormControl('', [Validators.required]),
      isUserSureToChangePassword: new FormControl(false, [Validators.required]),
    });

    this.formGroup
      .get('newPassword')
      ?.valueChanges.pipe(
        tap(password => {
          this.isPasswordDifferent = password != this.formGroup.get('oldPassword')?.value;
        })
      )
      .subscribe();
  }

  onSubmit() {
    this.isLoading = true;
    if (this.formGroup.invalid || !this.isPasswordDifferent) {
      this;
      this.messageService.add({
        severity: 'warn',
        summary: wording.INVALID_FORM,
      });
      this.isLoading = false;
      return;
    }

    const payload = {
      uuid: this.userSettingsService.user()?.uuid,
      oldPassword: this.formGroup.get('oldPassword')?.value,
      newPassword: this.formGroup.get('newPassword')?.value,
    };

    this.userSettingsService.updatePassword(payload).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: wording.PASSWORD_MODIFIED,
        });
        this.isLoading = false;
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: wording.PASSWORD_NOT_VALIDE,
        });
        this.isLoading = false;
        console.log(err);
      },
    });
  }
}
