import _html from './rl-life-html.js'
import _css from './rl-life-css.js'
import { LifeGame } from './LifeGrid.js'

class RlLife extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.lifeGame = new LifeGame()
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

    this._setupEventListeners()
  }

  _setupEventListeners () {
    this.elements.setStateButton.addEventListener('click', event => {
      console.log('set state click')
    })

    this.elements.nextStateButton.addEventListener('click', event => {
      console.log('next state click')
      this.lifeGame.advanceState()
      this._printCurrentState()
    })

    this.elements.autoPlayButton.addEventListener('click', event => {
      console.log('auto play click')
    })

    this.elements.autoPlaySpeedButton.addEventListener('click', event => {
      console.log('auto play speed click')
    })

    this.elements.autoExpandButton.addEventListener('click', event => {
      console.log('auto expand click')
    })

    this.elements.consolePrintButton.addEventListener('click', event => {
      console.log('console print click')
      this.lifeGame.printState(false)
    })

    this.elements.randomStateButton.addEventListener('click', event => {
      console.log('random state click')
      this.lifeGame.randomizeState(10, 10, 0.5)
      this._printCurrentState()
    })

    this.elements.loadStateButton.addEventListener('click', event => {
      console.log('load state click')
    })

    this.elements.speedSlowButton.addEventListener('click', event => {
      console.log('speed slow click')
    })

    this.elements.speedAverageButton.addEventListener('click', event => {
      console.log('speed average click')
    })

    this.elements.speedFastButton.addEventListener('click', event => {
      console.log('speed fast click')
    })

    this.elements.autoExpandTrueButton.addEventListener('click', event => {
      console.log('auto expand true click')
    })

    this.elements.autoExpandFalseButton.addEventListener('click', event => {
      console.log('auto expand false click')
    })
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
