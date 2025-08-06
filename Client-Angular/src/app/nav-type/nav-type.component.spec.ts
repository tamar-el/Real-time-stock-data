import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTypeComponent } from './nav-type.component';

describe('NavTypeComponent', () => {
  let component: NavTypeComponent;
  let fixture: ComponentFixture<NavTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavTypeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
