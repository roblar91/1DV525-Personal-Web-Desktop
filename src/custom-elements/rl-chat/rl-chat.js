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

    this.loadFromStorage()
    this.askForUsername()
    // this.connect()
    // this.setupEventListeners()
  }

  connect () {
    this.socket = new window.WebSocket('ws://vhost3.lnu.se:20080/socket/')
  }

  setupEventListeners () {
    this.socket.addEventListener('open', event => {
      // Connected!
    })

    this.socket.addEventListener('close', event => {
      // Connection lost
    })

    this.socket.addEventListener('message', event => {
      const jsonData = JSON.parse(event.data)
      console.log(jsonData)
      if (jsonData.type === 'message') {
        this.printMessage(jsonData.username, jsonData.channel, jsonData.data)
      }
    })
  }

  loadFromStorage () {

  }

  askForUsername () {

  }

  printMessage (sender, channel, message) {
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')
    this.messages.appendChild(messageElement)

    const nameElement = document.createElement('div')
    nameElement.classList.add('sender')
    nameElement.textContent = sender
    messageElement.appendChild(nameElement)

    const dataElement = document.createElement('div')
    dataElement.classList.add('data')
    dataElement.textContent = message
    messageElement.appendChild(dataElement)
  }
}

window.customElements.define('rl-chat', RlChat)
