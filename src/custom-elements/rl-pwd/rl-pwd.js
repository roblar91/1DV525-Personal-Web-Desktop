import css from './rl-pwd-css.js'
import html from './rl-pwd-html.js'
import '../rl-clock/rl-clock.js'
import '../rl-pwd-window/rl-pwd-window.js'
import '../rl-quiz/rl-quiz.js'

class RlPwd extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.apps = []
    this.mouseclickHandler = this.mouseclick.bind(this)
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        ${css}  
      </style>
      ${html}
    `

    this.mainElement = this.shadowRoot.querySelector('main')
    this.mainMenu = this.shadowRoot.querySelector('#main-menu')
    this.mainMenuButton = this.shadowRoot.querySelector('#main-menu-button')
    this.hideMainMenu()

    this.addEventListener('click', this.mouseclickHandler)

    this.registerApp('rl-quiz', 'RL Quiz', '')
  }

  mouseclick (event) {
    // Get the original target (probably does not work in Edge)
    switch (event.composedPath()[0]) {
      case this.mainMenuButton:
        this.toggleMainMenu()
        break
      default:
        this.hideMainMenu()
        this.apps.forEach(app => {
          if (app === event.composedPath()[0]) {
            this.runApp(app)
          }
        })
    }
  }

  hideMainMenu () {
    this.mainMenu.style.display = 'none'
  }

  toggleMainMenu () {
    if (this.mainMenu.style.display === 'none') {
      this.mainMenu.style.display = 'flex'
    } else {
      this.mainMenu.style.display = 'none'
    }
  }

  registerApp (elementName, appTitle, iconUrl) {
    const app = document.createElement('div')
    app.setAttribute('class', 'main-menu-item')
    app.setAttribute('data-element-name', elementName)
    app.setAttribute('data-app-title', appTitle)
    app.setAttribute('data-icon-url', iconUrl)
    app.textContent = appTitle

    this.mainMenu.appendChild(app)
    this.apps.push(app)
  }

  runApp (element) {
    const window = document.createElement('rl-pwd-window')
    const app = document.createElement(element.getAttribute('data-element-name'))
    this.mainElement.appendChild(window)
    window.setTitle(element.getAttribute('data-app-title'))
    window.setContent(app)
  }
}

window.customElements.define('rl-pwd', RlPwd)
