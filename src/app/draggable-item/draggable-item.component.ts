import { CdkDrag } from '@angular/cdk/drag-drop';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-draggable-item',
  standalone: true,
  imports: [CdkDrag],
  templateUrl: './draggable-item.component.html',
  styleUrl: './draggable-item.component.css'
})
export class DraggableItemComponent {
  @Input() label: string = 'Etiqueta editable';

  onInput(event: Event): void {
    const input = event.target as HTMLElement;
    this.label = input.innerText;
  }
}
