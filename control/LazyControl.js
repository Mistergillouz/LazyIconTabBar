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
        content: {
          type: 'sap.ui.core.Control',
          visibility: 'hidden',
          multiple: true
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
    out.write('>')
    out.write('</div>')
    const components = this.getAggregation('content')
    if (Array.isArray(components)) {
      components.forEach((component) => out.renderControl(component))
    }
  }

  LazyControl.prototype.setActivated = function (activated) {
    this.setProperty('activated', activated, true)
    if (activated && !this._loaded) {
      let components = null
      const viewName = this.getView()
      if (viewName) {
        components = sap.ui.xmlview(this._createId(viewName), viewName)
      } else {
        const fragmentName = this.getFragment()
        if (fragmentName) {
          components = sap.ui.xmlfragment(this._createId(fragmentName), fragmentName)
        }
      }

      if (components) {
        this._loadContent(components)
        this.rerender()
        this._loaded = true
      }
    } else if (!activated && this._loaded) {
      this.destroyAggregation('content')
      this.rerender()
      this._loaded = false
    }
  }

  LazyControl.prototype._createId = function (name) {
    return name + '-' + jQuery.sap.uid()
  }

  LazyControl.prototype._loadContent = function (components) {
    this.destroyAggregation('content')
    if (Array.isArray(components)) {
      components.forEach((component) => this.addAggregation('content', component, true, true))
    } else {
      this.addAggregation('content', components, true, true)
    }
  }
  return LazyControl
})
