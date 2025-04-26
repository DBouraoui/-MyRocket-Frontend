import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, ViewportScroller } from '@angular/common';
import { AnonymousContactFormComponent } from '../../components/anonymous-contact-form/anonymous-contact-form.component';
import { AnonymousProjectsDisplayComponent } from '../../components/anonymous-projects-display/anonymous-projects-display.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AnonymousContactFormComponent,
    AnonymousProjectsDisplayComponent,
    RouterLink,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(private viewportScroller: ViewportScroller) {
  }

  scrollToSection(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }
}
