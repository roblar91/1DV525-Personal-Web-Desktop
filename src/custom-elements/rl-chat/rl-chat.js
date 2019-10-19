import css from './rl-chat-css.js'
import html from './rl-chat-html.js'

class RlChat extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = /* html */ `
      <style> ${css} </style>
      ${html}
      `
  }
}

window.customElements.define('rl-chat', RlChat)
