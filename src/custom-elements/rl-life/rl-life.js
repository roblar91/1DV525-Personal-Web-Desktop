import _html from './rl-life-html.js'
import _css from './rl-life-css.js'
import { LifeGrid } from './LifeGrid.js'

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

    this._setupEventListeners()
  }

  _setupEventListeners () {
    this.elements.setStateButton.addEventListener('click', event => {
      console.log('set state click')
      const state = [
        [0, 0, 1],
        [0, 0, 0],
        [0, 1, 0]
      ]
      const life = new LifeGrid()
      life.setState(state)
      life.printState()
    })

    this.elements.nextStateButton.addEventListener('click', event => {
      console.log('next state click')
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
    })

    this.elements.randomStateButton.addEventListener('click', event => {
      console.log('random state click')
      const life = new LifeGrid()
      life.randomizeState(10, 10, 0.3)
      life.printState(false)
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
}

window.customElements.define('rl-life', RlLife)
