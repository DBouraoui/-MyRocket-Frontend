import { Component, inject } from '@angular/core';
import { UserWebsitesService } from '../../../services/user/user-websites.service';

@Component({
  selector: 'app-user-websites-contracts-informations',
  imports: [],
  templateUrl: './user-websites-contracts-informations.component.html',
})
export class UserWebsitesContractsInformationsComponent {
  websites = inject(UserWebsitesService);

  countContract(): number {
    return this.websites.contract().length;
  }

  calculatemiddleCostMonthly(): string {
    if (!this.websites.contract() || this.websites.contract().length === 0) {
      return '0';
    }

    const total = this.websites.contract().reduce((sum, contract) => {
      const cost = parseFloat(contract.monthlyCost);
      return sum + (isNaN(cost) ? 0 : cost);
    }, 0);

    return (Math.round(total * 100) / 100 / this.countContract() / 12).toFixed(2);
  }

  getLastContract() {
    if (this.websites.contract().length === 0) {
      return 'Aucun contrat';
    }
    return this.websites.contract()[this.websites.contract().length - 1].createdAt;
  }
}
