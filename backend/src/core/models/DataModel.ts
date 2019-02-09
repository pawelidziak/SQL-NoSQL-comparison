export class DataModel {
  private name: string;
  private position: number;

  constructor(name: string, position: number) {
    this.name = name;
    this.position = position;
  }
}

export class ExtendData extends DataModel {
  private tags: string[];

  constructor(name: string, position: number, tags: string[]) {
    super(name, position);
    this.tags = tags;
  }
}
