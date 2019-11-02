import _html from './rl-life-html.js'
import _css from './rl-life-css.js'
import { LifeGame } from './LifeGrid.js'

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
      randomStateButton: this.shadowRoot.querySelector('#random-state-button'),
      loadStateButton: this.shadowRoot.querySelector('#load-state-button'),
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
    this.elements.setStateButton.addEventListener('click', event => {
      // do nothing
    })

    this.elements.nextStateButton.addEventListener('click', event => {
      this._nextState()
    })

    this.elements.autoPlayButton.addEventListener('click', event => {
      this._toggleAutoPlay()
    })

    this.elements.autoPlaySpeedButton.addEventListener('click', event => {
      // do nothing
    })

    this.elements.autoExpandButton.addEventListener('click', event => {
      // do nothing
    })

    this.elements.consolePrintButton.addEventListener('click', event => {
      this.lifeGame.printState(false)
    })

    this.elements.randomStateButton.addEventListener('click', event => {
      this._randomizeState()
    })

    this.elements.loadStateButton.addEventListener('click', event => {
      this._loadState()
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
    // todo: popup with options
    this.lifeGame.randomizeState(10, 10, 0.5)
    this._printCurrentState()
  }

  _loadState () {

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
        this.autoPlaySpeedDelay = 500
        this.elements.speedAverageButton.classList.add('active')
        break
      case 'fast':
        this.autoPlaySpeedDelay = 200
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
