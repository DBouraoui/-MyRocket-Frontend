import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {AnonymousContactFormComponent} from '../../components/anonymous-contact-form/anonymous-contact-form.component';
import {
  AnonymousProjectsDisplayComponent
} from '../../components/anonymous-projects-display/anonymous-projects-display.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AnonymousContactFormComponent,
    AnonymousProjectsDisplayComponent,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent  {

}
