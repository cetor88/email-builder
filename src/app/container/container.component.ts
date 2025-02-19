import { ChangeDetectorRef, Component, QueryList, TemplateRef, ViewChild, ViewChildren } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { DraggableItemComponent } from '../draggable-item/draggable-item.component';
import { MatTabsModule } from '@angular/material/tabs';
import { ListadoPlantillasComponent } from "../listado-plantillas/listado-plantillas.component";
import {MatCardModule} from '@angular/material/card';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

const COMPONENTS = [
  MatButtonToggleModule,
  DraggableItemComponent,
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatSidenavModule,
  FormsModule,
  MatIconModule,
  MatTabsModule,
  ListadoPlantillasComponent,
  MatCardModule,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose
];

@Component({
  selector: 'app-container',
  standalone: true,
  imports: [COMPONENTS ],
  templateUrl: './container.component.html',
  styleUrl: './container.component.css'
})
export class ContainerComponent {
  workSpace: { label?: string, imageUrl?: string, position: { x: number, y: number } }[] = [];
  spanSelected: any;
  selectedText: any;
  @ViewChildren(DraggableItemComponent) draggableItems!: QueryList<DraggableItemComponent>;
  @ViewChild('dialogPreview') dialogPreview!: TemplateRef<any>;

  constructor(private matDialog: MatDialog, private cdr: ChangeDetectorRef) { }

  /*Agrega el componente al workSpace*/
  addDraggableComponent(type: 'label' | 'input' | 'image', imageUrl?: string) {
    if (type === 'label') {
      const newLabel = `Etiqueta ${this.workSpace.length + 1}`;
      const newPosition = { x: 0, y: this.workSpace.length * 50 };
      this.workSpace.push({ label: newLabel, position: newPosition });
    } else if (type === 'image' && imageUrl) {
      const newPosition = { x: 0, y: this.workSpace.length * 50 };
      this.workSpace.push({ imageUrl, position: newPosition });
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
          const link = document.createElement('a');
          link.href = property;
          link.textContent = range.toString();
          link.classList.add('custom-link-class');
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

  preview() {
    const content = document.getElementsByClassName('example-boundary')[0]
    const clonedContent = content.cloneNode(true) as HTMLElement;
    /*let destinoContent = this.dialogPreview.elementRef.nativeElement.querySelector('.mat-mdc-dialog-content');
    destinoContent.innerHTML = content.innerHTML;*/

    console.log(content);

    const dialogRef = this.matDialog.open(this.dialogPreview,
      {
        width: '960px',
        maxWidth: '1250px',
      }
    );
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur(); // Remove focus from the button
    dialogRef.afterOpened().subscribe(() => {
      const dialogElement = dialogRef.componentInstance;
      const dialogContent = dialogElement.querySelector('.mat-dialog-content');
      if (dialogContent) {
        dialogContent.appendChild(clonedContent);
        this.cdr.detectChanges();
      }
    });
  }
}
