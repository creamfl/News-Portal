import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticsNewsComponent } from './politics-news.component';

describe('PoliticsNewsComponent', () => {
  let component: PoliticsNewsComponent;
  let fixture: ComponentFixture<PoliticsNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PoliticsNewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
