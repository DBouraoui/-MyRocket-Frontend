import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../anonymous/components/navbar/navbar.component';
import {FooterComponent} from '../../anonymous/components/footer/footer.component';
import {CookiesComponent} from '../../anonymous/components/cookies/cookies.component';

@Component({
  selector: 'app-anonymous',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, CookiesComponent],
  templateUrl: './anonymous.component.html',
})
export class AnonymousComponent {}
