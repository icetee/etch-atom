'use babel'

/** @jsx etch.dom */

import etch from 'etch'
import { EtchComponent } from './etch-component'

/**
* An icon. See the Styleguide for a list of available icons.
*
* Properties:
*
* - name: the name of the icon, as it is in the styleguide
* - size: large, medium or small (default)
*/
export class Icon extends EtchComponent {
  /**
  * @param name {string}
  */
  constructor ({ name }) {
    super({ name }, [])
  }

  render () {
    let style
    switch (this.props.size) {
      case 'large':
        style = 'font-size: 48px;'
        break
      case 'medium':
        style = 'font-size: 32px;'
        break
    }
    return <span style={style} className={`icon icon-${this.props.name}`}></span>
  }
}
