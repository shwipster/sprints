import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { SprintsComponent } from './pages/sprints/sprints.component';

export const routes: Routes = [
    { path: "login", component: LoginComponent },
    { path: "projects", component: ProjectsComponent },
    { path: "sprints/:projectId", component: SprintsComponent },
    { path: "", component: LoginComponent },
    { path: "**", component: LoginComponent },
];