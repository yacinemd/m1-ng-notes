import { Tag } from "./tag";

export class Note {
  id: number = 0;
  title: string = "";
  content: string = "";
  tags: Tag[] = [];
}
