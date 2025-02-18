import { CdkDrag, CdkDragHandle, CdkDragEnd } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ResizableModule, ResizeEvent } from 'angular-resizable-element';

@Component({
  selector: 'app-draggable-item',
  standalone: true,
  imports: [CdkDrag, CdkDragHandle, ResizableModule, CommonModule],
  templateUrl: './draggable-item.component.html',
  styleUrl: './draggable-item.component.css'
})
export class DraggableItemComponent {
  @Input() label?: string = 'Etiqueta editable';
  @Input() imageUrl?: string;
  @Input() spanId!: string;
  @Input() dragPosition = { x: 0, y: 0 };
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() remove: EventEmitter<string> = new EventEmitter();
  @Output() positionChange: EventEmitter<{ x: number, y: number }> = new EventEmitter();
  @ViewChild('editableSpan') editableSpan!: ElementRef;

  width: number | any = 100;
  height: number | any = 100;

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

  validate(event: ResizeEvent): boolean {
    const MIN_DIMENSIONS_PX: number = 50;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < MIN_DIMENSIONS_PX ||
        event.rectangle.height < MIN_DIMENSIONS_PX)
    ) {
      return false;
    }
    return true;
  }
  public style: object = {};
  onResizeEnd(event: ResizeEvent): void {
    this.style = {
      position: 'fixed',
      left: `${event.rectangle.left}px`,
      top: `${event.rectangle.top}px`,
      width: `${event.rectangle.width}px`,
      height: `${event.rectangle.height}px`
    };
  }
}
