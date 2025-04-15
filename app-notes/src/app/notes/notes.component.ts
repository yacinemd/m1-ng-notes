import { Component } from '@angular/core';
import { StorageService } from '../storage.service';
import { FormsModule } from '@angular/forms';
import { Note } from '../note';
import { NoteComponent } from '../note/note.component';
import { NgFor, NgIf } from '@angular/common';
import { Tag } from '../tag';

@Component({
  selector: 'app-notes',
  imports: [FormsModule, NoteComponent, NgFor, NgIf],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})

export class NotesComponent {
  loaded: boolean = false;
  notes: Note[] = [];
  creating: Note | null = null;
  editing: Note | null = null;
  availableTags: Tag[] = [];
  selectedTagId: number | null = null;

  constructor(
    private storageService: StorageService,
  ) {
    if (this.loaded) {
      return;
    }
    this.loaded = true;
    this.notes = this.storageService.getNotes();
    this.availableTags = this.storageService.getTags();
  }

  ngOnInit(): void {}

  dialogAddNote(): boolean {
    this.creating = {
      id: Date.now(),
      title: '',
      content: '',
      tags: []
    };
    return false;
  }

  deleteNote(note: Note): boolean {
    this.storageService.deleteNote(note.id);
    this.notes = this.storageService.getNotes();
    return false;
  }

  EditingNote(): void {
    if (!this.editing) return;

    this.storageService.updateNote(this.editing);
    this.notes = this.storageService.getNotes();
    this.editing = null;
  }

  cancelEdit(): void {
    this.editing = null;
    this.creating = null;
  }

  editNote(note: Note): void {
    this.editing = JSON.parse(JSON.stringify(note));
  }

  submitNote(note: Note): boolean {
    if (!note) return false;

    if (this.creating) {
      this.creating = null;
      this.storageService.saveNote(note);
    } else if (this.editing) {
      this.editing = null;
      this.storageService.updateNote(note);
    }

    this.notes = this.storageService.getNotes();
    console.log(this.notes);
    return false;
  }

  addTagToNote(): void {
    if (!this.selectedTagId) return;

    const tagToAdd = this.availableTags.find(tag => tag.id === this.selectedTagId);
    if (tagToAdd) {
      const target = this.creating ?? this.editing;
      if (target && !target.tags.some(tag => tag.id === tagToAdd.id)) {
        target.tags.push(tagToAdd);
      }
    }

    this.selectedTagId = null;
  }

  removeTagFromNote(tagIndex: number): void {
    if (this.creating) {
      this.creating.tags.splice(tagIndex, 1);
    } else if (this.editing) {
      this.editing.tags.splice(tagIndex, 1);
    }
  }
}
