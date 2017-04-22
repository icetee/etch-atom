'use babel'

/** @jsx etch.dom */

import etch from 'etch'

import { EtchComponent } from './etch-component'
import { Icon } from './icon'

export class Tree extends EtchComponent {
  constructor (props, ch) {
    super(props, ch, { events: ['onFold'] })
  }

  onFold (evt) {
    if (this.props.on && this.props.on.click) {
      this.props.on.click.apply(this, ...arguments)
    }

    if (!evt.defaultPrevented && !this.props.noCollapse) {
      this.props.collapsed = !this.props.collapsed
      this.update()
    }
  }

  hasChildren () {
    return this.children.length > 0 || this.props.forceFoldable
  }

  render () {
    if (this.props.noCollapse) {
      for (const ch of this.children) {
        ch.props.noCollapse = true
      }
    }

    if (this.hasChildren()) {
      const events = this.props.on || {}
      events.click = this.onFold

      return <li class={`list-nested-item ${this.props.collapsed ? 'collapsed' : 'expanded'}`}>
        <div class='list-item' on={events}>
          <span>
            {this.props.icon ? <Icon name={this.props.icon}/> : null}
            {this.props.text}
          </span>
        </div>
        <ul class='list-tree'>
          {this.children}
        </ul>
      </li>
    } else {
      return <li class='list-item' on={this.props.on}>
        <span>
          {this.props.icon ? <Icon name={this.props.icon}/> : null}
          {this.props.text}
          {this.children}
        </span>
      </li>
    }
    return <p>Foo!</p>
  }
}
