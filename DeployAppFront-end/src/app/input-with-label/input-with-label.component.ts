import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-with-label',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-with-label.component.html',
  styleUrl: './input-with-label.component.scss'
})
export class InputWithLabelComponent {
  @Input() labelContent : string ="";
  @Input() placeholder : string = "";
  inputContent : string = "";
  @Input() inputName : string = "";
  @Input() controlName : string = "";

}
