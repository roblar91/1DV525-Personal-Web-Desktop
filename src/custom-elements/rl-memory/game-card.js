/**
 * A HTML element representing a two-faced game card.
 *
 * @class GameCard
 * @extends {window.HTMLElement}
 */
class GameCard extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = /* html */ `
    <style>
    :host {
      display: inline-block;
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }
    </style>
    `

    this.setAttribute('tabindex', '0')
    this.shadowRoot.appendChild(document.createElement('img'))
    this.revealed = false
    this._updateImage()
  }

  _updateImage () {
    if (this.revealed) {
      this.shadowRoot.querySelector('img').setAttribute('src', this.frontUrl)
    } else {
      this.shadowRoot.querySelector('img').setAttribute('src', this.backUrl)
    }
  }

  /**
   * Swaps the image being displayed from front to back or vice-versa.
   *
   * @memberof GameCard
   */
  flip () {
    this.revealed = !this.revealed

    this._updateImage()
  }

  /**
   * Hides this card by adding visibility="hidden" to it's style.
   *
   * @memberof GameCard
   */
  hide () {
    this.shadowRoot.querySelector('img').style.visibility = 'hidden'
  }

  /**
   * Sets the images to be used for the front and back of this card.
   *
   * @param {string} frontUrl
   * @param {string} backUrl
   * @memberof GameCard
   */
  setImages (frontUrl, backUrl) {
    this.frontUrl = frontUrl
    this.backUrl = backUrl
  }

  /**
   * Returns the URL of the image used for the front of this card.
   *
   * @returns {string}
   * @memberof GameCard
   */
  getFront () {
    return this.frontUrl
  }

  /**
   * Returns the URL of the image used for the back of this card.
   *
   * @returns {string}
   * @memberof GameCard
   */
  getBack () {
    return this.backUrl
  }
}

window.customElements.define('game-card', GameCard)
