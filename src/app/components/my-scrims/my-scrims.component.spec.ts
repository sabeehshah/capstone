import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyScrimsComponent } from './my-scrims.component';

describe('MyScrimsComponent', () => {
  let component: MyScrimsComponent;
  let fixture: ComponentFixture<MyScrimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyScrimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyScrimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
