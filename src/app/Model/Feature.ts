export class Feature {
  id?: number;
  name: string;
  type: string;
  content?: string;
  constructor(name: string) {
    this.name = name;
  }
}
