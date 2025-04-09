import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {Button} from 'primeng/button';

@Component({
  selector: 'app-error',
  imports: [
    RouterLink,
    Button
  ],
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  currentYear = new Date().getFullYear();
}
