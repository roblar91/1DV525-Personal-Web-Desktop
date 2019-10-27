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
    this.channels = []
    this.activeChannel = ''
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
      popupContent: this.shadowRoot.getElementById('popup-content'),
      addChannelButton: this.shadowRoot.getElementById('add-channel-button'),
      channels: this.shadowRoot.getElementById('channels')
    }

    this._readAttributes()
    this._loadFromStorage()
    this._askForUsername()
    this._setDefaultChannel()
    this._connect()
    this._setupEventListeners()
  }

  disconnectedCallback () {
    this._saveToStorage()
    this.socket.close()
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

      this._sendMessage(this.activeChannel, this.elements.chatInputText.value)
      this.elements.chatInputText.value = ''
    })

    this.elements.addChannelButton.addEventListener('click', event => {
      event.preventDefault()

      this._askForChannel()
    })
  }

  _readAttributes () {
    this.serverUrl = this.getAttribute('src')
    this.key = this.getAttribute('key')
  }

  _loadFromStorage () {
    const saveData = JSON.parse(window.localStorage.getItem('rl-chat'))

    if (saveData) {
      if (saveData.username) {
        this._setUsername(saveData.username)
      }
      if (saveData.channels) {
        saveData.channels.forEach(ch => {
          this._addChannel(ch)
        })
        this._updateChannelList()
      }
    }
  }

  _saveToStorage () {
    const saveData = {
      username: this.username,
      channels: this.channels
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

        if (this._setUsername(inputText.value)) {
          this.elements.popupContent.innerHTML = ''
          this.elements.popupOverlay.style.visibility = 'hidden'
        } else {
          inputInvalid.textContent = 'A valid username must be 3 to 10 characters and only contain alphanumeric characters or underscores'
        }
      })
    }
  }

  _askForChannel () {
    this.elements.popupOverlay.style.visibility = 'visible'

    const text = document.createElement('p')
    text.textContent = 'Enter a channel name'
    this.elements.popupContent.appendChild(text)

    const form = document.createElement('form')
    this.elements.popupContent.appendChild(form)

    const inputText = document.createElement('input')
    inputText.setAttribute('type', 'text')
    inputText.setAttribute('placeholder', 'Channel')
    form.appendChild(inputText)

    const inputInvalid = document.createElement('p')
    form.appendChild(inputInvalid)

    const inputSubmit = document.createElement('input')
    inputSubmit.setAttribute('type', 'submit')
    inputSubmit.value = 'Ok!'
    form.appendChild(inputSubmit)

    const cancelButton = document.createElement('button')
    cancelButton.textContent = 'Cancel'
    this.elements.popupContent.appendChild(cancelButton)
    cancelButton.addEventListener('click', event => {
      event.preventDefault()
      this.elements.popupContent.innerHTML = ''
      this.elements.popupOverlay.style.visibility = 'hidden'
    })

    form.addEventListener('submit', event => {
      event.preventDefault()

      if (this._addChannel(inputText.value)) {
        this.elements.popupContent.innerHTML = ''
        this.elements.popupOverlay.style.visibility = 'hidden'
      } else {
        inputInvalid.textContent = 'A valid channel name must be 1 to 20 characters'
      }
    })
  }

  _setUsername (name) {
    if (!this._isValidUsername(name)) {
      return false
    }

    this.username = name
    return true
  }

  _addChannel (name) {
    if (!this._isValidChannelName(name)) {
      return false
    }
    this.channels.push(name)
    this._updateChannelList()
    return true
  }

  _updateChannelList () {
    this.elements.channels.innerHTML = ''

    this.channels.forEach(ch => {
      const text = document.createElement('p')
      text.textContent = ch

      const button = document.createElement('button')
      button.appendChild(text)
      button.addEventListener('click', event => {
        this.activeChannel = ch
        this._updateChat()
      })

      this.elements.channels.appendChild(button)
    })
  }

  _updateChat () {
    const messages = this.elements.messages.children
    Object.keys(messages).forEach(key => {
      const msg = messages[key]
      if (msg.getAttribute('channel') === this.activeChannel) {
        msg.style.display = 'block'
      } else {
        msg.style.display = 'none'
      }
    })
  }

  _setDefaultChannel () {
    if (this.channels.length === 0) {
      this._addChannel('General')
    }

    this.activeChannel = this.channels[0]
    this._updateChat()
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

  _isValidChannelName (channelName) {
    const minLength = 1
    const maxLength = 20

    if (channelName.length < minLength) {
      return false
    }

    if (channelName.length > maxLength) {
      return false
    }

    return true
  }

  _connect () {
    this.socket = new window.WebSocket(this.serverUrl)
  }

  _printMessage (sender, channel, message) {
    // Ignore message if it is directed at an unknown channel
    if (this.channels.indexOf(channel) < 0) {
      return
    }

    const messageElement = document.createElement('div')
    messageElement.classList.add('message')
    messageElement.setAttribute('channel', channel)
    this.elements.messages.appendChild(messageElement)

    const nameElement = document.createElement('div')
    nameElement.classList.add('sender')
    nameElement.textContent = sender
    messageElement.appendChild(nameElement)

    const dataElement = document.createElement('div')
    dataElement.classList.add('data')
    dataElement.textContent = message
    messageElement.appendChild(dataElement)

    if (channel === this.activeChannel) {
      this._scrollToBottom()
    } else {
      messageElement.style.display = 'none'
    }
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
