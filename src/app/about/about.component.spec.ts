import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have team members', () => {
    expect(component.teamMembers.length).toBeGreaterThan(0);
  });

  it('should render team members', () => {
    const compiled = fixture.nativeElement;
    const teamMembers = compiled.querySelectorAll('.team-member');
    expect(teamMembers.length).toBe(component.teamMembers.length);
  });
});
