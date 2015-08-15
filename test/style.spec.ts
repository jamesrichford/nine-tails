///<reference path="../src/style.ts"/>
///<reference path="../typings/jasmine/jasmine.d.ts"/>

describe('Style', function() {
   describe('constructing a new Style', function (){
       it('should set the handlers array to an empty array', function () {
           var style = new NineTails.Style();
           expect(style.handlers.length).toBe(0);
       });
   });

   describe('getting the value of a Style', function() {
      it('should always return empty string', function (){
         var style = new NineTails.Style();

         expect(style.get()).toBe('');
      });
   });

   describe('registering a listener of a style', function() {
      it('should store the given details in the handlers array', function (){
         var style = new NineTails.Style();

         style.onSet(1, 2, 3);

         expect(style.handlers[0]).toBe({ handler: 1, context: 2, extras: 3});
      });
   });

   describe('broadcasting changest to a listener', function() {
      it('should call the handler with the new value and whatever extra', function (){
         var style = new NineTails.Style();

         style.onSet({ call: function() {} }, 2, 3);

         spyOn(style.handlers[0].handler, 'call');

         style.notifyHandlers();

         expect(style.handlers[0].handler.call).toHaveBeenCalledWith(2, { newValue: '' }, 3);
      });
   });
});
