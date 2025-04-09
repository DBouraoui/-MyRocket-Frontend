import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {SelectButton} from 'primeng/selectbutton';
import {MessageService} from 'primeng/api';
import {Button} from 'primeng/button';
import {HttpClient} from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {IftaLabel} from 'primeng/iftalabel';
import {Checkbox} from 'primeng/checkbox';
import {MultiSelect} from 'primeng/multiselect';
import {FileUpload, FileUploadHandlerEvent} from 'primeng/fileupload';

interface Tag {
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    InputText,
    SelectButton,
    FormsModule,
    ReactiveFormsModule,
    Button,
    IftaLabel,
    Checkbox,
    MultiSelect,
    FileUpload,
    FileUpload
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}

  formGroup!: FormGroup;
  isLoading: boolean = false;
  stateOptions: any[] = [
    { label: 'Particulier', value: false },
    { label: 'Entreprise', value: true }
  ];
  tags: Tag[] = [
    { name: 'Site vitrine' },
    { name: 'Application web' },
    { name: 'E-commerce' },
    { name: 'Back office' },
    { name: 'SEO' },
    { name: 'Déploiement' },
    { name: 'Hébergement'},
    { name: 'Conseil'},
    { name: 'Développement mobile' },
    { name: 'Maintenance' },
    { name: 'Optimisation de performance' },
    { name: 'Intégration API' },
    { name: 'Gestion de contenu (CMS)' },
    { name: 'Demande de freelance' },
  ];

  ngOnInit() {
    this.formGroup = new FormGroup({
      isCompany: new FormControl(false),
      firstname: new FormControl(""),
      lastname: new FormControl(""),
      companyName: new FormControl(""),
      email: new FormControl("", [Validators.required, Validators.email, Validators.maxLength(200)]),
      title: new FormControl("",[Validators.required, Validators.maxLength(200)]),
      description: new FormControl("",[Validators.required, Validators.maxLength(255)]),
      tags: new FormControl("", [Validators.required]),
      cgv: new FormControl(false, [Validators.required]),
      pictures: new FormControl(File),
    });

    this.formGroup.get('isCompany')?.valueChanges.subscribe(isCompany => {
      if (isCompany) {
        this.formGroup.get('companyName')?.setValidators([Validators.required,Validators.maxLength(200)]);
        this.formGroup.get('firstname')?.clearValidators();
        this.formGroup.get('firstname')?.reset();
        this.formGroup.get('lastname')?.clearValidators();
        this.formGroup.get('lastname')?.reset();
      } else {
        this.formGroup.get('companyName')?.clearValidators();
        this.formGroup.get('companyName')?.reset();
        this.formGroup.get('firstname')?.setValidators([Validators.required,Validators.maxLength(200)]);
        this.formGroup.get('lastname')?.setValidators([Validators.required,Validators.maxLength(200)]);
      }

      this.formGroup.get('companyName')?.updateValueAndValidity();
      this.formGroup.get('firstname')?.updateValueAndValidity();
      this.formGroup.get('lastname')?.updateValueAndValidity();
    });

  }

  customUpload($event: FileUploadHandlerEvent) {
    if ($event.files && $event.files[0]) {
      const file = $event.files[0];

      this.formGroup.get('pictures')?.setValue(file);

      console.log('File uploaded:', file.name);
    }
    console.log('File uploaded: aucun');
  }

  onSubmit() {
  this.isLoading = true;

    if (this.formGroup.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Le formuler est invalide',
        detail: 'Certain champs sont incorrect et/ou manquant',
      });
      this.formGroup.markAsTouched();
      return;
    }

    const formData = new FormData();

    formData.append('firstname', this.formGroup.get('firstname')?.value);
    formData.append('lastname', this.formGroup.get('lastname')?.value);
    formData.append('companyName', this.formGroup.get('companyName')?.value);
    formData.append('email', this.formGroup.get('email')?.value);
    formData.append('title', this.formGroup.get('title')?.value);
    formData.append('description', this.formGroup.get('description')?.value);
    formData.append('tags', this.formGroup.get('tags')?.value);

    if (this.formGroup.get('pictures')?.value) {
      formData.append('pictures', this.formGroup.get('pictures')?.value);
    }

    this.http.post('http://localhost:8000/api/contact', formData).subscribe({
      next: (res)=>{
        this.messageService.add({
          severity: 'success',
          summary: 'Le formulaire a été soumis',
          detail: 'On est bon',
        });
        this.formGroup.reset();
        this.formGroup.get('isCompany')?.setValue(false);
      },
      error: (err)=>{
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur de soumission',
          detail: 'Le formulaire n\'a pas été soumis une erreur est survenu',
        });
      }
    })

  }

  normalizeTags(tags: Tag[]): string[] {
      return tags.map(tag => tag.name);
  }
}
