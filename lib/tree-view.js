'use babel'

/** @jsx etch.dom */

import etch from 'etch'

import { EtchComponent } from './etch-component'

export class TreeView extends EtchComponent {
  render () {
    let cls = 'list-tree'
    if (this.props.noCollapse) {
      for (const ch of this.children) {
        ch.props.noCollapse = true
      }
    } else {
      cls += ' has-collapsable-children'
    }

    return <ul className={cls}>
      {this.children}
    </ul>
  }
}
