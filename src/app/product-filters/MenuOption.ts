export class MenuOption {
    id: number;
    name: string;
    checked: boolean;
    count: number;
    constructor(id: number,
    name: string, selected: boolean, count: number) {
      this.id=id;
      this.name=name;
      this.checked=selected;
      this.count = count;
     };
  }