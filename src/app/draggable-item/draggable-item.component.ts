import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-draggable-item',
  standalone: true,
  imports: [CdkDrag, CdkDragHandle],
  templateUrl: './draggable-item.component.html',
  styleUrl: './draggable-item.component.css'
})
export class DraggableItemComponent {
  @Input() label: string = 'Etiqueta editable';
  @Input() spanId!: string;
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<string> = new EventEmitter();
  @ViewChild('editableSpan') editableSpan!: ElementRef;
  dragPosition = {x: 110, y: 110};

  /*hace que el span sea editable*/
  onInput(event: Event): void {
    const input = event.target as HTMLElement;
    this.label = input.innerText;
  }

  /*detecta cuando seleccionado parte del texto*/
  selected(event: Event) {
    const spanId = this.editableSpan.nativeElement.id;
    const selectedText = window.getSelection();
    this.select.emit({ event, spanId, selectedText });
  }

  onDoubleClick() {
    this.remove.emit(this.spanId);
  }

  changePosition() {
    console.log('entre :>> ', this.dragPosition);
    this.dragPosition = {x: this.dragPosition.x + 50, y: this.dragPosition.y + 50};
  }
}
