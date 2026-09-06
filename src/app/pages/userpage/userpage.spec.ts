import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Userpage } from './userpage';

describe('Userpage', () => {
  let component: Userpage;
  let fixture: ComponentFixture<Userpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Userpage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Userpage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
