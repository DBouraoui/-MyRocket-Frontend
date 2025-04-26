import { Component } from '@angular/core';
import { AnonymousContactFormComponent } from '../../components/anonymous-contact-form/anonymous-contact-form.component';

@Component({
  selector: 'app-contact',
  imports: [AnonymousContactFormComponent],
  templateUrl: './contact.component.html',
})
export class ContactComponent {}
