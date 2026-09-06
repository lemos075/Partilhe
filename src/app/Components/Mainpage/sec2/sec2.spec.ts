import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Sec2 } from './sec2';

describe('Sec2', () => {
  let component: Sec2;
  let fixture: ComponentFixture<Sec2>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sec2],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Sec2);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
