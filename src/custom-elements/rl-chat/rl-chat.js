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
    this._saveToStorage()
    this.socket.close()
  }

  _readAttributes () {
    this.serverUrl = this.getAttribute('src')
    this.key = this.getAttribute('key')
  }

  _loadFromStorage () {
    const saveData = JSON.parse(window.localStorage.getItem('rl-chat'))

    if (saveData) {
      if (saveData.username) {
        this.username = saveData.username
      }
    }
  }

  _saveToStorage () {
    const saveData = {
      username: this.username
    }

    window.localStorage.setItem('rl-chat', JSON.stringify(saveData))
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

      const inputInvalid = document.createElement('p')
      form.appendChild(inputInvalid)

      const inputSubmit = document.createElement('input')
      inputSubmit.setAttribute('type', 'submit')
      inputSubmit.value = 'Ok!'
      form.appendChild(inputSubmit)

      form.addEventListener('submit', event => {
        event.preventDefault()

        if (this._isValidUsername(inputText.value)) {
          this.username = inputText.value
          this.elements.popupContent.innerHTML = ''
          this.elements.popupOverlay.style.visibility = 'hidden'
        } else {
          inputInvalid.textContent = 'A valid username must be 3 to 10 characters and only contain alphanumeric characters or underscores'
        }
      })
    }
  }

  _isValidUsername (username) {
    const minLength = 3
    const maxLength = 10
    const allowedCharacters = /^\w+$/

    if (!username) {
      return false
    }

    if (username.length < minLength) {
      return false
    }

    if (username.length > maxLength) {
      return false
    }

    return username.match(allowedCharacters)
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
