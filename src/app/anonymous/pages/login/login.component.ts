import {Component, OnDestroy, OnInit} from '@angular/core';
import {IftaLabel} from 'primeng/iftalabel';
import {InputText} from 'primeng/inputtext';
import {Password} from 'primeng/password';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import { ButtonDirective} from 'primeng/button';
import {HttpClient} from '@angular/common/http';
import {MessageService} from 'primeng/api';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {LoginResponse} from '../../../types/HttpResponse';

@Component({
  selector: 'app-login',
  imports: [
    IftaLabel,
    InputText,
    Password,
    NgIf,
    ReactiveFormsModule,
    ButtonDirective
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit, OnDestroy {
  formData!: FormGroup;
  loginRequest!: Subscription;
  isLoading = false;

  constructor(private http :HttpClient, private messageService: MessageService, private router : Router) {
  }

  ngOnInit() {
    this.formData = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    this.isLoading = true;
    if (this.formData.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulaire incorrect',
        detail: 'Le formulaire n\'est pas valide'
      })
      this.formData.markAsTouched();
      return;
    }

    const credentials = {
      email: this.formData.get('email')?.value,
      password: this.formData.get('password')?.value,
    }

     this.loginRequest = this.http.post<LoginResponse>('http://localhost:8000/api/login_check', credentials).subscribe({
      next: (response: LoginResponse) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Connexion réussie !'
        });
        this.isLoading = false;
        localStorage.setItem('statement',response.token);
        this.router.navigate(['/utilisateur/dashboard']);
      },
      error: (error:any) => {
        console.error('Erreur de connexion:', error);

        let errorMessage = 'Si l\'erreur persiste, veuillez contacter le support';

        if (error.status === 401) {
          errorMessage = 'Email ou mot de passe incorrect';
        } else if (error.status === 0) {
          errorMessage = 'Serveur inaccessible, veuillez vérifier votre connexion';
        }

        this.messageService.add({
          severity: 'error',
          summary: 'Erreur de connexion',
          detail: errorMessage
        });
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.loginRequest) {
      this.loginRequest.unsubscribe();
    }
    this.formData.reset();
  }
}
