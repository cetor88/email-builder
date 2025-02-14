import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-draggable-item',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './draggable-item.component.html',
  styleUrl: './draggable-item.component.css'
})
export class DraggableItemComponent {
  @Input() label: string = 'Etiqueta editable';
  @Input() spanId!: string;
  @Output() select: EventEmitter<any> = new EventEmitter();
  @ViewChild('editableSpan') editableSpan!: ElementRef;

  onInput(event: Event): void {
    const input = event.target as HTMLElement;
    this.label = input.innerText;
  }

  selected(event: Event) {
    const spanId = this.editableSpan.nativeElement.id;
    this.select.emit({ event, spanId });
  }
}
