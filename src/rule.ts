
import { Style } from "./style";

  export class Rule {

    private cssRule: CSSStyleRule;

    constructor(cssRule: CSSStyleRule) {
      this.cssRule = cssRule;
    }

    public linkStyle(styleName: string, style: Style): void {
      styleName = styleName.replace(/-([a-z])/g, (dashedAndCharacter) => dashedAndCharacter[1].toUpperCase());

      style.onSet((event: any) => this.setStyle(event.newValue, styleName), this);
      try {
        (<any>this.cssRule.style)[styleName] = style.get();

      }
      catch (e) {

      }
    }

    private setStyle(value: any, styleName: string): void {

      try {
        (<any>this.cssRule.style)[styleName] = value;

      }
      catch (e) {

      }
    }
  }
