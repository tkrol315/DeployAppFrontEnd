import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';

export const routes: Routes = [
    { path: 'dashboard',component: DashboardComponent, title: 'Dashboard'},
    { path: 'projects', component: ProjectsComponent, title: 'Projects'},
    { path:'projects/:id', component:ProjectDetailsComponent, title: 'Project details'},
    { path:'', redirectTo: 'dashboard', pathMatch:'full'},
    { path: '**', component: NotFoundComponent, title: 'Page not found'}
];
