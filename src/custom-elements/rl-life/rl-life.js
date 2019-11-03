import _html from './rl-life-html.js'
import _css from './rl-life-css.js'
import { LifeGame } from './LifeGrid.js'
import { glider, gliderGun, thunderbird } from './Patterns.js'

/**
 * A game of life simulator implemented as a custom HTML element.
 *
 * @class RlLife
 * @requires LifeGrid
 * @extends {window.HTMLElement}
 */
class RlLife extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${_css}</style>
    ${_html}
    `

    this.elements = {
      header: this.shadowRoot.querySelector('header'),
      main: this.shadowRoot.querySelector('main'),
      setStateButton: this.shadowRoot.querySelector('#set-state-button'),
      nextStateButton: this.shadowRoot.querySelector('#next-state-button'),
      autoPlayButton: this.shadowRoot.querySelector('#auto-play-button'),
      autoPlaySpeedButton: this.shadowRoot.querySelector('#auto-play-speed-button'),
      autoExpandButton: this.shadowRoot.querySelector('#auto-expand-button'),
      consolePrintButton: this.shadowRoot.querySelector('#console-print-button'),
      loadStateButton: this.shadowRoot.querySelector('#load-state-button'),
      randomStateButton: this.shadowRoot.querySelector('#random-state-button'),
      gliderButton: this.shadowRoot.querySelector('#glider-button'),
      gliderGunButton: this.shadowRoot.querySelector('#glider-gun-button'),
      thunderbirdButton: this.shadowRoot.querySelector('#thunderbird-button'),
      speedSlowButton: this.shadowRoot.querySelector('#speed-slow-button'),
      speedAverageButton: this.shadowRoot.querySelector('#speed-average-button'),
      speedFastButton: this.shadowRoot.querySelector('#speed-fast-button'),
      autoExpandTrueButton: this.shadowRoot.querySelector('#auto-expand-true-button'),
      autoExpandFalseButton: this.shadowRoot.querySelector('#auto-expand-false-button')
    }

    this.lifeGame = new LifeGame()
    this.autoPlay = false
    this._setAutoPlaySpeed('average')
    this._setAutoExpand(false)

    this._setupEventListeners()
  }

  _setupEventListeners () {
    this.elements.nextStateButton.addEventListener('click', event => {
      this._nextState()
    })

    this.elements.autoPlayButton.addEventListener('click', event => {
      this._toggleAutoPlay()
    })

    this.elements.consolePrintButton.addEventListener('click', event => {
      this.lifeGame.printState(true)
    })

    this.elements.loadStateButton.addEventListener('click', event => {
      this._readTextFromFile()
    })

    this.elements.randomStateButton.addEventListener('click', event => {
      this._randomizeState()
    })

    this.elements.gliderButton.addEventListener('click', event => {
      this._loadStateFromText(glider)
    })

    this.elements.gliderGunButton.addEventListener('click', event => {
      this._loadStateFromText(gliderGun)
    })

    this.elements.thunderbirdButton.addEventListener('click', event => {
      this._loadStateFromText(thunderbird)
    })

    this.elements.speedSlowButton.addEventListener('click', event => {
      this._setAutoPlaySpeed('slow')
    })

    this.elements.speedAverageButton.addEventListener('click', event => {
      this._setAutoPlaySpeed('average')
    })

    this.elements.speedFastButton.addEventListener('click', event => {
      this._setAutoPlaySpeed('fast')
    })

    this.elements.autoExpandTrueButton.addEventListener('click', event => {
      this._setAutoExpand(true)
    })

    this.elements.autoExpandFalseButton.addEventListener('click', event => {
      this._setAutoExpand(false)
    })
  }

  _nextState () {
    this.lifeGame.advanceState()
    this._printCurrentState()
  }

  _toggleAutoPlay () {
    if (this.autoPlay) {
      this.autoPlay = false
      this.elements.autoPlayButton.classList.remove('active')
    } else {
      this.autoPlay = true
      this.elements.autoPlayButton.classList.add('active')

      this._autoplay()
    }
  }

  _autoplay () {
    if (this.autoPlay) {
      this._nextState()
      setTimeout(() => this._autoplay(), this.autoPlaySpeedDelay)
    }
  }

  _randomizeState () {
    this.lifeGame.randomizeState(10, 10, 0.5)
    this._printCurrentState()
  }

  _readTextFromFile () {
    const input = document.createElement('input')
    input.type = 'file'

    input.addEventListener('change', event => {
      const file = event.target.files[0]
      const reader = new window.FileReader()

      reader.readAsText(file, 'UTF-8')
      reader.addEventListener('load', event => {
        this._loadStateFromText(event.target.result)
      })
    })

    input.click()
  }

  _loadStateFromText (text) {
    const padding = 5
    const rawRows = text.split('\n')
    const filteredRows = []
    let columns = 0

    rawRows.forEach(r => {
      if (r[0] !== '!') {
        filteredRows.push(r)
        if (r.length > columns) {
          columns = r.length
        }
      }
    })

    const state = []
    for (let rowIndex = 0; rowIndex < filteredRows.length; rowIndex++) {
      const row = []

      for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
        let cell

        try {
          if (filteredRows[rowIndex][columnIndex] === 'O') {
            cell = 1
          } else {
            cell = 0
          }
        } catch {
          cell = 0
        }

        row.push(cell)
      }

      state.push(row)
    }

    const paddedState = this._padState(state, padding)

    this.lifeGame.setState(paddedState)
    this._printCurrentState()
  }

  _padState (state, padding) {
    for (let i = 0; i < padding; i++) {
      state = this.lifeGame.padGrid(state, 'all')
    }

    return state
  }

  _setAutoPlaySpeed (speed) {
    this.elements.speedSlowButton.classList.remove('active')
    this.elements.speedAverageButton.classList.remove('active')
    this.elements.speedFastButton.classList.remove('active')

    switch (speed) {
      case 'slow':
        this.autoPlaySpeedDelay = 1000
        this.elements.speedSlowButton.classList.add('active')
        break
      case 'average':
        this.autoPlaySpeedDelay = 200
        this.elements.speedAverageButton.classList.add('active')
        break
      case 'fast':
        this.autoPlaySpeedDelay = 50
        this.elements.speedFastButton.classList.add('active')
    }
  }

  _setAutoExpand (bool) {
    if (bool) {
      this.elements.autoExpandTrueButton.classList.add('active')
      this.elements.autoExpandFalseButton.classList.remove('active')
    } else {
      this.elements.autoExpandTrueButton.classList.remove('active')
      this.elements.autoExpandFalseButton.classList.add('active')
    }

    this.lifeGame.setAutoExpand(bool)
  }

  _printCurrentState () {
    this.elements.main.innerHTML = ''
    for (let rowIndex = 0; rowIndex < this.lifeGame.getRowCount(); rowIndex++) {
      const row = document.createElement('div')
      row.classList.add('cell-row')

      for (let columnIndex = 0; columnIndex < this.lifeGame.getColumnCount(); columnIndex++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')

        if (this.lifeGame.getCellAt(rowIndex, columnIndex) === 1) {
          cell.classList.add('alive')
        }

        row.appendChild(cell)
      }

      this.elements.main.appendChild(row)
    }
  }
}

window.customElements.define('rl-life', RlLife)
