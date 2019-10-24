import css from './rl-pwd-css.js'
import html from './rl-pwd-html.js'
import '../rl-clock/rl-clock.js'
import '../rl-pwd-window/rl-pwd-window.js'
import '../rl-quiz/rl-quiz.js'
import '../rl-memory/rl-memory.js'
import '../rl-chat/rl-chat.js'

/**
 *
 *
 * @class RlPwd
 * @extends window.HTMLElement
 * @requires RlPwdWindow
 */
class RlPwd extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.windowOffset = {
      dX: 40,
      dY: 40
    }
    this.apps = []
    this.runningApps = []
    this.mouseclickHandler = this._mouseclick.bind(this)
    this.closewindowHandler = this._closewindow.bind(this)
    this.minimizewindowHandler = this._minimizewindow.bind(this)
    this.resizeHandler = this._resize.bind(this)
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
    this.overflowContainer = this.shadowRoot.querySelector('#overflow-container')
    this.overflowButton = this.shadowRoot.querySelector('#overflow-button')
    this._hideMainMenu()
    this._hideOverflowContainer()
    this._hideOverflowButton()

    this.addEventListener('click', this.mouseclickHandler)
    this.addEventListener('closewindow', this.closewindowHandler)
    this.addEventListener('minimizewindow', this.minimizewindowHandler)

    // Resize event is only ever sent to the window
    window.addEventListener('resize', this.resizeHandler)
  }

  _mouseclick (event) {
    // Get the original target (probably does not work in Edge)
    switch (event.composedPath()[0]) {
      case this.mainMenuButton:
        this._toggleMainMenu()
        this._hideOverflowContainer()
        break
      case this.overflowButton:
        this._toggleOverflowContainer()
        this._hideMainMenu()
        break
      default:
        this._hideMainMenu()
        this._hideOverflowContainer()
    }
  }

  _closewindow (event) {
    const originalTarget = event.composedPath()[0]

    this.runningApps.forEach((app, index) => {
      if (app.window === originalTarget) {
        try {
          this.runningAppContainer.removeChild(app.taskbarHandle)
        } catch {
          this.overflowContainer.removeChild(app.taskbarHandle)
        }
        this.mainElement.removeChild(app.window)
        this.runningApps.splice(index, 1)
      }
    })

    this._updateTaskbar()
    this._focusForemostWindow()
  }

  _minimizewindow (event) {
    event.composedPath()[0].hide()
    this._focusForemostWindow()
  }

  _resize (event) {
    this._updateTaskbar()
    this._updateWindowPositions()
  }

  _hideMainMenu () {
    this.mainMenu.style.display = 'none'
  }

  _showMainMenu () {
    this.mainMenu.style.display = 'flex'
  }

  _hideOverflowContainer () {
    this.overflowContainer.style.display = 'none'
  }

  _showOverflowContainer () {
    this.overflowContainer.style.display = 'flex'
  }

  _hideOverflowButton () {
    this.overflowButton.style.visibility = 'hidden'
  }

  _showOverflowButton () {
    this.overflowButton.style.visibility = 'visible'
  }

  _toggleMainMenu () {
    if (this.mainMenu.style.display === 'none') {
      this._showMainMenu()
    } else {
      this._hideMainMenu()
    }
  }

  _toggleOverflowContainer () {
    if (this.overflowContainer.style.display === 'none') {
      this._showOverflowContainer()
    } else {
      this._hideOverflowContainer()
    }
  }

  _toggleMinimize (window) {
    if (!window.isVisible()) {
      window.bringToFront()
    } else if (!window.isInFront()) {
      window.bringToFront()
    } else {
      window.hide()
      this._focusForemostWindow()
    }
  }

  _focusForemostWindow () {
    const windows = this.mainElement.children
    let maxZ = 0
    let nextFocusTarget
    for (let i = 0; i < windows.length; i++) {
      const currentZ = windows[i].style.zIndex
      if (currentZ > maxZ && windows[i].isVisible()) {
        maxZ = currentZ
        nextFocusTarget = windows[i]
      }
    }

    if (nextFocusTarget) {
      nextFocusTarget.bringToFront()
    }
  }

  _runApp (element) {
    const windowElement = this._createWindow(element)
    const taskbarHandleElement = this._createTaskbarHandle(element)
    windowElement.setTaskbarHandle(taskbarHandleElement)
    windowElement.bringToFront()
    this._updateTaskbar()
    this._setWindowOffset(windowElement)

    const app = {
      window: windowElement,
      taskbarHandle: taskbarHandleElement
    }

    this.runningApps.push(app)

    taskbarHandleElement.addEventListener('click', event => {
      this._toggleMinimize(windowElement)
    })
  }

  _createWindow (element) {
    const window = document.createElement('rl-pwd-window')
    const app = document.createElement(element.getAttribute('data-element-name'))
    this.mainElement.appendChild(window)
    window.setIcon(element.getAttribute('data-icon-url'))
    window.setTitle(element.getAttribute('data-app-title'))
    window.setContent(app)

    return window
  }

  _createTaskbarHandle (element) {
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

  _setWindowOffset (window) {
    let offsetX = this.windowOffset.dX
    let offsetY = this.windowOffset.dY
    let currentVerticalLoop = 1

    const windows = this.mainElement.children

    // Make sure the newly created window is not placed on an occupied position
    for (let i = 0; i < windows.length; i++) {
      Object.keys(windows).some(key => {
        if (windows[key].isVisible() &&
            windows[key].offsetTop === offsetY &&
            windows[key].offsetLeft === offsetX) {
          offsetX += this.windowOffset.dX
          offsetY += this.windowOffset.dY
          return true
        }
      })

      if (offsetY + window.offsetHeight > this.mainElement.clientHeight) {
        currentVerticalLoop++
        offsetX = this.windowOffset.dX * currentVerticalLoop
        offsetY = this.windowOffset.dY
      }

      if (offsetX + window.offsetWidth > this.mainElement.clientWidth) {
        // Just place the window in top corner
        offsetX = 0
        offsetY = 0
        break
      }
    }

    window.setLeftPixels(offsetX)
    window.setTopPixels(offsetY)
  }

  _updateTaskbar () {
    this._hideOverflowContainer()
    this._hideOverflowButton()

    while (this.overflowContainer.lastElementChild) {
      const element = this.overflowContainer.lastElementChild
      this.overflowContainer.removeChild(element)
      this.runningAppContainer.appendChild(element)
    }
    while (this._isTaskbarOverflowing()) {
      const element = this.runningAppContainer.lastElementChild
      this.runningAppContainer.removeChild(element)
      this.overflowContainer.appendChild(element)

      this._showOverflowButton()
    }
  }

  _updateWindowPositions () {
    const windows = this.mainElement.children
    Object.keys(windows).forEach(key => {
      windows[key].repositionInsideParent()
    })
  }

  _isTaskbarOverflowing () {
    if (this.runningAppContainer.children.length === 0) {
      return false
    }

    // Hack to see if taskbar is overflown
    const currentWidth = this.runningAppContainer.clientWidth
    const element = this.runningAppContainer.lastElementChild
    this.runningAppContainer.removeChild(element)
    const previousWidth = this.runningAppContainer.clientWidth
    this.runningAppContainer.appendChild(element)

    return currentWidth !== previousWidth
  }

  /**
   * Registers an application so that it can be launched through
   * the personal web desktop.
   *
   * @param {*} elementName The name of the HTML element
   * @param {*} appTitle The titel of the application
   * @param {*} iconUrl An URL pointing to the applications icon
   * @memberof RlPwd
   */
  registerApp (elementName, appTitle, iconUrl) {
    const app = document.createElement('div')
    app.setAttribute('class', 'main-menu-item')
    app.setAttribute('data-element-name', elementName)
    app.setAttribute('data-app-title', appTitle)
    app.setAttribute('data-icon-url', iconUrl)
    app.addEventListener('click', event => {
      this._runApp(app)
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
}

window.customElements.define('rl-pwd', RlPwd)
