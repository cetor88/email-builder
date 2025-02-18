import { CdkDrag, CdkDragHandle, CdkDragEnd } from '@angular/cdk/drag-drop';
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
  @Input() dragPosition = { x: 0, y: 0 };
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<string> = new EventEmitter();
  @Output() positionChange: EventEmitter<{ x: number, y: number }> = new EventEmitter();
  @ViewChild('editableSpan') editableSpan!: ElementRef;

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

  onDragEnded(event: CdkDragEnd) {
    const { x, y } = event.source.getFreeDragPosition();
    this.positionChange.emit({ x, y });
  }

  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement | any;
    if (target.tagName === 'A') {
      window.open(target.getAttribute('href'), '_blank');
    }
  }
}
