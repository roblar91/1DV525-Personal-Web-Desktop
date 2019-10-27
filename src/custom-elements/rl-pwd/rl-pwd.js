import css from './rl-pwd-css.js'
import html from './rl-pwd-html.js'
import '../rl-clock/rl-clock.js'
import '../rl-pwd-window/rl-pwd-window.js'
import '../rl-quiz/rl-quiz.js'
import '../rl-memory/rl-memory.js'
import '../rl-chat/rl-chat.js'

/**
 * HTML element that creates a personal web desktop,
 * capable of launching applications contained in
 * movable and resizable windows. To use an application
 * it first needs to be registered using registerApp().
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
    this.runningApps = []
  }

  connectedCallback () {
    this.shadowRoot.innerHTML = /* html */ `
      <style>
        ${css}  
      </style>
      ${html}
    `

    this.mainElement = this.shadowRoot.querySelector('main')
    this.windowContainer = this.shadowRoot.querySelector('#window-container')
    this.mainMenu = this.shadowRoot.querySelector('#main-menu')
    this.mainMenuButton = this.shadowRoot.querySelector('#main-menu-button')
    this.runningAppContainer = this.shadowRoot.querySelector('#running-app-container')
    this.overflowContainer = this.shadowRoot.querySelector('#overflow-container')
    this.overflowButton = this.shadowRoot.querySelector('#overflow-button')
    this._hideMainMenu()
    this._hideOverflowContainer()
    this._hideOverflowButton()

    this._setupEventListeners()
  }

  _setupEventListeners () {
    // Resize event is only ever sent to the window
    window.addEventListener('resize', event => {
      this._updateTaskbar()
      this._updateWindowPositions()
    })

    this.addEventListener('click', event => {
      this._hideMainMenu()
      this._hideOverflowContainer()
    })

    this.addEventListener('closewindow', event => {
      this._closewindow(event.detail)
    })

    this.addEventListener('minimizewindow', event => {
      event.detail.hide()
      this._focusForemostWindow()
    })

    this.mainMenuButton.addEventListener('click', event => {
      this._toggleMainMenu()
      this._hideOverflowContainer()
      event.stopPropagation()
    })

    this.overflowButton.addEventListener('click', event => {
      this._toggleOverflowContainer()
      this._hideMainMenu()
      event.stopPropagation()
    })
  }

  _closewindow (window) {
    this.runningApps.forEach((app, index) => {
      if (app.window === window) {
        try {
          this.runningAppContainer.removeChild(app.taskbarHandle)
        } catch {
          this.overflowContainer.removeChild(app.taskbarHandle)
        }
        this.windowContainer.removeChild(app.window)
        this.runningApps.splice(index, 1)
      }
    })

    this._updateTaskbar()
    this._focusForemostWindow()
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
    const windows = this.windowContainer.children
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

  _runApp (appContainer) {
    const windowElement = this._createWindow(appContainer)
    const taskbarHandleElement = this._createTaskbarHandle(appContainer)
    windowElement.setTaskbarHandle(taskbarHandleElement)
    windowElement.bringToFront()
    taskbarHandleElement.addEventListener('click', event => {
      this._toggleMinimize(windowElement)
    })

    this._updateTaskbar()
    this._setWindowOffset(windowElement)

    const app = {
      window: windowElement,
      taskbarHandle: taskbarHandleElement
    }

    this.runningApps.push(app)
  }

  _createWindow (appContainer) {
    const window = document.createElement('rl-pwd-window')
    this.windowContainer.appendChild(window)
    window.setIcon(appContainer.iconUrl)
    window.setTitle(appContainer.appTitle)

    const content = document.createElement(appContainer.elementName)
    if (appContainer.elementAttributes) {
      appContainer.elementAttributes.forEach((value, key) => {
        content.setAttribute(key, value)
      })
    }

    if (content.getAttribute('data-preferred-width')) {
      window.setContentWidth(content.getAttribute('data-preferred-width'))
    }
    if (content.getAttribute('data-preferred-height')) {
      window.setContentHeight(content.getAttribute('data-preferred-height'))
    }
    window.setContent(content)
    window.repositionInsideParent()

    return window
  }

  _createTaskbarHandle (appContainer) {
    const taskbarHandle = document.createElement('button')
    this.runningAppContainer.appendChild(taskbarHandle)
    taskbarHandle.setAttribute('class', 'running-app-item')

    const icon = document.createElement('img')
    taskbarHandle.appendChild(icon)
    icon.setAttribute('src', appContainer.iconUrl)
    icon.setAttribute('alt', '')

    const text = document.createElement('p')
    taskbarHandle.appendChild(text)
    text.textContent = appContainer.appTitle

    return taskbarHandle
  }

  _setWindowOffset (window) {
    let offsetX = this.windowOffset.dX
    let offsetY = this.windowOffset.dY
    let currentVerticalLoop = 1

    const windows = this.windowContainer.children

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

      if (offsetY + window.offsetHeight > this.windowContainer.clientHeight) {
        currentVerticalLoop++
        offsetX = this.windowOffset.dX * currentVerticalLoop
        offsetY = this.windowOffset.dY
      }

      if (offsetX + window.offsetWidth > this.windowContainer.clientWidth) {
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
    const windows = this.windowContainer.children
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
   * @param {string} elementName The name of the HTML element
   * @param {string} appTitle The titel of the application
   * @param {string} iconUrl An URL pointing to the applications icon
   * @param {Map} [elementAttributes] Attributes that should be applied to the HTML element
   * @memberof RlPwd
   */
  registerApp (elementName, appTitle, iconUrl, elementAttributes) {
    const appContainer = {
      elementName: elementName,
      appTitle: appTitle,
      iconUrl: iconUrl
    }
    if (elementAttributes) {
      appContainer.elementAttributes = elementAttributes
    }

    const appElement = document.createElement('button')
    appElement.setAttribute('class', 'main-menu-item')
    appElement.addEventListener('click', event => {
      this._runApp(appContainer)
    })
    this.mainMenu.appendChild(appElement)

    const icon = document.createElement('img')
    icon.setAttribute('src', iconUrl)
    icon.setAttribute('alt', '')
    appElement.appendChild(icon)

    const text = document.createElement('p')
    text.textContent = appTitle
    appElement.appendChild(text)
  }
}

window.customElements.define('rl-pwd', RlPwd)
