import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Sec3 } from './sec3';

describe('Sec3', () => {
  let component: Sec3;
  let fixture: ComponentFixture<Sec3>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sec3],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Sec3);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
