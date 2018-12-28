sap.ui.define([
  'sap/m/IconTabBar'
], function ( // eslint-disable-line
  IconTabBar
) {
  'use strict'

  const LazyIconTabBar = IconTabBar.extend('sap.bi.webi.ui.control.LazyIconTabBar', {
    metadata: {
      properties: {
        truc: {}
      }
    },
    renderer: 'sap.m.IconTabBarRenderer'
  })

  LazyIconTabBar.prototype.init = function () {
    IconTabBar.prototype.init.call(this)
    const header = this._getIconTabHeader()

    // Hook setProperty
    const oldSetProperty = header.setProperty
    header.setProperty = (sPropertyName, oValue, bSuppressInvalidate) => {
      oldSetProperty.call(this, sPropertyName, oValue, bSuppressInvalidate)
      if (sPropertyName === 'selectedKey') {
        const item = this.getAggregation('items').find((item) => item instanceof sap.bi.webi.ui.control.LazyIconTabFilter && item.getKey() === oValue)
        if (item) {
          item.setActivated(true)
        }
      }
    }
  }

  return LazyIconTabBar
})
