sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller, EnterNamePopover) {
  "use strict";

  const C = Controller.extend('gs.App')

  C.prototype.onInit = function () {
  }

  C.prototype.onLazy1 = function () {
    this.byId('lazy1').setLoaded(true, () => console.log('Loaded lazy1'))
  }

  C.prototype.onLazy2 = function () {
    this.byId('lazy2').setLoaded(true)
  }

  C.prototype.onLazy3 = function () {
    this.byId('lazy3').setLoaded(true)
  }

  C.prototype.onLazy11 = function () {
    this.byId('lazy1-1').setLoaded(true)
  }

  C.prototype.onDestroyLazy1 = function () {
    this.byId('lazy1').setLoaded(false)
  }
  
  C.prototype.onDestroyLazy2 = function () {
    this.byId('lazy2').setLoaded(false)
  }
  
  C.prototype.onDestroyLazy3 = function () {
    this.byId('lazy3').setLoaded(false)
  }
  
  return C
});