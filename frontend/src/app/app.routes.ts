import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "projects", component: ProjectsComponent },
    { path: "projects/:id", component: ProjectsComponent },
    { path: "", component: LoginComponent },
    { path: "**", component: LoginComponent },
];