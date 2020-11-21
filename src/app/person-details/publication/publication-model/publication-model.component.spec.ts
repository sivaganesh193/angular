import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationModelComponent } from './publication-model.component';

describe('PublicationModelComponent', () => {
  let component: PublicationModelComponent;
  let fixture: ComponentFixture<PublicationModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicationModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
