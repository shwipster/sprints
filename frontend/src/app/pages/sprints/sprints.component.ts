import { Component, Input, OnInit } from '@angular/core';
import { ProjectsService } from '../../services/projects/projects.service';
import { ActivatedRoute } from '@angular/router';
import { SprintsService } from '../../services/sprints/sprints.service';
import { SprintModel } from '../../services/sprints/sprint.model';
import { NgFor } from '@angular/common';
import { SprintItemComponent } from './sprint-item/sprint-item.component';

@Component({
  selector: 'app-sprints',
  standalone: true,
  imports: [NgFor, SprintItemComponent],
  templateUrl: './sprints.component.html',
  styleUrl: './sprints.component.css'
})
export class SprintsComponent implements OnInit {

  @Input() id!: string;

  public sprints: SprintModel[] = [];
  public sprints2: SprintModel[] = [];

  constructor(
    private projectsService: ProjectsService,
    private sprintsService: SprintsService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    console.log("init");
    //this.projectId = this.activatedRoute.snapshot.params["id"];
    console.log(this.id);

    this.sprintsService.changed(this.changed.bind(this)).fetch();
  }

  changed() {
    console.log("changed");
    this.sprints = this.sprintsService.get(this.id);
    this.sprints2 = this.sprintsService.get(this.id);
  }

  ngOnDestroy() {

  }
}
