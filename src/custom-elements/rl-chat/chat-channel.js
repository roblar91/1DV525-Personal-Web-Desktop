const _css = /* css */ `
:host {
}
`

/**
 * A HTML element representing a chat channel.
 *
 * @class ChatChannel
 * @extends {window.HTMLElement}
 */
export class ChatChannel extends window.HTMLElement {
  /**
   * Creates an instance of ChatChannel.
   *
   * @param {string} name The name of the channel
   * @memberof ChatChannel
   */
  constructor (name) {
    super()
    this.attachShadow({ mode: 'open' })

    this._name = name
    this._messages = []
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${_css}</style>
    ${this._name}
    `
  }

  /**
   * Returns the name of this channel.
   *
   * @returns {string}
   * @memberof ChatChannel
   */
  getName () {
    return this._name
  }

  /**
   * Adds a chat message to this channel.
   *
   * @param {ChatMessage} message
   * @memberof ChatChannel
   */
  addMessage (message) {
    this._messages.push(message)
  }

  /**
   * Hides or reveals all messages associated with this channel.
   *
   * @param {boolean} hide
   * @memberof ChatChannel
   */
  setMessagesHidden (hide) {
    this._messages.forEach(msg => {
      msg.setHidden(hide)
    })
  }

  /**
   * Removes all chat messages associated with this channel.
   *
   * @memberof ChatChannel
   */
  deleteAllMessages () {
    for (let i = this._messages.length - 1; i >= 0; i--) {
      const msg = this._messages[i]
      msg.parentElement.removeChild(msg)
      this._messages.splice(i, 1)
    }
  }

  /**
   * Returns the data (name, messages) of this element as a JSON object.
   *
   * @returns {JSON}
   * @memberof ChatChannel
   */
  getDataAsJSON () {
    const messageData = []
    this._messages.forEach(msg => {
      messageData.push(msg.getDataAsJSON())
    })

    return {
      name: this._name,
      messages: messageData
    }
  }
}

window.customElements.define('chat-channel', ChatChannel)
