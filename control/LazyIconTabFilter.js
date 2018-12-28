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

  LazyIconTabFilter.prototype._load = function () {
    const view = this.getView()
    if (view) {
      this._loadView(view)
    } else {
      const fragment = this.getFragment()
      if (fragment) {
        this._loadFragment(fragment)
      }
    }

    this._loaded = true
  }

  LazyIconTabFilter.prototype._loadFragment = function (fragmentName) {
    const name = this._getName(fragmentName)
    const fragment = sap.ui.xmlfragment(name, fragmentName)
    this.addContent(fragment)
  }

  LazyIconTabFilter.prototype._loadView = function (viewName) {
    const name = this._getName(viewName)
    const view = sap.ui.xmlview(name, viewName)
    this.addContent(view)
  }

  LazyIconTabFilter.prototype._getName = function (path) {
    const index = path.lastIndexOf('.')
    return path.substring(index + 1)
  }
  return LazyIconTabFilter
})
