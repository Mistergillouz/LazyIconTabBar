sap.ui.define([
], function ( // eslint-disable-line
) {
  'use strict'

  const LazyControl = sap.ui.core.Control.extend('sap.bi.webi.ui.control.LazyControl', {
    metadata: {
      properties: {
        view: { type: 'string' },
        fragment: { type: 'string' },
        activated: { type: 'boolean', defaultValue: false }
      },
      aggregations: {
        _components: {
          type: 'sap.ui.core.Control',
          multiple: false
        }
      }
    },
    renderer: (out, self) => self._render(out)
  })

  LazyControl.prototype.init = function () {
    this._loaded = false
  }

  LazyControl.prototype._render = function (out) {
    out.write('<div')
    out.writeControlData(this)
    this.addStyleClass('sapWingLazyControl')
    out.writeClasses()
    out.write('>')
    const components = this.getAggregation('_components')
    if (components) {
      out.renderControl(components)
    }
    out.write('</div>')
  }

  LazyControl.prototype.setActivated = function (activated) {
    this.setProperty('activated', activated, true)
    if (activated && !this._loaded) {
      let components = null
      const viewName = this.getView()
      if (viewName) {
        components = sap.ui.xmlview(viewName, viewName)
      } else {
        const fragmentName = this.getFragment()
        if (fragmentName) {
          components = sap.ui.xmlfragment(fragmentName, fragmentName)
        }
      }

      this.setAggregation('_components', components)
      this._loaded = true
    }
  }

  return LazyControl
})
