const _css = /* css */ `
:host {
    display: flex;
}
`

/**
 * A HTML element representing a chat message.
 *
 * @class ChatMessage
 * @extends {window.HTMLElement}
 */
export class ChatMessage extends window.HTMLElement {
  /**
   * Creates an instance of ChatMessage.
   *
   * @param {string} sender Name of sender
   * @param {string} message Message content
   * @param {string} timestamp Time when message was received
   * @memberof ChatMessage
   */
  constructor (sender, message, timestamp) {
    super()
    this.attachShadow({ mode: 'open' })

    this.sender = sender
    this.message = message
    this.timestamp = timestamp
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${_css}</style>
    <div id="sender">${this.sender}</div>
    <div id="timestamp">${this.timestamp}</div>
    <div id="message">${this.message}</div>
    `
  }

  /**
   * Hides or reveals this message.
   *
   * @param {boolean} hide
   * @memberof ChatMessage
   */
  setHidden (hide) {
    if (hide) {
      this.style.display = 'none'
    } else {
      this.style.display = 'flex'
    }
  }

  /**
   * Returns the data (name, message, timestamp) of this element as a JSON object.
   *
   * @returns {JSON}
   * @memberof ChatMessage
   */
  getDataAsJSON () {
    return {
      sender: this.sender,
      message: this.message,
      timestamp: this.timestamp
    }
  }
}

window.customElements.define('chat-message', ChatMessage)
