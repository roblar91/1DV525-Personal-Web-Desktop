import css from './rl-pwd-window-css.js'
import html from './rl-pwd-window-html.js'

class RlPwdWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.mousedownHandler = this.mousedown.bind(this)
    this.mouseupHandler = this.mouseup.bind(this)
    this.mouseleaveHandler = this.mouseleave.bind(this)
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        ${css}  
      </style>
      ${html}
    `

    this.addEventListener('mousedown', this.mousedownHandler)
    this.addEventListener('mouseup', this.mouseupHandler)
    this.addEventListener('mouseleave', this.mouseleaveHandler)
  }

  mousedown (event) {
    console.log('mousedown')
  }

  mouseup (event) {
    console.log('mouseup')
  }

  mouseleave (event) {
    console.log('mouseleave')
  }
}

window.customElements.define('rl-pwd-window', RlPwdWindow)
