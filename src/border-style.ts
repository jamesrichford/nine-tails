import { Style } from "./style";
import { BorderStyleType } from "./border-style-type";

export class BorderStyle extends Style {
   public type: BorderStyleType;

   constructor(type: BorderStyleType) {
      super();
      this.type = type;
   }

   get(): string {
      return BorderStyleType[this.type].toLowerCase();
   }

   set(type: BorderStyleType): void {
      this.type = type;
      this.setValue(this.get());
   }
}
