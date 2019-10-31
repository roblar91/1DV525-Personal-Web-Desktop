import _css from './rl-memory-css.js'
import _html from './rl-memory-html.js'
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
    <style>${_css}</style>
    ${_html}
    `

    this.elements = {
      resetbutton: this.shadowRoot.querySelector('#resetbutton'),
      main: this.shadowRoot.querySelector('main'),
      selectColumns: this.shadowRoot.querySelector('#columns'),
      selectRows: this.shadowRoot.querySelector('#rows'),
      selectFlashMode: this.shadowRoot.querySelector('#flash-mode')
    }

    this.elements.resetbutton.addEventListener('click', event => {
      this._initializeBoard()
    })
  }

  _cardClicked (card) {
    if (card.revealed || this.inputLocked) {
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
    while (this.elements.main.firstElementChild) {
      this.elements.main.removeChild(this.elements.main.firstElementChild)
    }

    this.hits = 0
    this.misses = 0
    this.firstSelectedCard = null
    this.secondSelectedCard = null
    this._updateText()
    this.inputLocked = false

    this.gridX = this.elements.selectColumns.options[this.elements.selectColumns.selectedIndex].value
    this.gridY = this.elements.selectRows.options[this.elements.selectRows.selectedIndex].value
    this.flashMode = this.elements.selectFlashMode.options[this.elements.selectFlashMode.selectedIndex].value

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

    if (this.flashMode === 'on') {
      // Save one card of each type for use in flash mode
      this.flashCards = []
      for (let i = 0; i < this.cardsTotal; i++) {
        if (i % 2 === 0) {
          this.flashCards.push(this.cards[i])
        }
      }
    }

    this._shuffle(this.cards)

    // Create rows and populate them
    this.rows = []
    for (let i = 0; i < this.gridY; i++) {
      this.rows[i] = document.createElement('div')
      this.elements.main.appendChild(this.rows[i])
    }

    for (let i = 0; i < this.cardsTotal; i++) {
      this.rows[Math.floor(i / this.gridX)].appendChild(this.cards[i])
    }

    if (this.flashMode === 'on') {
      // Flash mode displays one card of each type for a small amount of time
      this.flashCards.forEach(c => {
        const flashTime = Math.floor(100 + Math.random() * 500)

        c.flip()
        setTimeout(() => {
          c.flip()
        }, flashTime)
      })

      setTimeout(() => {
        this.inputLocked = false
      }, 1000)
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
