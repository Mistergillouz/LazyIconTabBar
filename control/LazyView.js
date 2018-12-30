sap.ui.define([
], function ( // eslint-disable-line
) {
  'use strict'

  const LazyView = sap.ui.core.Control.extend('sap.bi.webi.ui.control.LazyView', {
    metadata: {
      properties: {
        view: { type: 'string' },
        fragment: { type: 'string' },
        loaded: { type: 'boolean', defaultValue: false }
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

  LazyView.prototype.init = function () {
    this._loaded = false
    this._callback = null
  }

  LazyView.prototype._render = function (out) {
    out.write('<div')
    out.writeControlData(this)
    out.write('>')
    out.write('</div>')
    const components = this.getAggregation('content')
    if (Array.isArray(components)) {
      components.forEach((component) => out.renderControl(component))
    }

    if (this._callback) {
      this._callback()
      delete this._callback
    }
  }

  LazyView.prototype.setLoaded = function (loaded, callback) {
    const current = this.getLoaded()
    if (current === loaded) {
      callback && callback()
      return
    }
    
    let components = null
    if (loaded) {
      const viewName = this.getView()
      if (viewName) {
        components = sap.ui.xmlview(this._createId(viewName), viewName)
      } else {
        const fragmentName = this.getFragment()
        if (fragmentName) {
          components = sap.ui.xmlfragment(this._createId(fragmentName), fragmentName)
        }
      }
    }

    this._loadContent(components)

    // This setProperty will force a rerender and the callback will be called
    this.setProperty('loaded', loaded, false)
    this._callback = callback
  }

  LazyView.prototype._createId = function (name) {
    return `${name}-${++LazyView.uniqueId}`
  }

  LazyView.prototype._loadContent = function (components) {
    this.destroyAggregation('content')
    if (components) {
      if (Array.isArray(components)) {
        components.forEach((component) => this.addAggregation('content', component, true, true))
      } else {
        this.addAggregation('content', components, true, true)
      }
    }
  }

  LazyView.uniqueId = 0

  return LazyView
})
