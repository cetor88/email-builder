import { Component } from '@angular/core';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule} from '@angular/forms';

import { CdkDrag, CdkDragDrop, CdkDragPlaceholder, CdkDropList, CdkDropListGroup, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

const COMPONENTS = [
  CdkDrag,
  CdkDropList,
  CdkDragPlaceholder,
  CdkDropListGroup,
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  FormsModule
];

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [COMPONENTS],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  components = ['componente1', 'componente2', 'componente3'];
  workSpace = [];

  drop(event: CdkDragDrop<string[] | any>) {
    console.log('event :>> ', event);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    console.log('components :>> ', this.components);
    console.log('workSpace :>> ', this.workSpace);
  }
}
