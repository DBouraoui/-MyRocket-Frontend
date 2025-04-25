import {Component, inject} from '@angular/core';
import {UserWebsitesService} from '../../../services/user/user-websites.service';

@Component({
  selector: 'app-user-websites-informations',
  imports: [],
  templateUrl: './user-websites-informations.component.html',
})
export class UserWebsitesInformationsComponent {
 websiteService = inject(UserWebsitesService);

 countWebsites(): number {
   return this.websiteService.website().length;
 }

 countWebsitesActif(): number {
    return this.websiteService.website().filter((website) => {
      return website.status === "active";
    }).length;
 }

 countWebsiteMutualised():number {
   return this.websiteService.website().filter((website)=> website.type == "mutualised").length;
 }

  countWebsiteVps():number {
    return this.websiteService.website().filter((website)=> website.type == "vps").length;
  }

}
