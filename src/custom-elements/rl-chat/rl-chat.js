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

    this.messages = this.shadowRoot.getElementById('messages')

    const socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
    socket.addEventListener('open', event => {
      // Connected!
    })

    socket.addEventListener('message', event => {
      const jsonData = JSON.parse(event.data)
      console.log(jsonData)
      if (jsonData.type === 'message') {
        this.printMessage(jsonData.username, jsonData.channel, jsonData.data)
      }
    })
  }

  printMessage (sender, channel, message) {
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')
    this.messages.appendChild(messageElement)

    const nameElement = document.createElement('div')
    nameElement.textContent = sender
    messageElement.appendChild(nameElement)

    const dataElement = document.createElement('div')
    dataElement.textContent = message
    messageElement.appendChild(dataElement)
  }
}

window.customElements.define('rl-chat', RlChat)
