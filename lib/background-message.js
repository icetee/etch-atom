'use babel'

/** @jsx etch.dom */

import etch from 'etch'

import { EtchComponent } from './etch-component'

export class BackgroundMessage extends EtchComponent {
  render () {
    return <ul className={`background-message ${this.props.notCentered ? '' : 'centered'}`}>
      <li>
        {this.children}
      </li>
    </ul>
  }
}
