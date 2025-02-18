import { Component, QueryList, ViewChildren } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { DraggableItemComponent } from '../draggable-item/draggable-item.component';

const COMPONENTS = [
  MatButtonToggleModule,
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
  workSpace: { label: string, position: { x: number, y: number } }[] = [];
  spanSelected: any;
  selectedText: any;
  @ViewChildren(DraggableItemComponent) draggableItems!: QueryList<DraggableItemComponent>;

  /*Agrega el componente al workSpace*/
  addDraggableComponent(type: 'label' | 'input') {
    if (type === 'label') {
      const newLabel = `Etiqueta ${this.workSpace.length + 1}`;
      const newPosition = { x: 0, y: this.workSpace.length * 50 };
      this.workSpace.push({ label: newLabel, position: newPosition });
    }
  }

  /*Elimina el componente del workSpace*/
  removeDraggableComponent(spanId: string, index: any) {
    if (index !== -1) {
      this.workSpace.splice(index, 1);
    }
  }

  /*cambia las propiedades del objeto seleccionado*/
  changeProperties(typeTool: any, property?: any): void {
    const selectedComponent = this.draggableItems.find(item => item.spanId === this.spanSelected);
    if (!selectedComponent) { return; }
    const span = selectedComponent.editableSpan.nativeElement;
    const selection = this.selectedText;
    const range = selection.getRangeAt(0);
    const spanWrapper = document.createElement('span');

    switch (typeTool) {
      case 'color':
        if (selection.toString().length > 0) {
          spanWrapper.style.color = property;
          range.surroundContents(spanWrapper);
        } else {
          span.style.color = property;
        }
        break;
      case 'bold':
        if (selection.toString().length > 0) {
          spanWrapper.style.fontWeight = 'bold';
          range.surroundContents(spanWrapper);
        } else {
          span.style.fontWeight = span.style.fontWeight === 'bold' ? 'normal' : 'bold';
        }
        break;
      case 'italic':
        if (selection.toString().length > 0) {
          spanWrapper.style.fontStyle = 'italic';
          range.surroundContents(spanWrapper);
        } else {
          span.style.fontStyle = span.style.fontStyle === 'italic' ? 'normal' : 'italic';
        }
        break;
      case 'underline':
        if (selection.toString().length > 0) {
          spanWrapper.style.textDecoration = 'underline';
          range.surroundContents(spanWrapper);
        } else {
          span.style.textDecoration = span.style.textDecoration === 'underline' ? 'none' : 'underline';
        }
        break;
      case 'link':
        if (selection.toString().length > 0) {
          const range = selection.getRangeAt(0);
          const link = document.createElement('a');
          link.href = property;
          link.textContent = range.toString();
          range.deleteContents();
          range.insertNode(link);
        }
        break;
      default:
        break;
    }
  }

  /*retorna el objeto y texto seleccionado*/
  handleSelected(event: any) {
    this.spanSelected = event.spanId;
    this.selectedText = event.selectedText;
  }

  updatePosition(position: { x: number, y: number }, spanId: string) {
    const item = this.workSpace.find(item => `editable-span-${this.workSpace.indexOf(item)}` === spanId);
    if (item) {
      item.position = position;
    }
  }
}
