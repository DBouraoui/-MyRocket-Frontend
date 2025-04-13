import {Component, inject} from '@angular/core';
import {AnonymousProjectsService} from '../../../services/anonymous/anonymous-projects.service';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';

@Component({
  selector: 'app-anonymous-projects-display',
  imports: [
    Button,
    RouterLink,
    Carousel,
    PrimeTemplate
  ],
  templateUrl: './anonymous-projects-display.component.html',
})
export class AnonymousProjectsDisplayComponent {
projectsService = inject(AnonymousProjectsService);

constructor() {
  console.log(this.projectsService.projects())
}
}
