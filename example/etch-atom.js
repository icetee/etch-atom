'use babel'

/** @jsx etch.dom */

import { CompositeDisposable } from 'atom'
import etch from 'etch'

import { EtchComponent, Icon, InputView, Editor, BackgroundMessage, Tree, TreeView, TabView } from '../lib/etch-atom'

class Demo extends TabView {
  constructor (state) {
    super({ state, title: 'etch-atom Demo', icon: 'beaker' }, { events: ['editorChanged', 'itemClicked'] })
  }

  editorChanged () {
    console.log(this.refs.editor.model.getText())
  }

  itemClicked ({ target }) {
    console.log(target.innerHTML)
  }

  render () {
    return <div className='block'>
      <Icon name='bell' size='medium'/>
      <Editor ref='editor' mini={true} on={{didStopChanging: this.editorChanged}}>
        foo bar!
      </Editor>
      <p>Write some JavaScript bro!</p>
      <Editor grammar='source.js'>
        export const answer = 42
      </Editor>
      <TreeView>
        <Tree icon='rss' text='New articles'>
          <Tree icon='book' on={{ click: this.itemClicked }} text={<strong>etch-atom 0.1.0 released</strong>}/>
          <Tree icon='book' on={{ click: this.itemClicked }} text={<strong>Photos of my cat</strong>}/>
          <Tree icon='playback-play'text='Videos'>
            <Tree text='LOLCATS'/>
          </Tree>
        </Tree>
      </TreeView>
    </div>
  }
}

const subscriptions = new CompositeDisposable()

export function activate (state) {
  subscriptions.add(atom.commands.add('atom-workspace', {
    'etch-atom:demo': () => demo(),
    'etch-atom:input-demo': () => inputDemo()
  }))
}

export function deactivate () {
  subscriptions.dispose()
}

export function demo () {
  subscriptions.add(new Demo().open())
}

export function inputDemo () {
  subscriptions.add(InputView.show(
    'Type something',
    text => console.log(`You wrote: "${text}"`),
    'This is a placeholder',
    text => {
      const result = {}
      if (text.length > 42) {
        result.errors = [ 'Your input is too long.' ]
      }
      if (text.includes('I want a warning please')) {
        result.warnings = [ 'Here is a warning.', 'And even a second one for free' ]
      }
      return result
    })
  )
}
