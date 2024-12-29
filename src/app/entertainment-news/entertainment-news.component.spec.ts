import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntertainmentNewsComponent } from './entertainment-news.component';

describe('EntertainmentNewsComponent', () => {
  let component: EntertainmentNewsComponent;
  let fixture: ComponentFixture<EntertainmentNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntertainmentNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntertainmentNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
