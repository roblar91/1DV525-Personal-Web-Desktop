import './game-card.js'

const _cardBack = './resources/rl-memory/0.png'
const _cardFronts = []
_cardFronts.push('./resources/rl-memory/1.png')
_cardFronts.push('./resources/rl-memory/3.png')
_cardFronts.push('./resources/rl-memory/2.png')
_cardFronts.push('./resources/rl-memory/4.png')
_cardFronts.push('./resources/rl-memory/5.png')
_cardFronts.push('./resources/rl-memory/6.png')
_cardFronts.push('./resources/rl-memory/7.png')
_cardFronts.push('./resources/rl-memory/8.png')

const _boardCss = /* css */ `
:host {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
}

header p {
  display: inline;
  margin-right: 2em;
}

game-card {
  width: 6rem;
  height: 6rem;
}
`

/**
 * A simple memory game implemented as a HTML element.
 *
 * @class RlMemory
 * @extends {window.HTMLElement}
 * @requires GameCard
 */
class RlMemory extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = /* html */ `
    <style>${_boardCss}</style>
    <header>
      <p>Hits: <span id="hits"></span></p>
      <p>Misses: <span id="misses"></span></p>
      <button id="resetbutton">Reset</button>
    </header>
    <main>
    </main>
    `

    this.elements = {
      resetbutton: this.shadowRoot.querySelector('#resetbutton'),
      main: this.shadowRoot.querySelector('main')
    }

    this.elements.resetbutton.addEventListener('click', event => {
      this._initializeBoard()
    })

    this._initializeBoard()
  }

  static get observedAttributes () {
    return ['grid-x', 'grid-y']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'grid-x' || name === 'grid-y') {
      this._initializeBoard()
    }
  }

  _cardClicked (card) {
    if (card.revealed) {
      return
    }

    if (this.firstSelectedCard === null) {
      this.firstSelectedCard = card
      card.flip()
    } else if (this.secondSelectedCard === null && card !== this.firstSelectedCard) {
      this.secondSelectedCard = card
      card.flip()

      if (this.firstSelectedCard.getFront() === this.secondSelectedCard.getFront()) {
        this.hits++

        setTimeout(() => {
          this.firstSelectedCard.hide()
          this.secondSelectedCard.hide()
          this.firstSelectedCard = null
          this.secondSelectedCard = null
        }, 1000)
      } else {
        this.misses++

        setTimeout(() => {
          this.firstSelectedCard.flip()
          this.secondSelectedCard.flip()
          this.firstSelectedCard = null
          this.secondSelectedCard = null
        }, 1000)
      }

      this._updateText()
    }
  }

  _updateText () {
    this.shadowRoot.querySelector('#misses').textContent = this.misses
    this.shadowRoot.querySelector('#hits').textContent = this.hits
  }

  _initializeBoard () {
    // Clear the board
    console.log(this.elements.main)
    console.log(this.elements.main.firstElementChild)
    while (this.elements.main.firstElementChild) {
      this.elements.main.removeChild(this.elements.main.firstElementChild)
    }

    this.hits = 0
    this.misses = 0
    this.firstSelectedCard = null
    this.secondSelectedCard = null
    this._updateText()

    // Set default grid size if no attributes are set
    this.gridX = this.getAttribute('grid-x') ? this.getAttribute('grid-x') : 4
    this.gridY = this.getAttribute('grid-y') ? this.getAttribute('grid-y') : 4

    // Make sure we create an even amount of cards
    this.cardsTotal = this.gridX * this.gridY
    if (this.cardsTotal % 2 === 1) {
      this.cardsTotal--
    }

    // Make sure we dont create more cards than we have images for
    if (this.cardsTotal > _cardFronts.length * 2) {
      this.cardsTotal = _cardFronts.length * 2
    }

    // Create an empty deck and populate it
    this.cards = []
    for (let i = 0; i < this.cardsTotal; i++) {
      const card = document.createElement('game-card')
      card.setImages(_cardFronts[Math.floor(i / 2)], _cardBack)
      this.cards.push(card)

      card.addEventListener('click', event => {
        this._cardClicked(card)
      })

      card.addEventListener('keydown', event => {
        if (event.keyCode === 13) {
          this._cardClicked(card)
        }
      })
    }

    this._shuffle(this.cards)

    this.rows = []
    for (let i = 0; i < this.gridY; i++) {
      this.rows[i] = document.createElement('div')
    }

    for (let i = 0; i < this.cardsTotal; i++) {
      this.rows[Math.floor(i / this.gridX)].appendChild(this.cards[i])
    }

    for (let i = 0; i < this.rows.length; i++) {
      this.elements.main.appendChild(this.rows[i])
    }
  }

  _shuffle (arr) {
    let remaining = arr.length

    while (remaining > 0) {
      const rand = Math.floor(Math.random() * remaining)
      remaining--

      const temp = arr[remaining]
      arr[remaining] = arr[rand]
      arr[rand] = temp
    }
  }
}

window.customElements.define('rl-memory', RlMemory)
