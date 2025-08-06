import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavDaysComponent } from './nav-days.component';

describe('NavDaysComponent', () => {
  let component: NavDaysComponent;
  let fixture: ComponentFixture<NavDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavDaysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
