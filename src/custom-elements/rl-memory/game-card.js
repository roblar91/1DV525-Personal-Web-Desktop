class GameCard extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.shadowRoot.appendChild(document.createElement('img'))
    this.revealed = false
    this.updateImage()
  }

  disconnectedCallback () {
  }

  flip () {
    this.revealed = !this.revealed
    this.updateImage()
  }

  hide () {
    this.shadowRoot.querySelector('img').style.visibility = 'hidden'
  }

  setImages (frontUrl, backUrl) {
    this.frontUrl = frontUrl
    this.backUrl = backUrl
  }

  getFront () {
    return this.frontUrl
  }

  getBack () {
    return this.backUrl
  }

  updateImage () {
    if (this.revealed) {
      this.shadowRoot.querySelector('img').setAttribute('src', this.frontUrl)
    } else {
      this.shadowRoot.querySelector('img').setAttribute('src', this.backUrl)
    }
  }
}

window.customElements.define('game-card', GameCard)
