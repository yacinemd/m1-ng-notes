import { Tag } from "./tag";

export class Note {
  id: number = 0;
  title: string = "";
  content: string = "";
  color: string = "#888888";
  created: Date = new Date();
  tags: Tag[] = [];
}
