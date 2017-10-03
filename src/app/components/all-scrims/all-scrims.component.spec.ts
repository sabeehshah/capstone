import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllScrimsComponent } from './all-scrims.component';

describe('AllScrimsComponent', () => {
  let component: AllScrimsComponent;
  let fixture: ComponentFixture<AllScrimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllScrimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllScrimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
