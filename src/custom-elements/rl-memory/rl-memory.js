import './game-card.js'

const cardBack = '/resources/rl-memory/0.png'
const cardFronts = []
cardFronts.push('/resources/rl-memory/1.png')
cardFronts.push('/resources/rl-memory/3.png')
cardFronts.push('/resources/rl-memory/2.png')
cardFronts.push('/resources/rl-memory/4.png')
cardFronts.push('/resources/rl-memory/5.png')
cardFronts.push('/resources/rl-memory/6.png')
cardFronts.push('/resources/rl-memory/7.png')
cardFronts.push('/resources/rl-memory/8.png')

const boardStyleHtml = /* css */ `
header p {
  display: inline;
  margin-right: 2em;
}
`
const boardHeaderHtml = /* html */ `
<h1>
<p>RL Memory</p>
<p>Hits: <span id="hits"></span></p>
<p>Misses: <span id="misses"></span></p>
<button id="resetbutton">Reset</button>
</h1>
`

class RlMemory extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.boardStyle = document.createElement('style')
    this.boardStyle.innerHTML = boardStyleHtml
    this.boardHeader = document.createElement('header')
    this.boardHeader.innerHTML = boardHeaderHtml
  }

  connectedCallback () {
    this.initializeBoard()

    this.addEventListener('click', this.clicked)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clicked)
  }

  clicked (event) {
    // todo:
    try {
      if (event.originalTarget === this.shadowRoot.querySelector('#resetbutton')) {
        this.initializeBoard()
      } else if (event.originalTarget.parentNode.host.nodeName === 'GAME-CARD') {
        this.cardClicked(event.originalTarget.parentNode.host)
      }
    } catch (e) {
      // Catch TypeErrors
    }
  }

  cardClicked (card) {
    if (card.revealed) {
      return
    }

    if (this.firstSelectedCard === null) {
      this.firstSelectedCard = card
      card.flip()
    } else if (this.secondSelectedCard === null && card !== this.firstSelectedCard) {
      this.secondSelectedCard = card
      card.flip()
    } else {
      return
    }

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

    this.updateText()
  }

  static get observedAttributes () {
    return ['grid-x', 'grid-y']
  }

  attributeChangedCallback (name, oldValue, newValue) {
    if (name === 'grid-x' || name === 'grid-y') {
      this.initializeBoard()
    }
  }

  updateText () {
    this.shadowRoot.querySelector('#misses').textContent = this.misses
    this.shadowRoot.querySelector('#hits').textContent = this.hits
  }

  initializeBoard () {
    // Clear the board
    while (this.shadowRoot.firstChild) {
      this.shadowRoot.removeChild(this.shadowRoot.firstChild)
    }

    this.shadowRoot.appendChild(this.boardStyle)
    this.shadowRoot.appendChild(this.boardHeader)
    this.hits = 0
    this.misses = 0
    this.firstSelectedCard = null
    this.secondSelectedCard = null
    this.updateText()

    // Set default grid size if no attributes are set
    this.gridX = this.getAttribute('grid-x') ? this.getAttribute('grid-x') : 4
    this.gridY = this.getAttribute('grid-y') ? this.getAttribute('grid-y') : 4

    // Make sure we create an even amount of cards
    this.cardsTotal = this.gridX * this.gridY
    if (this.cardsTotal % 2 === 1) {
      this.cardsTotal--
    }

    // Make sure we dont create more cards than we have images for
    if (this.cardsTotal > cardFronts.length * 2) {
      this.cardsTotal = cardFronts.length * 2
    }

    // Create an empty deck and populate it
    this.cards = []
    for (let i = 0; i < this.cardsTotal; i++) {
      const card = document.createElement('game-card')
      card.setImages(cardFronts[Math.floor(i / 2)], cardBack)
      this.cards.push(card)
    }

    this.shuffle(this.cards)

    this.rows = []
    for (let i = 0; i < this.gridY; i++) {
      this.rows[i] = document.createElement('div')
    }

    for (let i = 0; i < this.cardsTotal; i++) {
      this.rows[Math.floor(i / this.gridX)].appendChild(this.cards[i])
    }

    for (let i = 0; i < this.rows.length; i++) {
      this.shadowRoot.appendChild(this.rows[i])
    }
  }

  shuffle (arr) {
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
