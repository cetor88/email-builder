import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPlantillasComponent } from './listado-plantillas.component';

describe('ListadoPlantillasComponent', () => {
  let component: ListadoPlantillasComponent;
  let fixture: ComponentFixture<ListadoPlantillasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListadoPlantillasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPlantillasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
