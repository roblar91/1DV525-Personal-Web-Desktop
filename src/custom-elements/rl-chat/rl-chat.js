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

    const socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    socket.addEventListener('open', event => {
      // Connected!
    })

    socket.addEventListener('message', event => {
      console.log(event.data)
    })
  }
}

window.customElements.define('rl-chat', RlChat)
