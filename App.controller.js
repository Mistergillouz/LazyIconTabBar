sap.ui.define([
  "sap/ui/core/mvc/Controller"
], function (Controller, EnterNamePopover) {
  "use strict";

  const C = Controller.extend('gs.App')

  C.prototype.onInit = function () {
  }

  C.prototype.onLazy1 = function () {
    this.byId('lazy1').setActivated(true)
  }

  C.prototype.onLazy2 = function () {
    this.byId('lazy2').setActivated(true)
  }

  C.prototype.onLazy3 = function () {
    this.byId('lazy3').setActivated(true)
  }
  
  return C
});