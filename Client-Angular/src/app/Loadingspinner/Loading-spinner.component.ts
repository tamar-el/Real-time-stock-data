import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  imports: [MatProgressSpinnerModule],
  selector: 'app-loading-spinner',
  templateUrl: './Loading-spinner.component.html',
  styleUrls: ['./Loading-spinner.component.css'],
})
export class LoadingSpinnerComponent {
  @Input() size = 80;
  @Input() thickness = 5;
}
