import css from './rl-pwd-css.js'
import html from './rl-pwd-html.js'
import '../rl-clock/rl-clock.js'
import '../rl-pwd-window/rl-pwd-window.js'
import '../rl-quiz/rl-quiz.js'
import '../rl-memory/rl-memory.js'
import '../rl-chat/rl-chat.js'

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
    this.mouseclickHandler = this.mouseclick.bind(this)
    this.closewindowHandler = this.closewindow.bind(this)
    this.minimizewindowHandler = this.minimizewindow.bind(this)
    this.resizeHandler = this.resize.bind(this)
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
    this.hideMainMenu()
    this.hideOverflowContainer()
    this.hideOverflowButton()

    this.addEventListener('click', this.mouseclickHandler)
    this.addEventListener('closewindow', this.closewindowHandler)
    this.addEventListener('minimizewindow', this.minimizewindowHandler)

    // Resize event is only ever sent to the window
    window.addEventListener('resize', this.resizeHandler)

    this.registerApp('rl-quiz', 'Quiz', '/resources/rl-quiz/icon.png')
    this.registerApp('rl-memory', 'Memory', '/resources/rl-memory/icon.png')
    this.registerApp('rl-chat', 'Chat', '/resources/rl-chat/icon.png')
    this.registerApp('rl-pwd', 'PWD', '')
  }

  mouseclick (event) {
    // Get the original target (probably does not work in Edge)
    switch (event.composedPath()[0]) {
      case this.mainMenuButton:
        this.toggleMainMenu()
        this.hideOverflowContainer()
        break
      case this.overflowButton:
        this.toggleOverflowContainer()
        this.hideMainMenu()
        break
      default:
        this.hideMainMenu()
        this.hideOverflowContainer()
    }
  }

  closewindow (event) {
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

    this.updateTaskbar()
    this.focusForemostWindow()
  }

  minimizewindow (event) {
    event.composedPath()[0].hide()
    this.focusForemostWindow()
  }

  resize (event) {
    this.updateTaskbar()
    this.updateWindowPositions()
  }

  hideMainMenu () {
    this.mainMenu.style.display = 'none'
  }

  showMainMenu () {
    this.mainMenu.style.display = 'flex'
  }

  hideOverflowContainer () {
    this.overflowContainer.style.display = 'none'
  }

  showOverflowContainer () {
    this.overflowContainer.style.display = 'flex'
  }

  hideOverflowButton () {
    this.overflowButton.style.visibility = 'hidden'
  }

  showOverflowButton () {
    this.overflowButton.style.visibility = 'visible'
  }

  toggleMainMenu () {
    if (this.mainMenu.style.display === 'none') {
      this.showMainMenu()
    } else {
      this.hideMainMenu()
    }
  }

  toggleOverflowContainer () {
    if (this.overflowContainer.style.display === 'none') {
      this.showOverflowContainer()
    } else {
      this.hideOverflowContainer()
    }
  }

  toggleMinimize (window) {
    if (!window.isVisible()) {
      window.bringToFront()
    } else if (!window.isInFront()) {
      window.bringToFront()
    } else {
      window.hide()
      this.focusForemostWindow()
    }
  }

  focusForemostWindow () {
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
    windowElement.setTaskbarHandle(taskbarHandleElement)
    windowElement.bringToFront()
    this.updateTaskbar()
    this.setWindowOffset(windowElement)

    const app = {
      window: windowElement,
      taskbarHandle: taskbarHandleElement
    }

    this.runningApps.push(app)

    taskbarHandleElement.addEventListener('click', event => {
      this.toggleMinimize(windowElement)
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

  setWindowOffset (window) {
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

  updateTaskbar () {
    this.hideOverflowContainer()
    this.hideOverflowButton()

    while (this.overflowContainer.lastElementChild) {
      const element = this.overflowContainer.lastElementChild
      this.overflowContainer.removeChild(element)
      this.runningAppContainer.appendChild(element)
    }
    while (this.isTaskbarOverflowing()) {
      const element = this.runningAppContainer.lastElementChild
      this.runningAppContainer.removeChild(element)
      this.overflowContainer.appendChild(element)

      this.showOverflowButton()
    }
  }

  updateWindowPositions () {
    const windows = this.mainElement.children
    Object.keys(windows).forEach(key => {
      windows[key].repositionInsideParent()
    })
  }

  isTaskbarOverflowing () {
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
}

window.customElements.define('rl-pwd', RlPwd)
