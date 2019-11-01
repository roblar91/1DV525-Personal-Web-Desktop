import _html from './rl-life-html.js'
import _css from './rl-life-css.js'

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
  }
}

window.customElements.define('rl-life', RlLife)
