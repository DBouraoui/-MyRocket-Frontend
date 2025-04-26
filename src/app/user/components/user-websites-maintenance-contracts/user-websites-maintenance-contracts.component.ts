import {Component, inject} from '@angular/core';
import {UserWebsitesService} from '../../../services/user/user-websites.service';

@Component({
  selector: 'app-user-websites-maintenance-contracts',
  imports: [],
  templateUrl: './user-websites-maintenance-contracts.component.html',
})
export class UserWebsitesMaintenanceContractsComponent {
websiteService = inject(UserWebsitesService);

  countMaintenanceContracts():number {
    return this.websiteService.maintenanceContract().length;
  }

  middleCostmaintenanceContract() {
    if (!this.websiteService.maintenanceContract() || this.websiteService.maintenanceContract().length === 0) {
      return "0";
    }

    const total = this.websiteService.maintenanceContract().reduce((sum, maintenanceContract) => {
      const cost = maintenanceContract.monthlyCost;
      return sum + (isNaN(cost) ? 0 : cost);
    }, 0);

    return (((Math.round(total * 100) / 100) / this.countMaintenanceContracts())).toFixed(2);
  }

  getLastContracts() {
   return this.websiteService.maintenanceContract()[this.websiteService.maintenanceContract().length - 1].createdAt;
  }

}
