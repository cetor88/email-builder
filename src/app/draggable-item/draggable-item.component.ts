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
    const selectedText = this.getSelectedText();
    this.select.emit({ event, spanId, selectedText });
  }

  getSelectedText(): string {
    const selection = window.getSelection();
    return selection ? selection.toString() : '';
  }

  addHyperlink(url: string): void {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const link = document.createElement('a');
      link.href = url;
      link.textContent = range.toString();
      range.deleteContents();
      range.insertNode(link);
    }
  }
}
