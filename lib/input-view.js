'use babel'

/** @jsx etch.dom */

import etch from 'etch'

import { EtchComponent } from './etch-component'
import { Editor } from './editor'
import { Icon } from './icon'

/**
* A generic input view, with validation.
*
* Use the {@link InputView.show} function to create a new view and to show it immediatly.
*
* If you prefer to wait before showing it, use the {@link InputView.attach} function on an instance of this class.
*
* This component is not meant to be contain any child or to be contained in another component.
*/
export class InputView extends EtchComponent {
  static show (title, onConfirm, placeholder, validate) {
    const view = new InputView({ title, onConfirm, placeholder, validate })
    view.attach()
    return view
  }

  constructor (props = {}, ch = []) {
    super(props, ch, { events: ['checkName'] })
    this.errors = []
    this.warnings = []

    this.subscriptions.add(atom.commands.add(this.element, 'core:cancel', () => { this.onCancel() }))
    this.subscriptions.add(atom.commands.add(this.element, 'core:confirm', () => { this.onConfirm() }))
  }

  attach () {
    this.panel = atom.workspace.addModalPanel({
      item: this.element
    })
    this.refs.input.element.focused()
  }

  checkName () {
    const input = this.refs.input.model.getText()
    const validation = this.props.validate(input)

    if (validation) {
      this.errors = validation.errors
      this.warnings = validation.warnings
    } else {
      this.errors = []
      this.warnings = []
    }

    this.update()
  }

  onCancel () {
    this.subscriptions.dispose()
    this.destroy()
  }

  onConfirm () {
    if (!this.errors.length === 0 && this.props.onConfirm) {
      this.props.onConfirm(this.refs.input.getText())
      this.destroy()
    }
  }

  render () {
    return <div className='block'>
      <div className='message'>{this.props.title}</div>
      <Editor ref='input' mini={true} placeholder={this.props.placeholder} on={{didChange: this.checkName}}/>
      {this.errors.length > 0
        ? this.errors.map(e => <div className='text-error'><Icon name='x'/> {e}</div>)
        : null}
      {this.warnings.length > 0
        ? this.warnings.map(w => <div className='text-warning'><Icon name='alert'/> {w}</div>)
        : null}
    </div>
  }

  destroy () {
    super.destroy()
    if (this.panel) {
      this.panel.destroy()
    }
  }
}
