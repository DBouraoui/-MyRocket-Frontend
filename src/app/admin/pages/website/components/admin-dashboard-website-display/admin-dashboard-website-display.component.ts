import { Component } from '@angular/core';
import { AdminWebsiteService } from '../../../../../services/admin/admin-website.service';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { NgClass, NgIf } from '@angular/common';
import { TabPanel, TabView } from 'primeng/tabview';

@Component({
  selector: 'app-admin-dashboard-website-display',
  imports: [FormsModule, DropdownModule, TableModule, NgClass, TabView, TabPanel, NgIf],
  templateUrl: './admin-dashboard-website-display.component.html',
})
export class AdminDashboardWebsiteDisplayComponent {
  expanded: { [key: string]: boolean } = {};

  constructor(public adminWebsiteService: AdminWebsiteService) {}

  toggleExpand(uuid: string): void {
    this.expanded[uuid] = !this.expanded[uuid];
  }

  getContractsCount(): number {
    let count = 0;
    this.adminWebsiteService.allInformations().forEach(info => {
      if (info.maintenanceContract) count++;
      if (info.contract) count++;
    });
    return count;
  }
}
