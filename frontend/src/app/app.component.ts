import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NewTaskModalComponent } from './components/new-task-modal/new-task-modal.component';
import { NewSprintModalComponent } from './components/new-sprint-modal/new-sprint-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, HeaderComponent, NewTaskModalComponent, NewSprintModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
