import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sec1 } from './sec1';

describe('Sec1', () => {
  let component: Sec1;
  let fixture: ComponentFixture<Sec1>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sec1],
    }).compileComponents();

    fixture = TestBed.createComponent(Sec1);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
