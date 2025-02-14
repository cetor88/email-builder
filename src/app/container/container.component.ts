import { Component } from '@angular/core';

import {MatButtonToggleModule} from '@angular/material/button-toggle';

import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {FormsModule} from '@angular/forms';

import { CdkDrag, CdkDragDrop, CdkDropList, CdkDropListGroup, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { DraggableItemComponent } from '../draggable-item/draggable-item.component';

const COMPONENTS = [
  MatButtonToggleModule,
  CdkDrag,
  CdkDropList,
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
  imports: [COMPONENTS, DraggableItemComponent],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  components = ['componente1', 'componente2', 'componente3'];
  workSpace = [];

  drop2(event: CdkDragDrop<string[] | any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem( //transferArrayItem
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }

    console.log('components :>> ', this.components);
    console.log('workSpace :>> ', this.workSpace);
  }

  executeCommand(command : string) {
    console.log('command :>> ', command);
    document.execCommand(command, false, '');
    this.highlightEditorButtons();
  }

  keydown() {
    this.highlightEditorButtons();
  }

  highlightEditorButtons(){
    const isBold = document.queryCommandValue("bold");
    const isItalic = document.queryCommandValue("italic");
    const isUnderline = document.queryCommandValue("underline");

    const btnBold = document.getElementById('btnBold');
    const btnItalic = document.getElementById('btnItalic');
    const btnUnderline = document.getElementById('btnUnderline');

    if (isBold === 'true') {
      btnBold!.style.backgroundColor = "gray";
    } else {
      btnBold!.style.backgroundColor = "lightgray";
    }

    if (isItalic === 'true') {
        btnItalic!.style.backgroundColor = "gray";
    } else {
       btnItalic!.style.backgroundColor = "lightgray";
    }

    if (isUnderline === 'true') {
       btnUnderline!.style.backgroundColor = "gray";
    } else {
        btnUnderline!.style.backgroundColor = "lightgray";
    }
  }

  accion(e: any) {
    console.log('entre a editar :>> ', e);
  }

  draggableLabels: string[] = [];

  addDraggableLabel() {
    const newLabel = `Etiqueta ${this.draggableLabels.length + 1}`;
    this.draggableLabels.push(newLabel);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('demo');
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

}
