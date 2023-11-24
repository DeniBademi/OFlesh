export class MenuOption {
    id: number;
    name: string;
    checked: boolean;
    count: number;
    behavior: string;
    constructor(id: number,
    name: string, selected: boolean, count: number, behavior: string) {
      this.id=id;
      this.name=name;
      this.checked=selected;
      this.count = count;
      this.behavior = behavior;
     };
  }