/**
 * @author Robin Larsson <robin_rtl@hotmail.com>
 * Last modified: 2019-11-3
 */

import css from './rl-pwd-window-css.js'
import html from './rl-pwd-window-html.js'

/**
 * HTML element representing a window. Meant to be used as a
 * container for other HTML elements.
 *
 * @class RlPwdWindow
 * @extends window.HTMLElement
 */
class RlPwdWindow extends window.HTMLElement {
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

    this.header = this.shadowRoot.querySelector('header')
    this.main = this.shadowRoot.querySelector('main')
    this.windowIcon = this.shadowRoot.querySelector('#window-icon')
    this.windowTitle = this.shadowRoot.querySelector('#window-title')
    this.windowButtons = this.shadowRoot.querySelector('#window-buttons')
    this.buttonMinimize = this.shadowRoot.querySelector('#button-minimize')
    this.buttonEnlarge = this.shadowRoot.querySelector('#button-enlarge')
    this.buttonClose = this.shadowRoot.querySelector('#button-close')

    this.style.zIndex = this.parentElement.children.length
    this.isMoving = false
    this.isResizing = false

    this._setupEventHandlers()
  }

  _setupEventHandlers () {
    // Capture phase
    this.addEventListener('mousedown', event => {
      this.bringToFront()
    }, true)

    // Bubble phase
    this.addEventListener('mousedown', event => {
      this._startResize(event)
    })

    this.header.addEventListener('mousedown', event => {
      event.stopPropagation()
      this._startMove(event)
    })

    this.buttonMinimize.addEventListener('mousedown', event => {
      event.stopPropagation()
      this._minimizeWindow()
    })

    this.buttonEnlarge.addEventListener('mousedown', event => {
      event.stopPropagation()
      this.toggleEnlarge()
    })

    this.buttonClose.addEventListener('mousedown', event => {
      event.stopPropagation()
      this._closeWindow()
    })

    // These event handlers are added to the parent in order to improve the move and resize functionality
    this.parentElement.addEventListener('mouseup', event => {
      this.isMoving = false
      this.isResizing = false
    })

    this.parentElement.addEventListener('mouseleave', event => {
      this.isMoving = false
      this.isResizing = false
    })

    this.parentElement.addEventListener('mousemove', event => {
      if (this.isMoving) {
        this._moveWindow(event)
      } else if (this.isResizing) {
        this._resizeWindow(event)
      }
    })
  }

  _startMove (clickEvent) {
    this.prevClientX = clickEvent.clientX
    this.prevClientY = clickEvent.clientY
    this.isMoving = true
  }

  _startResize (clickEvent) {
    // Border was clicked
    this.prevClientX = clickEvent.clientX
    this.prevClientY = clickEvent.clientY
    this.isResizing = true

    // Determine which side was clicked
    this.sideClicked = []
    if (clickEvent.offsetX < 0) {
      this.sideClicked.push('left')
    }
    if (clickEvent.offsetX > this.clientWidth - 1) {
      this.sideClicked.push('right')
    }
    if (clickEvent.offsetY < 0) {
      this.sideClicked.push('top')
    }
    if (clickEvent.offsetY > this.clientHeight - 1) {
      this.sideClicked.push('bottom')
    }
  }

  _moveWindow (event) {
    // Calculate how much the pointer has moved since last event and move window accordingly
    const dX = event.clientX - this.prevClientX
    this.setLeftPixels(this.offsetLeft + dX)
    this.prevClientX = event.clientX

    const dY = event.clientY - this.prevClientY
    this.setTopPixels(this.offsetTop + dY)
    this.prevClientY = event.clientY

    this.repositionInsideParent()
  }

  _resizeWindow (event) {
    this.previousPosition = null

    // Calculate how much the pointer has moved since last event
    const dX = event.clientX - this.prevClientX
    const dY = event.clientY - this.prevClientY

    // Resize based on which side was clicked
    this.sideClicked.forEach(side => {
      switch (side) {
        case 'top':
          this.setTopPixels(this.offsetTop + dY)
          this.setHeightPixels(this.offsetHeight - dY)
          break
        case 'bottom':
          this.setHeightPixels(this.offsetHeight + dY)
          break
        case 'right':
          this.setWidthPixels(this.offsetWidth + dX)
          break
        case 'left':
          this.setLeftPixels(this.offsetLeft + dX)
          this.setWidthPixels(this.offsetWidth - dX)
          break
      }
    })

    this.prevClientX = event.clientX
    this.prevClientY = event.clientY

    this.repositionInsideParent()
  }

  _closeWindow () {
    this.dispatchEvent(new window.CustomEvent('closewindow', { detail: this, bubble: true, composed: true }))
  }

  _minimizeWindow () {
    this.dispatchEvent(new window.CustomEvent('minimizewindow', { detail: this, bubble: true, composed: true }))
  }

  /**
   * Repositions and resizes the window so that it does not go outside its parent element
   *
   * @memberof RlPwdWindow
   */
  repositionInsideParent () {
    let newX = Math.min(this.offsetLeft, this.parentElement.clientWidth - this.offsetWidth)
    newX = Math.max(0, newX)
    this.setLeftPixels(newX)

    let newY = Math.min(this.offsetTop, this.parentElement.clientHeight - this.offsetHeight)
    newY = Math.max(0, newY)
    this.setTopPixels(newY)

    const newWidth = Math.min(this.offsetWidth, this.parentElement.clientWidth)
    this.setWidthPixels(newWidth)

    const newHeight = Math.min(this.offsetHeight, this.parentElement.clientHeight)
    this.setHeightPixels(newHeight)
  }

  /**
   * Adjusts the size and position of the window to cover the entire size of its parent container.
   * A subsequent call will return the window to it's previous size and position.
   *
   * @memberof RlPwdWindow
   */
  toggleEnlarge () {
    if (this.previousPosition) {
      this.setTopPixels(this.previousPosition.top)
      this.setLeftPixels(this.previousPosition.left)
      this.setWidthPixels(this.previousPosition.width)
      this.setHeightPixels(this.previousPosition.height)
      this.previousPosition = null
      this.repositionInsideParent()
    } else {
      this.previousPosition = {
        top: this.offsetTop,
        left: this.offsetLeft,
        width: this.offsetWidth,
        height: this.offsetHeight
      }

      this.setTopPixels(0)
      this.setLeftPixels(0)
      this.setWidthPixels(this.parentElement.clientWidth)
      this.setHeightPixels(this.parentElement.clientHeight)
    }
  }

  /**
   * Sets the windows visibility to 'hidden' and removes the 'active-window' class
   * from both the window and it's taskbar handle.
   *
   * @memberof RlPwdWindow
   */
  hide () {
    this.style.visibility = 'hidden'
    this.header.classList.remove('active-window')
    this.taskbarHandle.classList.remove('active-window')
  }

  /**
   * Brings this window to the front. 'active-window' class is added to this
   * window and it's taskbar handle, and removed from all other windows.
   *
   * @memberof RlPwdWindow
   */
  bringToFront () {
    this.style.visibility = 'visible'

    const windows = this.parentElement.children
    const currentZ = parseInt(this.style.zIndex, 10)

    Object.keys(windows).forEach(key => {
      windows[key].header.classList.remove('active-window')
      windows[key].taskbarHandle.classList.remove('active-window')
      const otherZ = parseInt(windows[key].style.zIndex, 10)
      if (otherZ >= currentZ) {
        windows[key].style.zIndex = otherZ - 1
      }
    })

    this.header.classList.add('active-window')
    this.taskbarHandle.classList.add('active-window')
    this.style.zIndex = windows.length
    this.focus()
  }

  /**
   * Returns true if this window is in front of all other windows belonging to it's parent.
   *
   * @returns {boolean}
   * @memberof RlPwdWindow
   */
  isInFront () {
    // The foremost window should have a z-index equal to the number of windows
    return parseInt(this.style.zIndex, 10) === this.parentElement.children.length
  }

  /**
   * Returns true if the visibility of this window is not 'hidden'.
   *
   * @returns {boolean}
   * @memberof RlPwdWindow
   */
  isVisible () {
    return this.style.visibility !== 'hidden'
  }

  /**
   * Sets the icon to be associated with this window.
   *
   * @param {string} url
   * @memberof RlPwdWindow
   */
  setIcon (url) {
    this.windowIcon.setAttribute('src', url)
  }

  /**
   * Sets the title to be associated with this window.
   *
   * @param {string} title
   * @memberof RlPwdWindow
   */
  setTitle (title) {
    this.windowTitle.textContent = title
  }

  /**
   * Sets the HTML element that should be the main content of this window.
   *
   * @param {HTMLElement} element
   * @memberof RlPwdWindow
   */
  setContent (element) {
    this.main.appendChild(element)
  }

  /**
   * Sets the taskbar handle to be associated with this window.
   *
   * @param {HTMLElement} element
   * @memberof RlPwdWindow
   */
  setTaskbarHandle (element) {
    this.taskbarHandle = element
  }

  /**
   * Sets the distance between this window and the left side of it's container.
   *
   * @param {number} integer The number of pixels
   * @memberof RlPwdWindow
   */
  setLeftPixels (integer) {
    this.style.left = integer + 'px'
  }

  /**
   * Sets the distance between this window and the top side of it's container.
   *
   * @param {number} integer The number of pixels
   * @memberof RlPwdWindow
   */
  setTopPixels (integer) {
    this.style.top = integer + 'px'
  }

  /**
   * Sets the total width this window.
   *
   * @param {number} integer The number of pixels
   * @memberof RlPwdWindow
   */
  setWidthPixels (integer) {
    this.style.width = integer + 'px'
  }

  /**
   * Sets the total height of this window.
   *
   * @param {number} integer The number of pixels
   * @memberof RlPwdWindow
   */
  setHeightPixels (integer) {
    this.style.height = integer + 'px'
  }

  /**
   * Sets the width of the content box. The window is resized proportionally.
   *
   * @param {string} cssWidth The width in any CSS unit
   * @memberof RlPwdWindow
   */
  setContentWidth (cssWidth) {
    this.style.width = cssWidth
    this.setWidthPixels(this.offsetWidth * 2 - this.clientWidth)
  }

  /**
   * Sets the height of the content box. The window is resized proportionally.
   *
   * @param {string} cssHeight The height in any CSS unit
   * @memberof RlPwdWindow
   */
  setContentHeight (cssHeight) {
    this.style.height = cssHeight
    this.setHeightPixels(this.offsetHeight * 2 - this.clientHeight)
  }
}

window.customElements.define('rl-pwd-window', RlPwdWindow)
