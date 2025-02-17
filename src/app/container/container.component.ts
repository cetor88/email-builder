import { Component, QueryList, ViewChildren } from '@angular/core';

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
  selectedText: any;
  @ViewChildren(DraggableItemComponent) draggableItems!: QueryList<DraggableItemComponent>;

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

  /*cambia las propiedades del objeto seleccionado*/
  changeProperties(type: any, url?: any): void {
    const selectedComponent = this.draggableItems.find(item => item.spanId === this.spanSelected);
    if (!selectedComponent) { return; }
    const span = selectedComponent.editableSpan.nativeElement;
    const selection = this.selectedText;
    const range = selection.getRangeAt(0);
    const spanWrapper = document.createElement('span');

    switch (type) {
      case 'color':
        if (selection.toString().length > 0) {
          spanWrapper.style.color = 'red';
          range.surroundContents(spanWrapper);
        } else {
          span.style.color = 'red';
        }
        break;
      case 'bold':
        if (selection.toString().length > 0) {
          spanWrapper.style.fontWeight = span.style.fontWeight === 'bold' ? 'normal' : 'bold';
          range.surroundContents(spanWrapper);
        } else {
          span.style.fontWeight = span.style.fontWeight === 'bold' ? 'normal' : 'bold';
        }
        break;
      case 'italic':
        span.style.fontStyle = span.style.fontStyle === 'italic' ? 'normal' : 'italic';
        break;
      case 'underline':
        span.style.textDecoration = span.style.textDecoration === 'underline' ? 'none' : 'underline';
        break;
      case 'link':
        if (selection.toString().length > 0) {
          const range = selection.getRangeAt(0);
          const link = document.createElement('a');
          link.href = url;
          link.textContent = range.toString();
          range.deleteContents();
          range.insertNode(link);
        }
        break;
      default:
        break;
    }
  }

  /*retorna el objeto seleccionado*/
  handleSelected(event: any) {
    this.spanSelected = event.spanId;
    this.selectedText = event.selectedText;
  }
}
