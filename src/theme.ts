import { Rule } from "./rule";

export class Theme {

   public styleSheet: CSSStyleSheet;

   constructor () {
      let styleElement = document.createElement("style");
      styleElement.title = "nine-tails";
      styleElement.className = "nine-tails-theme";

      document.querySelector("head").appendChild(styleElement);

      this.styleSheet = <CSSStyleSheet>document.styleSheets[document.styleSheets.length - 1]; // <CSSStyleSheet>styleElement.sheet || <CSSStyleSheet>styleElement.styleSheet;

      // change this to create class that extends CSSStyleSheet
      (<any>styleElement)["theme"] = this;
   }

   createRule(selector: string): Rule {
      let cssRules = this.styleSheet.cssRules || this.styleSheet.rules;
      let ruleIndex = 0;

      // find rule if already exists
      for (let i = 0; i < cssRules.length; i++) {
         let rule = <CSSStyleRule>cssRules[i];
         if (rule.selectorText.toLowerCase() === selector) {
            // need to keep the reference to namespace whilst this isn"t compiling correctly
            return new Rule(rule);
         }
      }

      let selectors = selector.split(" ");
      for (let j = 0; j < selectors.length; j++) {
         if (selectors[j].charAt(0) !== "." && selectors[j].charAt(0) !== "#") {
            selectors[j] = selectors[j].toUpperCase();
         }
      }

      selector = selectors.join(" ");

      if (this.styleSheet.insertRule) {
         ruleIndex = this.styleSheet.insertRule(selector + " { }", 0);
      }
      else {
         ruleIndex = this.styleSheet.addRule(selector);
      }

      return new Rule(<CSSStyleRule>cssRules[ruleIndex]);
   }
}
