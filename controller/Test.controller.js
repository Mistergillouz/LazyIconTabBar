sap.ui.define(['sap/ui/core/mvc/Controller'],
  function (Controller) {
    'use strict'

    var C = Controller.extend('sap.bi.webi.ui.controller.Test', {
      onPlop: function () {
        sap.m.MessageToast.show('Plop')
      }
    })

    return C
  })
