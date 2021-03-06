import { Style } from "./style";

export class Color extends Style {
   red: number;
   green: number;
   blue: number;
   alpha: number;
   hue: number;
   saturation: number;
   lightness: number;

   public name: string;
   value: string;

   constructor(value: string, name?: string) {
      super();
      this.set(value);

      if (name) {
         this.name = name;
      }
      else {
         this.name = null;
      }
   }

   get(): string {
      return this.value;
   }

   set(value: string): void {
      this.value = value;

      if (/^rgb[a]?[\s]*\([\s]*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5][\s]*)(,[\s]*([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])[\s]*){2}(,[\s]*[0-1](\.[0-9]*)?[\s]*)?\)$/.test(value)) {
         let rgbaValues = value.slice(value.indexOf("(") + 1, value.indexOf(")")).split(",").map(characterString => parseFloat(characterString));

         this.red = rgbaValues[0];
         this.green = rgbaValues[1];
         this.blue = rgbaValues[2];
         this.alpha = rgbaValues[3];

         if (this.alpha === undefined) {
            this.alpha = 1;
         }

      }
      /*
      this.hue = null;
      this.saturation = null;
      this.lightness = null;
      */
      this.setValue(this.get());
   }

   setRgb(red: number, green: number, blue: number): void {
      // this.set(this.value = "rgb(" + red + ", " + green + "," + blue + ")");
      // this.set("#" + red.toString(16) + green.toString(16)+ blue.toString(16));
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.set(this._getHexValue());
   }

   setRgba(red: number, green: number, blue: number, alpha: number): void {
      this.set(this.value = "rgba(" + red + ", " + green + "," + blue + ", " + alpha + ")");
      this.red = red;
      this.green = green;
      this.blue = blue;
      this.alpha = alpha;
      // this.set(this._getHexValue());
   }

   setHsl(hue: number, saturation: number, lightness: number): void {
      if (isNaN(hue)) { this.hue = 0; }
      else {
         this.hue = hue;
      }

      if (isNaN(saturation)) { this.saturation = 0; }
      else {
         this.saturation = saturation;
      }

      if (isNaN(lightness)) { this.lightness = 0; }
      else {
         this.lightness = lightness;
      }
      // this.set(this.value = "hsl(" + hue + ", " + saturation + "%," + lightness + "%)");
      this._getRgbFromHsl();
      this.set(this._getHexValue());
   }

   setHsla(hue: number, saturation: number, lightness: number, alpha: number): void {
      this.set(this.value = "hsla(" + hue + ", " + saturation + "%," + lightness + "%," + alpha + ")");
      this.hue = hue;
      this.saturation = saturation;
      this.lightness = lightness;
      this.alpha = alpha;
   }

   private _getHexValue() {
      return "#" + this._getHexFromColor(this.red) + this._getHexFromColor(this.green) + this._getHexFromColor(this.blue);
   }

   private _getHexFromColor(numberColor: number): string {
      let hexString = numberColor.toString(16);
      if (hexString.length === 1) {
         return "0" + hexString;
      }
      return hexString;
   }

   private _getRgbFromHsl(): void {

      if (this.saturation === 0) {
         this.red = this.green = this.blue = Math.round(this.lightness / 100 * 255); //  achromatic
      }
      else {
         let hue2rgb = function hue2rgb(p: number, q: number, t: number){
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
         };

         let l = this.lightness / 100;
         let h = this.hue / 360;
         let s = this.saturation / 100;

         let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
         let p = 2 * l - q;
         this.red = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
         this.green = Math.round(hue2rgb(p, q, h) * 255);
         this.blue = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
      }
   }
}
