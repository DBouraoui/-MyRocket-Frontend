import { Component, inject } from '@angular/core';
import { AdminContactsService } from '../../../../services/admin/admin-contacts.service';
import { Button } from 'primeng/button';
import { GalleriaModule } from 'primeng/galleria';
import { Contact } from '../../../../types/Contact';
import { Drawer } from 'primeng/drawer';
import { TabPanel, TabView } from 'primeng/tabview';
import { Card } from 'primeng/card';
import { Tag } from 'primeng/tag';
import { Panel } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { Inplace } from 'primeng/inplace';
import { MessageService } from 'primeng/api';
import { wording } from '../../../../../../environment';

@Component({
  selector: 'app-display',
  imports: [
    Button,
    GalleriaModule,
    Drawer,
    TabPanel,
    TabView,
    Card,
    Tag,
    Panel,
    MessagesModule,
    Inplace,
  ],
  templateUrl: './display.component.html',
})
export class DisplayComponent {
  adminContactService = inject(AdminContactsService);
  messageService = inject(MessageService);
  visibility: boolean = false;
  displayContact: Contact | null = null;

  showDetail(contact: Contact) {
    this.visibility = true;
    this.displayContact = contact;
  }

  handleDelete(contact: Contact) {
    this.adminContactService.deleteContact(contact).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: wording.CONTACT_SUCCESS_DELETE,
        });
        this.visibility = false;
        this.adminContactService.refreshContacts().subscribe();
      },
      error: err => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: wording.ERROR,
        });
      },
    });
  }
}
