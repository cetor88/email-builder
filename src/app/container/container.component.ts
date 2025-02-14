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
}
