import css from './rl-pwd-css.js'
import html from './rl-pwd-html.js'
import '../rl-clock/rl-clock.js'
import '../rl-pwd-window/rl-pwd-window.js'
import '../rl-quiz/rl-quiz.js'
import '../rl-memory/rl-memory.js'

class RlPwd extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.apps = []
    this.runningApps = []
    this.mouseclickHandler = this.mouseclick.bind(this)
    this.closewindowHandler = this.closewindow.bind(this)
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
    this.runningAppContainer = this.shadowRoot.querySelector('#running-app-container')
    this.hideMainMenu()

    this.addEventListener('click', this.mouseclickHandler)
    this.addEventListener('closewindow', this.closewindowHandler)

    this.registerApp('rl-quiz', 'Quiz', '/resources/rl-quiz/icon.png')
    this.registerApp('rl-memory', 'Memory', '/resources/rl-memory/icon.png')
  }

  mouseclick (event) {
    // Get the original target (probably does not work in Edge)
    switch (event.composedPath()[0]) {
      case this.mainMenuButton:
        this.toggleMainMenu()
        break
      default:
        this.hideMainMenu()
    }
  }

  closewindow (event) {
    const originalTarget = event.composedPath()[0]

    this.runningApps.forEach((app, index) => {
      if (app.window === originalTarget) {
        this.runningAppContainer.removeChild(app.taskbarHandle)
        this.mainElement.removeChild(app.window)
        this.runningApps.splice(index, 1)
      }
    })

    console.log(this.runningApps)
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

  toggleVisibility (window) {
    if (!window.isVisible()) {
      window.bringToFront()
    } else if (!window.isInFront()) {
      window.bringToFront()
    } else {
      window.minimize()
    }
  }

  registerApp (elementName, appTitle, iconUrl) {
    const app = document.createElement('div')
    app.setAttribute('class', 'main-menu-item')
    app.setAttribute('data-element-name', elementName)
    app.setAttribute('data-app-title', appTitle)
    app.setAttribute('data-icon-url', iconUrl)
    app.addEventListener('click', event => {
      this.runApp(app)
    })

    const icon = document.createElement('img')
    icon.setAttribute('src', iconUrl)
    icon.setAttribute('alt', '')
    app.appendChild(icon)

    const text = document.createElement('p')
    text.textContent = appTitle
    app.appendChild(text)

    this.mainMenu.appendChild(app)
    this.apps.push(app)
  }

  runApp (element) {
    const windowElement = this.createWindow(element)
    const taskbarHandleElement = this.createTaskbarHandle(element)
    const app = {
      window: windowElement,
      taskbarHandle: taskbarHandleElement
    }

    this.runningApps.push(app)

    taskbarHandleElement.addEventListener('click', event => {
      this.toggleVisibility(windowElement)
    })
  }

  createWindow (element) {
    const window = document.createElement('rl-pwd-window')
    const app = document.createElement(element.getAttribute('data-element-name'))
    this.mainElement.appendChild(window)
    window.setIcon(element.getAttribute('data-icon-url'))
    window.setTitle(element.getAttribute('data-app-title'))
    window.setContent(app)
    return window
  }

  createTaskbarHandle (element) {
    const taskbarHandle = document.createElement('div')
    taskbarHandle.setAttribute('class', 'running-app-item')
    this.runningAppContainer.appendChild(taskbarHandle)

    const icon = document.createElement('img')
    icon.setAttribute('src', element.getAttribute('data-icon-url'))
    icon.setAttribute('alt', '')
    taskbarHandle.appendChild(icon)

    const text = document.createElement('p')
    text.textContent = element.getAttribute('data-app-title')
    taskbarHandle.appendChild(text)

    return taskbarHandle
  }
}

window.customElements.define('rl-pwd', RlPwd)
