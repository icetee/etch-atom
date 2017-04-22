'use babel'

/** @jsx etch.dom */

import etch from 'etch'
import { CompositeDisposable } from 'atom'

/**
* A base class for etch components.
*/
export class EtchComponent {

  /**
  * Creates a new component.
  *
  * This is only meant to be used by child classes.
  *
  * @param props {Object} An object with the initial properties of this component.
  * @param children {[string]} A list of element that belongs to this one.
  * @param options {bool | [string]} If set to true, you can perform operations before your component is initialized by etch. Then you'll have to call {@link EtchComponent.ready} manually.
  */
  constructor (props = {}, children = [], options = { initLater: false, events: [] }) {
    if (etch.getScheduler() !== atom.views) {
      etch.setScheduler(atom.views)
    }

    this.props = props
    this.children = children
    this.subscriptions = new CompositeDisposable()

    if (Array.isArray(options.events)) {
      for (const evt of options.events) {
        this.event(evt)
      }
    }

    if (!options.initLater) {
      this.ready()
    }
  }

  /**
  * Tell etch that you are ready if you decided to initialize your component before.
  */
  ready () {
    if (!this.initialized) {
      etch.initialize(this)
      this.initialized = true
    }
  }

  /**
  * The method that will be called by etch to get what to render.
  *
  * Put some JSX inside!
  */
  render () {
    throw new Error('EtchComponents should have a `render` method.')
  }

  /**
  * Call this method when you need to render your component again
  */
  async update (props = {}, children = this.children) {
    const oldProps = this.props
    this.props = Object.assign({}, oldProps, props)
    this.children = children
    return await etch.update(this)
  }

  updateSync (props = {}, children = this.children, replaceNode = true) {
    const oldProps = this.props
    this.props = Object.assign({}, oldProps, props)
    this.children = children
    etch.updateSync(this, replaceNode)
  }

  /**
  * Removes a component
  */
  destroy () {
    this.subscriptions.dispose()
    etch.destroy(this)
  }

  /**
  * Alias for {@link EtchComponent.destroy}, to make components disposable.
  */
  dispose () {
    this.destroy()
  }

  /**
  * Destroys the component synchronously
  */
  destroySync (removeNode = true) {
    etch.destroySync(this, removeNode)
  }

  /**
  * Nice way to bind functions to this.
  *
  * If the function belongs to the component (is defined in the class), it will be replaced with the usable version.
  *
  * If the function is external (or is a closure), the bound fucntion will be returned.
  */
  event (evt) {
    if (typeof this[evt] === 'function') {
      this[evt] = this[evt].bind(this)
      return this[evt]
    } else if (typeof evt === 'function') {
      if (evt.name !== '') {
        return evt.bind(this)
      }

      this[evt.name] = evt.bind(this)
      return this[evt.name]
    }
  }
}
