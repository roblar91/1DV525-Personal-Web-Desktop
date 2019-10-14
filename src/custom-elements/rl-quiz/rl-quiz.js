import css from './rl-quiz-css.js'
import html from './rl-quiz-html.js'

export class RlQuiz extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })

    // Functions returned with bind() needs to be saved for removal
    this.startButtonHandler = this.startQuiz.bind(this)
    this.answerButtonHandler = this.sendAnswer.bind(this)
    this.restartButtonHandler = this.initializeGame.bind(this)
  }

  connectedCallback () {
    this.initializeHtml()
    this.initializeGame()
  }

  disconnectedCallback () {
    this.formSubmitButton.removeEventListener('click', this.startButtonHandler)
    this.formSubmitButton.removeEventListener('click', this.answerButtonHandler)
    this.formSubmitButton.removeEventListener('click', this.restartButtonHandler)
  }

  initializeHtml () {
    this.shadowRoot.innerHTML = `
    <style> 
      ${css} 
    </style> 
    ${html}
    `

    this.usernameElement = this.shadowRoot.querySelector('#username')
    this.timeLeftElement = this.shadowRoot.querySelector('#time-left')
    this.mainOutputElement = this.shadowRoot.querySelector('#main-output')
    this.mainFormElement = this.shadowRoot.querySelector('#main-form')

    this.answerButton = document.createElement('input')
    this.answerButton.setAttribute('type', 'submit')
    this.answerButton.value = 'Send answer'
    this.answerButton.style.margin = '1em'
    this.answerButton.addEventListener('click', this.answerButtonHandler)

    this.restartButton = document.createElement('button')
    this.restartButton.textContent = 'Restart'
    this.restartButton.addEventListener('click', this.restartButtonHandler)
  }

  initializeGame () {
    this.nextUrl = this.getAttribute('src')
    this.totalTime = 0
    this.shadowRoot.querySelector('#name-time-table').style.display = 'none'

    this.nextUrl ? this.printStart() : this.printNoSrc()
  }

  printStart () {
    this.mainOutputElement.innerHTML = /* html */ `
    <p>Enter a name and press start!</p>
    `
    this.mainFormElement.innerHTML = /* html */ `
    <input id="main-form-text-input" type="text" placeholder="Name">
    <br>
    <input id="main-form-submit" type="submit" value="Start">
    `

    this.formSubmitButton = this.shadowRoot.querySelector('#main-form-submit')
    this.formSubmitButton.addEventListener('click', this.startButtonHandler)
    this.shadowRoot.querySelector('#main-form-text-input').focus()
  }

  printQuestion (question, alternatives) {
    this.mainOutputElement.innerHTML = /* html */ `
    <p>${question}</p>
    `

    if (!alternatives) {
      // Create a text input answer form
      this.mainFormElement.innerHTML = /* html */ `
      <input id="main-form-text-input" type="text" placeholder="Answer">
      <br>
      <input id="main-form-submit" type="submit" value="Submit answer">
      `

      this.shadowRoot.querySelector('#main-form-text-input').focus()
    } else {
      // Create a radio input answer form
      this.mainFormElement.innerHTML = /* html */ `
      <div id="radio-container"></div>
      <input id="main-form-submit" type="submit" value="Submit answer">
      `

      const container = this.mainFormElement.querySelector('#radio-container')
      for (const property in alternatives) {
        const radio = document.createElement('input')
        radio.setAttribute('name', 'answer')
        radio.setAttribute('type', 'radio')
        radio.setAttribute('id', property)
        radio.setAttribute('value', property)

        const label = document.createElement('label')
        label.setAttribute('for', property)
        label.textContent = alternatives[property]

        container.append(radio, label, document.createElement('br'))
      }
    }

    this.formSubmitButton = this.shadowRoot.querySelector('#main-form-submit')
    this.formSubmitButton.addEventListener('click', this.answerButtonHandler)
  }

  printGameWon () {
    this.mainOutputElement.innerHTML = /* html */ `
    <p>You won in ${this.totalTime} seconds!</p>
    `

    const highscoreList = document.createElement('table')
    const tableHead = document.createElement('thead')
    tableHead.innerHTML = /* html */ `
    <tr>
      <th colspan="2">High Scores</th>
    </tr>
    `
    highscoreList.appendChild(tableHead)

    for (let i = 0; i < this.scores.length; i++) {
      const row = document.createElement('tr')
      const name = document.createElement('td')
      name.textContent = this.scores[i].name
      const time = document.createElement('td')
      time.textContent = this.scores[i].time

      row.append(name, time)
      highscoreList.appendChild(row)
    }
    this.mainOutputElement.appendChild(highscoreList)

    this.mainFormElement.innerHTML = /* html */ `
    <input id="main-form-submit" type="submit" value="Restart">
    `
    this.formSubmitButton = this.shadowRoot.querySelector('#main-form-submit')
    this.formSubmitButton.addEventListener('click', this.restartButtonHandler)
    this.formSubmitButton.focus()
  }

  printWrongAnswer () {
    this.mainOutputElement.innerHTML = /* html */ `
    <p>Wrong answer :( Try again!</p>
    `

    this.mainFormElement.innerHTML = /* html */ `
    <input id="main-form-submit" type="submit" value="Restart">
    `
    this.formSubmitButton = this.shadowRoot.querySelector('#main-form-submit')
    this.formSubmitButton.addEventListener('click', this.restartButtonHandler)
    this.formSubmitButton.focus()
  }

  printTimeUp () {
    this.mainOutputElement.innerHTML = /* html */ `
    <p>Time's up! :( Try again!</p>
    `

    this.mainFormElement.innerHTML = /* html */ `
    <input id="main-form-submit" type="submit" value="Restart">
    `
    this.formSubmitButton = this.shadowRoot.querySelector('#main-form-submit')
    this.formSubmitButton.addEventListener('click', this.restartButtonHandler)
    this.formSubmitButton.focus()
  }

  printError (err) {
    console.log(err)

    this.mainOutputElement.innerHTML = /* html */ `
    <p>An error occured :(</p>
    `

    this.mainFormElement.innerHTML = /* html */ `
    <input id="main-form-submit" type="submit" value="Restart">
    `
    this.formSubmitButton = this.shadowRoot.querySelector('#main-form-submit')
    this.formSubmitButton.addEventListener('click', this.restartButtonHandler)
    this.formSubmitButton.focus()
  }

  printNoSrc () {
    this.mainOutputElement.innerHTML = /* html */ `
    <p>Please provide the location of the server as an 'src' attribute to this element</p>
    `
  }

  startTimer () {
    this.countdown = 20
    this.timeLeftElement.textContent = this.countdown

    this.timer = setInterval(() => {
      this.totalTime++
      this.countdown--
      this.timeLeftElement.textContent = this.countdown

      if (this.countdown === 0) {
        this.stopTimer()
        this.printTimeUp()
      }
    }, 1000)
  }

  stopTimer () {
    window.clearInterval(this.timer)
  }

  startQuiz (event) {
    event.preventDefault()

    const input = this.shadowRoot.querySelector('#main-form-text-input').value
    this.username = input || 'Anonymous'
    this.usernameElement.textContent = this.username

    // Disable button while waiting for reply
    this.formSubmitButton.disabled = true
    this.getNextQuestion()
    this.shadowRoot.querySelector('#name-time-table').style.display = ''
  }

  async sendGet (destination) {
    const reply = await window.fetch(destination)
    return reply.json()
  }

  async sendPost (destination, data) {
    const reply = await window.fetch(destination, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    return reply.json()
  }

  async sendAnswer (event) {
    event.preventDefault()
    this.formSubmitButton.disabled = true
    this.stopTimer()

    let answer
    const textInput = this.shadowRoot.querySelector('#main-form-text-input')

    if (textInput) {
      // type=text
      answer = textInput.value
    } else {
      // type=radio
      const inputs = this.shadowRoot.querySelectorAll('input')
      inputs.forEach(element => {
        if (element.checked) {
          answer = element.value
        }
      })
    }

    const data = { answer }

    try {
      const reply = await this.sendPost(this.nextUrl, data)
      this.checkAnswer(reply)
    } catch (e) {
      this.printError(e)
    }
  }

  async getNextQuestion () {
    try {
      const reply = await this.sendGet(this.nextUrl)
      this.nextUrl = reply.nextURL
      this.printQuestion(reply.question, reply.alternatives)
      this.startTimer()
    } catch (e) {
      this.printError(e)
    }
  }

  checkAnswer (answer) {
    if (answer.message === 'Correct answer!') {
      if (!answer.nextURL) {
        this.updateHighscore()
        this.printGameWon()
      } else {
        this.nextUrl = answer.nextURL
        this.getNextQuestion()
      }
    } else {
      this.printWrongAnswer()
    }
  }

  updateHighscore () {
    this.scores = []

    // Read scores from local storage
    const item = window.localStorage.getItem('rl-quiz-highscore')
    if (item) {
      this.scores = JSON.parse(item)
    }

    // Insert current score into the list
    const newScore = { time: this.totalTime, name: this.username }
    for (let i = 0; i < 5; i++) {
      if (this.scores[i]) {
        if (this.totalTime < this.scores[i].time) {
          this.scores.splice(i, 0, newScore)
          break
        }
      } else {
        this.scores.push(newScore)
        break
      }
    }

    if (this.scores.length > 5) {
      this.scores.length = 5
    }

    // Save score to local storage
    window.localStorage.setItem('rl-quiz-highscore', JSON.stringify(this.scores))
  }
}

window.customElements.define('rl-quiz', RlQuiz)
