import { Component } from '@angular/core';
import { Button } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { FileUpload, FileUploadHandlerEvent } from 'primeng/fileupload';
import { IftaLabel } from 'primeng/iftalabel';
import { InputText } from 'primeng/inputtext';
import { MultiSelect } from 'primeng/multiselect';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectButton } from 'primeng/selectbutton';
import { Textarea } from 'primeng/textarea';
import { MessageService, PrimeTemplate } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environment';
import { Drawer } from 'primeng/drawer';

interface Tag {
  name: string;
}

@Component({
  selector: 'app-anonymous-contact-form',
  imports: [
    Button,
    Checkbox,
    FileUpload,
    IftaLabel,
    InputText,
    MultiSelect,
    ReactiveFormsModule,
    SelectButton,
    Textarea,
    Drawer,
    PrimeTemplate,
  ],
  templateUrl: './anonymous-contact-form.component.html',
})
export class AnonymousContactFormComponent {
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) {}
  visible: boolean = false;
  imagePreviewUrl: string | null = null;
  formGroup!: FormGroup;
  isLoading: boolean = false;
  stateOptions: any[] = [
    { label: 'Particulier', value: false },
    { label: 'Entreprise', value: true },
  ];
  tags: Tag[] = [
    { name: 'Site vitrine' },
    { name: 'Application web' },
    { name: 'E-commerce' },
    { name: 'Back office' },
    { name: 'SEO' },
    { name: 'Déploiement' },
    { name: 'Hébergement' },
    { name: 'Conseil' },
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
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      companyName: new FormControl(''),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.maxLength(200),
      ]),
      title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      description: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      tags: new FormControl('', [Validators.required]),
      cgv: new FormControl(false, [Validators.required]),
      pictures: new FormControl(File),
    });

    this.formGroup.get('isCompany')?.valueChanges.subscribe(isCompany => {
      if (isCompany) {
        this.formGroup
          .get('companyName')
          ?.setValidators([Validators.required, Validators.maxLength(200)]);
        this.formGroup.get('firstname')?.clearValidators();
        this.formGroup.get('firstname')?.reset();
        this.formGroup.get('lastname')?.clearValidators();
        this.formGroup.get('lastname')?.reset();
      } else {
        this.formGroup.get('companyName')?.clearValidators();
        this.formGroup.get('companyName')?.reset();
        this.formGroup
          .get('firstname')
          ?.setValidators([Validators.required, Validators.maxLength(200)]);
        this.formGroup
          .get('lastname')
          ?.setValidators([Validators.required, Validators.maxLength(200)]);
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

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);

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
    const normalizedTags = this.normalizeTags(this.formGroup.get('tags')?.value);

    formData.append('firstname', this.formGroup.get('firstname')?.value);
    formData.append('lastname', this.formGroup.get('lastname')?.value);
    formData.append('companyName', this.formGroup.get('companyName')?.value);
    formData.append('email', this.formGroup.get('email')?.value);
    formData.append('title', this.formGroup.get('title')?.value);
    formData.append('description', this.formGroup.get('description')?.value);
    formData.append('tags', JSON.stringify(normalizedTags));

    if (this.formGroup.get('pictures')?.value) {
      formData.append('pictures', this.formGroup.get('pictures')?.value);
    }

    this.http.post(`${environment.SERVER_URL}/api/contact`, formData).subscribe({
      next: res => {
        this.messageService.add({
          severity: 'success',
          summary: 'Le formulaire a été soumis',
          detail: 'On est bon',
        });
        this.formGroup.reset();
        this.formGroup.get('isCompany')?.setValue(false);
        this.imagePreviewUrl = null;
      },
      error: err => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur de soumission',
          detail: "Le formulaire n'a pas été soumis une erreur est survenu",
        });
      },
    });
  }

  normalizeTags(tags: Tag[]): string[] {
    return tags.map(tag => tag.name);
  }

  openTerms(): void {
    this.visible = true;
  }

  downloadTerms(): void {
    console.log('Téléchargement des CGU');
  }

  acceptTerms(): void {
    // Cocher automatiquement la case à cocher dans le formulaire
    this.formGroup.get('cgv')?.setValue(true);
    this.visible = false;
  }
}
