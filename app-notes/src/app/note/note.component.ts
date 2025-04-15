import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [NgIf],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent {
  @Input() public id: number = 0;
  @Input() public title: string = "Default Note";
  @Input() public content: string = "Default Content";
}
