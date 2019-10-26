import css from './rl-chat-css.js'
import html from './rl-chat-html.js'

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

    this.elements = {
      messages: this.shadowRoot.getElementById('messages'),
      chatForm: this.shadowRoot.getElementById('chat-form'),
      chatInputText: this.shadowRoot.getElementById('chat-input-text'),
      popupOverlay: this.shadowRoot.getElementById('popup-overlay'),
      popupContent: this.shadowRoot.getElementById('popup-content')
    }

    this._readAttributes()
    this._loadFromStorage()
    this._askForUsername()
    this._connect()
    this._setupEventListeners()
  }

  disconnectedCallback () {
    this.socket.close()
  }

  _readAttributes () {
    this.serverUrl = this.getAttribute('src')
    this.key = this.getAttribute('key')
  }

  _loadFromStorage () {

  }

  _askForUsername () {
    if (!this.username) {
      this.elements.popupOverlay.style.visibility = 'visible'

      const text = document.createElement('p')
      text.textContent = 'Enter a username'
      this.elements.popupContent.appendChild(text)

      const form = document.createElement('form')
      this.elements.popupContent.appendChild(form)

      const inputText = document.createElement('input')
      inputText.setAttribute('type', 'text')
      inputText.setAttribute('placeholder', 'Username')
      form.appendChild(inputText)

      const inputSubmit = document.createElement('input')
      inputSubmit.setAttribute('type', 'submit')
      inputSubmit.value = 'Ok!'
      form.appendChild(inputSubmit)

      form.addEventListener('submit', event => {
        event.preventDefault()
        console.log('Username: ', inputText.value)
        this.username = inputText.value

        while (this.elements.popupContent.firstElementChild) {
          this.elements.popupContent.removeChild(this.elements.popupContent.firstElementChild)
        }

        this.elements.popupOverlay.style.visibility = 'hidden'
      })
    }
  }

  _connect () {
    this.socket = new window.WebSocket(this.serverUrl)
  }

  _setupEventListeners () {
    this.socket.addEventListener('open', event => {
      console.log('Chat connected to ' + this.socket.url)
    })

    this.socket.addEventListener('close', event => {
      console.log('Chat closed connection to ' + this.socket.url)
    })

    this.socket.addEventListener('message', event => {
      const jsonData = JSON.parse(event.data)
      console.log(jsonData)
      if (jsonData.type === 'message') {
        this._printMessage(jsonData.username, jsonData.channel, jsonData.data)
      }
    })

    this.elements.chatForm.addEventListener('submit', event => {
      event.preventDefault()

      this._sendMessage('', this.elements.chatInputText.value)
      this.elements.chatInputText.value = ''
    })
  }

  _printMessage (sender, channel, message) {
    const messageElement = document.createElement('div')
    messageElement.classList.add('message')
    this.elements.messages.appendChild(messageElement)

    const nameElement = document.createElement('div')
    nameElement.classList.add('sender')
    nameElement.textContent = sender
    messageElement.appendChild(nameElement)

    const dataElement = document.createElement('div')
    dataElement.classList.add('data')
    dataElement.textContent = message
    messageElement.appendChild(dataElement)

    this._scrollToBottom()
  }

  _sendMessage (channel, message) {
    const data = {
      username: this.username,
      type: 'message',
      channel: channel,
      data: message,
      key: this.key
    }

    this.socket.send(JSON.stringify(data))
  }

  _scrollToBottom () {
    this.elements.messages.scrollTop = this.elements.messages.scrollHeight - this.elements.messages.clientHeight
  }
}

window.customElements.define('rl-chat', RlChat)
