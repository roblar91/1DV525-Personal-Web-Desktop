import css from './rl-chat-css.js'
import html from './rl-chat-html.js'

const SERVER_URL = 'ws://vhost3.lnu.se:20080/socket/'
const KEY = 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'

/**
 * A simple chat web application.
 *
 * @class RlChat
 * @extends {window.HTMLElement}
 */
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
    this.chatForm = this.shadowRoot.getElementById('chat-form')
    this.chatInputText = this.shadowRoot.getElementById('chat-input-text')

    this._loadFromStorage()
    this._askForUsername()
    this._connect()
    this._setupEventListeners()
  }

  _loadFromStorage () {

  }

  _askForUsername () {
    this.username = 'k'
  }

  _connect () {
    this.socket = new window.WebSocket(SERVER_URL)
  }

  _setupEventListeners () {
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
        this._printMessage(jsonData.username, jsonData.channel, jsonData.data)
      }
    })

    this.chatForm.addEventListener('submit', event => {
      event.preventDefault()

      this._sendMessage('', this.chatInputText.value)
      this.chatInputText.value = ''
    })
  }

  _printMessage (sender, channel, message) {
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

  _sendMessage (channel, message) {
    const data = {
      username: this.username,
      type: 'message',
      channel: channel,
      data: message,
      key: KEY
    }

    this.socket.send(JSON.stringify(data))
  }
}

window.customElements.define('rl-chat', RlChat)
