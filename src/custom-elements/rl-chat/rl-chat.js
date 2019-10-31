import _css from './rl-chat-css.js'
import _html from './rl-chat-html.js'
import { ChatMessage } from './chat-message.js'
import { ChatChannel } from './chat-channel.js'

/**
 * A simple chat web application built as a HTML element.
 * For this element to work the attributes "src" and "key" must be set with
 * the URL to the server and the key used for authentication.
 *
 * @class RlChat
 * @extends {window.HTMLElement}
 * @requires ChatMessage
 * @requires ChatChannel
 */
class RlChat extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.channels = []
    this.messages = []
    this.activeChannel = ''
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = /* html */ `
    <style> ${_css} </style>
    ${_html}
    `

    this.elements = {
      messages: this.shadowRoot.getElementById('messages'),
      chatForm: this.shadowRoot.getElementById('chat-form'),
      chatInputText: this.shadowRoot.getElementById('chat-input-text'),
      popupOverlay: this.shadowRoot.getElementById('popup-overlay'),
      popupContent: this.shadowRoot.getElementById('popup-content'),
      changeUsernameButton: this.shadowRoot.getElementById('change-username-button'),
      addChannelButton: this.shadowRoot.getElementById('add-channel-button'),
      removeChannelButton: this.shadowRoot.getElementById('remove-channel-button'),
      channels: this.shadowRoot.getElementById('channels'),
      headerUsername: this.shadowRoot.getElementById('header-username')
    }

    this.constants = {
      nameLengthMin: 3,
      nameLengthMax: 10,
      nameRegex: /^\w+$/,
      nameRegexDescription: 'alphanumeric characters and underscore',
      channelNameLengthMin: 1,
      channelNameLengthMax: 30
    }

    this._readAttributes()
    this._loadFromStorage()

    if (!this.username) {
      this._newUsernamePopup()
    }

    this._loadDefaultChannel()
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
        this._addMessage(jsonData.channel, jsonData.username, jsonData.data, '')
      }
    })

    this.elements.chatForm.addEventListener('submit', event => {
      event.preventDefault()

      this._sendMessage(this.activeChannel.getName(), this.elements.chatInputText.value)
      this.elements.chatInputText.value = ''
    })

    this.elements.changeUsernameButton.addEventListener('click', event => {
      event.preventDefault()

      this._newUsernamePopup()
    })

    this.elements.addChannelButton.addEventListener('click', event => {
      event.preventDefault()

      this._newChannelPopup()
    })

    this.elements.removeChannelButton.addEventListener('click', event => {
      event.preventDefault()

      this._deleteChannelPopup()
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
          this._loadChannel(ch)
        })
      }
    }
  }

  _loadChannel (channelData) {
    this._addChannel(channelData.name)
    channelData.messages.forEach(msg => {
      this._addMessage(channelData.name, msg.sender, msg.message, msg.timestamp)
    })
  }

  _saveToStorage () {
    const channelData = []
    this.channels.forEach(ch => {
      channelData.push(ch.getDataAsJSON())
    })

    const saveData = {
      username: this.username,
      channels: channelData
    }

    window.localStorage.setItem('rl-chat', JSON.stringify(saveData))
  }

  _closePopup () {
    this.elements.popupContent.innerHTML = ''
    this.elements.popupOverlay.style.visibility = 'hidden'
  }

  _newUsernamePopup () {
    this.elements.popupOverlay.style.visibility = 'visible'

    this.elements.popupContent.innerHTML = /* html */ `
    <p>Enter a username</p>
    <form id="popup-form">
      <input id="popup-input-text" type="text" autocomplete="off" placeholder="Username">
      <p id="popup-input-invalid" style="display: none">
        A valid username must be ${this.constants.nameLengthMin} to ${this.constants.nameLengthMax} characters and only contain ${this.constants.nameRegexDescription}
      </p>
      <div id="popup-buttons">
        <input id="popup-submit" type="submit" value="Ok!">
      </div>
    </form>
    `
    const inputText = this.elements.popupContent.querySelector('#popup-input-text')
    const inputInvalid = this.elements.popupContent.querySelector('#popup-input-invalid')
    const form = this.elements.popupContent.querySelector('#popup-form')
    inputText.focus()

    form.addEventListener('submit', event => {
      event.preventDefault()

      if (this._setUsername(inputText.value)) {
        this._closePopup()
      } else {
        inputInvalid.style.display = 'block'
      }
    })
  }

  _newChannelPopup () {
    this.elements.popupOverlay.style.visibility = 'visible'

    this.elements.popupContent.innerHTML = /* html */ `
    <p>Enter a channel name</p>
    <form id="popup-form">
      <input id="popup-input-text" type="text" autocomplete="off" placeholder="Channel">
      <p id="popup-input-invalid" style="display: none">
        A valid channel name must be ${this.constants.channelNameLengthMin} to ${this.constants.channelNameLengthMax} characters and not be a duplicate
      </p>
      <div id="popup-buttons">
        <input id="popup-submit" type="submit" value="Ok!">
        <button id="popup-cancel">Cancel</button>
      </div>
    </form>
    `
    const inputText = this.elements.popupContent.querySelector('#popup-input-text')
    const inputInvalid = this.elements.popupContent.querySelector('#popup-input-invalid')
    const form = this.elements.popupContent.querySelector('#popup-form')
    const cancel = this.elements.popupContent.querySelector('#popup-cancel')
    inputText.focus()

    cancel.addEventListener('click', event => {
      event.preventDefault()
      this._closePopup()
    })

    form.addEventListener('submit', event => {
      event.preventDefault()

      if (this._addChannel(inputText.value)) {
        this._closePopup()
      } else {
        inputInvalid.style.display = 'block'
      }
    })
  }

  _deleteChannelPopup () {
    this.elements.popupOverlay.style.visibility = 'visible'

    this.elements.popupContent.innerHTML = /* html */ `
    <p>Select a channel to delete</p>
    <form id="popup-form">
      <select id="popup-select" name="delete-target">
      </select>
      <div id="popup-buttons">
        <input id="popup-submit" type="submit" value="Delete">
        <button id="popup-cancel">Cancel</button>
      </div>
    </form>
    `

    const form = this.elements.popupContent.querySelector('#popup-form')
    const select = this.elements.popupContent.querySelector('#popup-select')
    const cancel = this.elements.popupContent.querySelector('#popup-cancel')

    this.channels.forEach(ch => {
      const option = document.createElement('option')
      option.setAttribute('value', ch.getName())
      option.textContent = ch.getName()
      select.appendChild(option)
    })

    cancel.addEventListener('click', event => {
      event.preventDefault()
      this._closePopup()
    })

    form.addEventListener('submit', event => {
      event.preventDefault()

      const deleteTargetName = select.options[select.selectedIndex].value
      this._deleteChannel(deleteTargetName)

      this._closePopup()
    })
  }

  _setUsername (name) {
    if (!this._isValidUsername(name)) {
      return false
    }

    this.username = name
    this.elements.headerUsername.textContent = name
    this._saveToStorage()
    return true
  }

  _setCurrentChannel (channel) {
    this.activeChannel = channel

    this.channels.forEach(ch => {
      if (ch === channel) {
        ch.classList.add('active-channel')
      } else {
        ch.classList.remove('active-channel')
      }
    })

    this._updateChat()
    this._scrollToBottom()
  }

  _addChannel (name) {
    if (!this._isValidChannelName(name)) {
      return null
    }

    let duplicate = false
    this.channels.forEach(ch => {
      if (ch.getName() === name) {
        duplicate = true
      }
    })

    if (duplicate) {
      return null
    }

    const newChannel = new ChatChannel(name)
    this.channels.push(newChannel)
    this.elements.channels.appendChild(newChannel)

    newChannel.addEventListener('click', event => {
      this._setCurrentChannel(newChannel)
    })

    this._saveToStorage()
    return newChannel
  }

  _deleteChannel (deleteTargetName) {
    let deleteIndex
    this.channels.forEach((ch, index) => {
      if (ch.getName() === deleteTargetName) {
        deleteIndex = index
        ch.deleteAllMessages()
        ch.parentElement.removeChild(ch)
      }
    })

    this.channels.splice(deleteIndex, 1)
    this._saveToStorage()
  }

  _addMessage (channel, sender, message, timestamp) {
    this.channels.forEach(ch => {
      if (ch.getName() === channel) {
        const newMessage = new ChatMessage(sender, message, timestamp)
        ch.addMessage(newMessage)
        this.elements.messages.appendChild(newMessage)

        if (ch === this.activeChannel) {
          this._scrollToBottom()
        } else {
          newMessage.setHidden(true)
        }

        this._saveToStorage()
        return newMessage
      }
    })

    return null
  }

  _updateChat () {
    this.channels.forEach(ch => {
      if (ch === this.activeChannel) {
        ch.setMessagesHidden(false)
      } else {
        ch.setMessagesHidden(true)
      }
    })
  }

  _loadDefaultChannel () {
    if (this.channels.length === 0) {
      this._addChannel('General')
    }

    this._setCurrentChannel(this.channels[0])
  }

  _isValidUsername (username) {
    if (!username) {
      return false
    }

    if (username.length < this.constants.nameLengthMin) {
      return false
    }

    if (username.length > this.constants.nameLengthMax) {
      return false
    }

    return username.match(this.constants.nameRegex)
  }

  _isValidChannelName (channelName) {
    if (channelName.length < this.constants.channelNameLengthMin) {
      return false
    }

    if (channelName.length > this.channels.channelNameLengthMax) {
      return false
    }

    return true
  }

  _connect () {
    this.socket = new window.WebSocket(this.serverUrl)
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
