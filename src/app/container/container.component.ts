import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
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
  DraggableItemComponent,
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
  imports: [COMPONENTS],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent implements OnInit {
  workSpace: { label?: string, imageUrl?: string, position: { x: number, y: number } }[] = [];
  spanSelected: any;
  selectedText: any;
  fontSize: number = 16;
  // htmlContent: string = '';
  @ViewChildren(DraggableItemComponent) draggableItems!: QueryList<DraggableItemComponent>;


  ngOnInit() {
    this.loadWorkSpace();
  }

  /*Carga el estado de workSpace desde localStorage*/
  loadWorkSpace() {
    const savedWorkSpace = localStorage.getItem('workSpace');
    if (savedWorkSpace) {
      this.workSpace = JSON.parse(savedWorkSpace);
    }
  }

  /*Guarda el estado de workSpace en localStorage*/
  saveWorkSpace() {
    localStorage.setItem('workSpace', JSON.stringify(this.workSpace));
  }

  /*Agrega el componente al workSpace*/
  addDraggableComponent(type: 'label' | 'input' | 'image', imageUrl?: string) {
    const position = { x: 0, y: 0 };

    if (type === 'label') {
      const label = `Etiqueta ${this.workSpace.length + 1}`;
      this.workSpace.push({ label, position });
    } else if (type === 'image' && imageUrl) {
      this.workSpace.push({ imageUrl, position });
    }
    this.saveWorkSpace();
    // this.updateHtmlContent();
  }

  /*Elimina el componente del workSpace*/
  removeDraggableComponent(spanId: string, index: any) {
    if (index !== -1) {
      this.workSpace.splice(index, 1);
    }
    this.saveWorkSpace();
    // this.updateHtmlContent();
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
          const link = document.createElement('a');
          link.href = property;
          link.textContent = range.toString();
          link.classList.add('custom-link-class');
          range.deleteContents();
          range.insertNode(link);
        }
        break;
      case 'fontSize':
        if (selection.toString().length > 0) {
          spanWrapper.style.fontSize = property;
          range.surroundContents(spanWrapper);
        } else {
          span.style.fontSize = property;
        }
        break;
      default:
        break;
    }
  }

  /*Incrementa o decrementa el tamaño de la fuente*/
  changeFontSize(delta: number) {
    this.fontSize += delta;
    this.changeProperties('fontSize', this.fontSize + 'px');
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
    this.saveWorkSpace();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.addDraggableComponent('image', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  /*Actualiza el contenido HTML*/
  // updateHtmlContent() {
  //   this.htmlContent = this.workSpace.map(item => {
  //     if (item.label) {
  //       return `<span>${item.label}</span>`;
  //     } else if (item.imageUrl) {
  //       return `<img src="${item.imageUrl}" alt="Imagen cargada" />`;
  //     }
  //     return '';
  //   }).join('');
  // }
}
