import { Component } from '@angular/core';
import { UserWebsitesService } from '../../../services/user/user-websites.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Website } from '../../../types/Website';
import { NgClass, NgIf } from '@angular/common';
import { Tag } from 'primeng/tag';
import { TabPanel, TabView } from 'primeng/tabview';
import { Button, ButtonDirective } from 'primeng/button';
import { Drawer } from 'primeng/drawer';
import { MessageService } from 'primeng/api';
import { wording } from '../../../../../environment';

@Component({
  selector: 'app-user-websites-display',
  imports: [NgIf, Tag, TabView, TabPanel, ButtonDirective, Drawer, NgClass, Button],
  templateUrl: './user-websites-display.component.html',
})
export class UserWebsitesDisplayComponent {
  sidebarVisible: boolean = false;
  selectedWebsite: Website | null = null;

  constructor(
    public websiteService: UserWebsitesService,
    private sanitizer: DomSanitizer,
    private messageService: MessageService
  ) {}

  openWebsiteDetails(website: Website): void {
    this.selectedWebsite = website;
    this.sidebarVisible = true;
  }

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  }

  getSafeUrl(url: string): SafeResourceUrl {
    // Assurez-vous que l'URL est complète
    if (!url.startsWith('http') && !url.startsWith('https')) {
      url = 'https://' + url;
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getStatusBadgeClass(status: string): string {
    const baseClasses = 'bg-opacity-85 text-white';

    switch (status) {
      case 'active':
        return `${baseClasses} bg-green-600`;
      case 'inactive':
        return `${baseClasses} bg-red-600`;
      case 'pending':
        return `${baseClasses} bg-yellow-500`;
      case 'maintenance':
        return `${baseClasses} bg-blue-600`;
      default:
        return `${baseClasses} bg-gray-600`;
    }
  }

  getTypeBadgeClass(type: string): string {
    const baseClasses = 'bg-opacity-85 text-white';

    switch (type) {
      case 'mutualised':
        return `${baseClasses} bg-indigo-600`;
      case 'vps':
        return `${baseClasses} bg-teal-600`;
      default:
        return `${baseClasses}`;
    }
  }

  getInformationConnexionByEmail(uuid: string): void {
    this.websiteService.getInformationWebsiteByEmail(uuid).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'info',
          summary: wording.EMAIL_SENDING,
        });
      },
      error: () => {
        this.messageService.add({
          severity: 'error',
          summary: wording.ERROR,
        });
      },
    });
  }
}
