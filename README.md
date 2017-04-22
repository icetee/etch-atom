# Atom UI

Small library to render useful components for Atom, with etch.

## Components

We provide these components:

- Icon, to display an icon
- TextEditor, a text editor, which can be used as an input field if `mini={true}`
- TreeView and Tree, to render a tree view, similar to the one you have to see your projects
- BackgroundMessage, a background message
- InputView, a modal dialog for the user to type something, with validation
- TabView, a useful base component for views which are displayed into a tab

There is also an `EtchComponent` class, which act as a base to create your own components.

## Example

```js
'use babel'

/** @jsx etch.dom */

import etch from 'etch'
import { CompositeDisposable } from 'atom'
import { EtchComponent, Icon, InputView, Editor, TabView } from 'atom-ui'

class MyView extends TabView {
  constructor (state) {
    super(props, {
      events: [ this.editorChanged ] // Bind event handlers to `this` automatically
    })
  }

  editorChanged () {
    console.log(this.refs.editor.model.getText())
  }

  render () {
    return <div class='block'>
      <Icon name='bell' size='medium'/>
      <Editor ref='editor' mini={true} on={{didStopChanging: this.editorChanged}} grammar='source.js'>
        console.log('Hello, world!')
      </Editor>
    </div>
  }
}

const subscriptions = new CompositeDisposable()
const view = new MyView(state.myView)

export function activate (state) {
  view.open()
  subscriptions.add(view)
}

export function serialize () {
  return {
    myView: view.serialize()
  }
}

export function deactivate () {
  subscriptions.dispose()
}
```

See the `example` directory for a more complete example.

# Events

To help you handle events (bind them automatically to `this`), you can use the `events` option of the `EtchComponent`'s constructor.

```js
class MyComponent extends EtchComponent {
  constructor (props, children) {
    super(props, children, { events: [ this.onClick ] })
    this.name = 'world'
  }

  onClick () {
    // You can use `this` here
    console.log(`Hello, ${this.name}!`)
  }

  render () {
    return <button on={{ click: this.onClick }}>Click me!</button>
  }
}
```
