import { Component } from '@angular/core';
import { ContainerComponent } from './container/container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

}
