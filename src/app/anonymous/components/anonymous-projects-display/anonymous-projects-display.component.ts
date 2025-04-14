import {Component, inject} from '@angular/core';
import {AnonymousProjectsService} from '../../../services/anonymous/anonymous-projects.service';
import {Button} from 'primeng/button';
import {RouterLink} from '@angular/router';
import {Carousel} from 'primeng/carousel';
import {PrimeTemplate} from 'primeng/api';
import {Drawer} from 'primeng/drawer';
import {Project} from '../../../types/Project';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-anonymous-projects-display',
  imports: [
    Button,
    RouterLink,
    Carousel,
    PrimeTemplate,
    Drawer,
    Tooltip
  ],
  templateUrl: './anonymous-projects-display.component.html',
})
export class AnonymousProjectsDisplayComponent {
projectsService = inject(AnonymousProjectsService);
  projectDrawerVisible: boolean = false;
  selectedProject: Project | null = null;

  openProjectDetails(project: Project): void {
    this.selectedProject = project;
    this.projectDrawerVisible = true;
  }
}
