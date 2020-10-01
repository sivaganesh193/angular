import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationModelComponent } from './education-model.component';

describe('EducationModelComponent', () => {
  let component: EducationModelComponent;
  let fixture: ComponentFixture<EducationModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EducationModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EducationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
