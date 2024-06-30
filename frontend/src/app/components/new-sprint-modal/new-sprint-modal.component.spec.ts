import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSprintModalComponent } from './new-sprint-modal.component';

describe('NewSprintModalComponent', () => {
  let component: NewSprintModalComponent;
  let fixture: ComponentFixture<NewSprintModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSprintModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSprintModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
