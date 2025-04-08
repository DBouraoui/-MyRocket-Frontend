import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../anonymous/components/navbar/navbar.component';

@Component({
  selector: 'app-anonymous',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './anonymous.component.html',
})
export class AnonymousComponent {}
