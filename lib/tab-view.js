'use babel'

/** @jsx etch.dom */

import etch from 'etch'

import { EtchComponent } from './etch-component'

export class TabView extends EtchComponent {
  constructor (options, componentOptions) {
    super(options.state, [], componentOptions)
    this.title = options.title
    this.icon = options.icon

    this.element.scrollTop = this.props.scroll ? this.props.scroll.y : this.element.scrollTop
    this.element.scrollLeft = this.props.scroll ? this.props.scroll.x : this.element.scrollLeft
  }

  open (options = {}) {
    const pane = options.pane || atom.workspace.getActivePane()
    if (options.newPane) {
      atom.workspace.pane
    }

    this.subscriptions.add(pane.addItem(this, { pending: options.pending, index: options.index }))

    if (!options.background) {
      pane.activateItem(this)
    }

    if (options.on) {
      switch (options.on) {
        case 'left':
          pane.splitLeft({ items: [ this ] })
          break
        case 'right':
          pane.splitRight({ items: [ this ] })
          break
        case 'top':
          pane.splitTop({ items: [ this ] })
          break
        default:
          pane.splitBottom({ items: [ this ] })
          break
      }
    }
    this.pane = pane
    return this
  }

  readAfterUpdate () {
    this.element.addEventListener('scroll', evt => {
      this.props.scroll = {
        x: window.scrollX,
        y: window.scrollY
      }
    })
  }

  destroy () {
    if (this.pane) {
      this.pane.destroyItem(this)
    }
    super.destroy()
  }

  serialize () {
    return this.props
  }

  getTitle () {
    return this.title
  }

  getIconName () {
    return this.icon
  }
}
