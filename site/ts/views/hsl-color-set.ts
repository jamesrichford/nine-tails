/// <reference path="../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../../typings/underscore/underscore.d.ts"/>
/// <reference path="../../../typings/backbone/backbone.d.ts"/>
/// <reference path="../../../typings/marionette/marionette.d.ts"/>
/// <amd-dependency path="marionette" name="Marionette"/>
/// <amd-dependency path="ninetails" name="NineTails"/>

"use strict";

export class HslColorSetView extends Marionette.LayoutView<Backbone.Model> {

  public color: NineTails.Color;
  public labelText: string;

  public constructor(labelText: string, color: NineTails.Color, selector: string, app: NineTailsSiteApp) {
    super();
    this.color = color;
    this.labelText = labelText;
    var rule = app.theme.createRule(selector + " .hsl-color-set");
    rule.linkStyle("background-color", color);
    var contrastColor = new NineTails.Color("rgb(0,0,0)");
    rule.linkStyle("color", contrastColor);
    this.color.onSet(() => {
      if(this.color.lightness > 50) {
        contrastColor.setRgb(0, 0, 0);
      }
      else {
        contrastColor.setRgb(255, 255, 255);
      }
    }, this);
  }

  public onRender() {
    this.el.className = "hsl-color-set";
    this.el.querySelector("label").innerHTML = this.labelText;
  }

  public onAttach() {
    this.el.querySelector(".hue").value = this.color.hue;
    this.el.querySelector(".hue").oninput = () =>
    this.color.setHsl(parseInt(this.el.querySelector(".hue").value), this.color.saturation, this.color.lightness);

    this.el.querySelector(".saturation").value = this.color.saturation;
    this.el.querySelector(".saturation").oninput = () =>
    this.color.setHsl(this.color.hue, parseInt(this.el.querySelector(".saturation").value), this.color.lightness);

    this.el.querySelector(".lightness").value = this.color.lightness;
    this.el.querySelector(".lightness").oninput = () =>
    this.color.setHsl(this.color.hue, this.color.saturation, parseInt(this.el.querySelector(".lightness").value));
  }

  public template: () => string = () => `
  <label></label>
  <div class="slider">
  <label>hue</label>
  <input type="range" class="hue" max="360" />
  </div>
  <div class="slider">
  <label>saturation</label>
  <input type="range" class="saturation" max="100" />
  </div>
  <div class="slider">
  <label>lightness</label>
  <input type="range" class="lightness" max="100" value="50"/>
  </div>`;
}
