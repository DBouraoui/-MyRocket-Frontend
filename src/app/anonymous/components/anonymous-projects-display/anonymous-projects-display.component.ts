import { Component, inject } from '@angular/core';
import { AnonymousProjectsService } from '../../../services/anonymous/anonymous-projects.service';
import { Button } from 'primeng/button';
import { Carousel } from 'primeng/carousel';
import { PrimeTemplate } from 'primeng/api';
import { Drawer } from 'primeng/drawer';
import { Project } from '../../../types/Project';

@Component({
  selector: 'app-anonymous-projects-display',
  imports: [Button, Carousel, PrimeTemplate, Drawer],
  templateUrl: './anonymous-projects-display.component.html',
})
export class AnonymousProjectsDisplayComponent {
  projectsService = inject(AnonymousProjectsService);
  projectDrawerVisible: boolean = false;
  selectedProject: Project | null = null;

  constructor() {
    this.projectsService.fetchProjects().subscribe({
      next: data => {
        this.projectsService.projects.set(data)
      }
    })
  }

  openProjectDetails(project: Project): void {
    this.selectedProject = project;
    this.projectDrawerVisible = true;
  }
}
