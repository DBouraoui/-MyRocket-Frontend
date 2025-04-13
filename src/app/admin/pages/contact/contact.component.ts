import {Component} from '@angular/core';
import {DisplayComponent} from './display/display.component';

@Component({
  selector: 'app-contact',
  imports: [
    DisplayComponent
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
}
