import {Component, inject} from '@angular/core';
import {AdminContactsService} from '../../../services/admin-contacts.service';
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
