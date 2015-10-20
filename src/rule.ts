/// <reference path="./nine-tails.ts"/>
///<reference path="style.ts"/>

module NineTails {
  export class Rule {

    private cssRule: CSSStyleRule;

    constructor(cssRule : CSSStyleRule) {
      this.cssRule = cssRule;
    }

    public linkStyle(styleName : string, style : Style): void {
      style.onSet(this.setStyle, this, styleName);
      this.cssRule.style[styleName] = style.get();
    }

    private setStyle(update, styleName : string): void {
      this.cssRule.style[styleName] = update.newValue;
    }
  }
}