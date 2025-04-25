import {Component} from '@angular/core';
import {DisplayComponent} from './display/display.component';

@Component({
  selector: 'app-admin-contact',
  imports: [
    DisplayComponent
  ],
  templateUrl: './contact.component.html',
})
export class AdminContactComponent {
}
