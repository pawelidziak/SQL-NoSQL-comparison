export class ChildModel {
  private readonly childId: string;
  private readonly question: string;
  private readonly parentId: string;

  constructor(childId: string, question: string, parentId: string) {
    this.childId = childId;
    this.question = question;
    this.parentId = parentId;
  }

  get getChildId(): string {
    return this.childId;
  }

  get getQuestion(): string {
    return this.question;
  }

  get getParentId(): string {
    return this.parentId;
  }
}
