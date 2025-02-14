import { Component } from '@angular/core';

import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule} from '@angular/forms';

import { CdkDragDrop, CdkDropList, CdkDropListGroup, moveItemInArray } from '@angular/cdk/drag-drop';
import { DraggableItemComponent } from '../draggable-item/draggable-item.component';

const COMPONENTS = [
  MatButtonToggleModule,
  CdkDropList,
  CdkDropListGroup,
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  FormsModule,
  MatIconModule
];

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [COMPONENTS, DraggableItemComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  // components = ['componente1', 'componente2', 'componente3']; //TODO: generar un array con los componentes que se pueden agregar
  workSpace: string[] = [];
  spanSelected: any;

  /*Agrega el componente al workSpace*/
  addDraggableComponent(type: 'label' | 'input') {
    if (type === 'label') {
      const newLabel = `Etiqueta ${this.workSpace.length + 1}`;
      this.workSpace.push(newLabel);
    }
  }

  /*Se encarga de que al mover el compoenete lo posicione*/
  drop(event: CdkDragDrop<string[] | any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
       this.workSpace, // event.container.data, html: [cdkDropListData]="workSpace"
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // this.addDraggableComponent();
      // copyArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex,
      // );
    }
  }

  changeColor(): void {
    const span = document.getElementById(this.spanSelected);
    if (span) {
      span.style.color = 'red';
    }
  }

  handleSelected(event: any) {
    this.spanSelected = event.spanId;
  }
}
