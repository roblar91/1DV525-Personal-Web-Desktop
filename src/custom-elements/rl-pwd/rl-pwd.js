import css from './rl-pwd-css.js'
import html from './rl-pwd-html.js'
import '../rl-clock/rl-clock.js'
import '../rl-pwd-window/rl-pwd-window.js'
import { RlQuiz } from '../rl-quiz/rl-quiz.js'

class RlPwd extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        ${css}  
      </style>
      ${html}
    `

    this.mainElement = this.shadowRoot.querySelector('main')
    const window = document.createElement('rl-pwd-window')
    const quiz = document.createElement('rl-quiz')
    quiz.setAttribute('src', 'http://vhost3.lnu.se:20080/question/1')
    this.mainElement.appendChild(window)
    window.setContent(quiz)
  }
}

window.customElements.define('rl-pwd', RlPwd)
