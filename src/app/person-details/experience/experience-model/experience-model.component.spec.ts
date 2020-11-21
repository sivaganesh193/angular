import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceModelComponent } from './experience-model.component';

describe('ExperienceModelComponent', () => {
  let component: ExperienceModelComponent;
  let fixture: ComponentFixture<ExperienceModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
