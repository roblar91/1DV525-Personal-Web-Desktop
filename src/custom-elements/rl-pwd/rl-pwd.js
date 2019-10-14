import '../rl-clock/rl-clock.js'
import '../rl-pwd-window/rl-pwd-window.js'
import css from './rl-pwd-css.js'
import html from './rl-pwd-html.js'

class RlPwd extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        ${css}  
      </style>
      ${html}
    `
  }
}

window.customElements.define('rl-pwd', RlPwd)
