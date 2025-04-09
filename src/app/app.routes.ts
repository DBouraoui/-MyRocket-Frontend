import { Routes } from '@angular/router';
import { AnonymousComponent } from './layout/anonymous/anonymous.component';
import {HomeComponent} from './anonymous/pages/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: AnonymousComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'MyRocket',
      },
    ],
  },
];
