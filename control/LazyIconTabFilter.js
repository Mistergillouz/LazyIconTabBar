sap.ui.define([
  'sap/m/IconTabFilter'
], function ( // eslint-disable-line
  IconTabFilter
) {
  'use strict'

  const LazyIconTabFilter = IconTabFilter.extend('sap.bi.webi.ui.control.LazyIconTabFilter', {
    metadata: {
      properties: {
        view: { type: 'string' },
        fragment: { type: 'string' },
        activated: { type: 'boolean', defaultValue: false }
      }
    },
    renderer: 'sap.m.IconTabFilterRenderer'
  })

  LazyIconTabFilter.prototype.init = function () {
    IconTabFilter.prototype.init.call(this)
    this._loaded = false
  }

  LazyIconTabFilter.prototype.setActivated = function (activated) {
    this.setProperty('activated', activated, true)
    if (activated && !this._loaded) {
      this._load()
    }
  }

  LazyIconTabFilter.prototype._unLoad = function () {
    this.removeAllContent()
    this._loaded = false
  }

  LazyIconTabFilter.prototype._load = function () {
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

    if (components) {
      this._loadContent(components)
      this._loaded = true
    }
  }

  LazyIconTabFilter.prototype._loadContent = function (components) {
    this.removeAllContent()
    if (Array.isArray(components)) {
      components.forEach((component) => this.addContent(component))
    } else {
      this.addContent(components)
    }
  }

  return LazyIconTabFilter
})
