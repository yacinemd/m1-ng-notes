import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../storage.service';
import { Tag } from '../tag';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-tags',
  standalone: true,
  imports: [FormsModule, TagComponent],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.css'
})
export class TagsComponent {

  tags: Tag[] = [];
  creating: Tag | null = null;
  editing: Tag | null = null;

  constructor(private storageService: StorageService) {
    this.loadTags();
  }

  private loadTags(): void {
    this.tags = this.storageService.getTags();
  }

  ngOnInit(): void {}

  dialogAddTag(): boolean {
    this.creating = {
      id: Date.now(),
      name: '',
      color: '#888888'
    };
    return false;
  }

  editTag(tag: Tag): void {
    this.editing = tag;
  }

  cancelEdit(): void {
    this.editing = null;
    this.creating = null;
  }

  deleteTag(tag: Tag): boolean {
    this.storageService.deleteTag(tag.id);
    this.loadTags();
    return false;
  }

  submitTag(tag: Tag): boolean {
    if (!tag) return false;

    if (this.creating) {
      this.storageService.saveTag(tag);
      this.creating = null;
    } else if (this.editing) {
      this.storageService.updateTag(tag);
      this.editing = null;
    }

    this.loadTags();
    return false;
  }

  EditingTag(): void {
    if (!this.editing) return;

    this.storageService.updateTag(this.editing);
    this.editing = null;
    this.loadTags();
  }
}
