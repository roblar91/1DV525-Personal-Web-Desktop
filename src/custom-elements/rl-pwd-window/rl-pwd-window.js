import css from './rl-pwd-window-css.js'
import html from './rl-pwd-window-html.js'

class RlPwdWindow extends window.HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.mousedownHandler = this.mousedown.bind(this)
    this.mouseupHandler = this.mouseup.bind(this)
    this.mouseleaveHandler = this.mouseleave.bind(this)
    this.mousemoveHandler = this.mousemove.bind(this)

    this.isMoving = false
    this.isResizing = false
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
    this.windowTitle = this.shadowRoot.querySelector('#window-title')
    this.windowButtons = this.shadowRoot.querySelector('#window-buttons')
    this.buttonMinimize = this.shadowRoot.querySelector('#button-minimize')
    this.buttonEnlarge = this.shadowRoot.querySelector('#button-enlarge')
    this.buttonClose = this.shadowRoot.querySelector('#button-close')

    // These values should be updated after creation by the parent to handle overlapping windows
    this.setTopPixels(this.parentElement.offsetTop)
    this.setLeftPixels(this.parentElement.offsetLeft)

    this.addEventListener('mousedown', this.mousedownHandler)
    // These event handlers are added to the parent in order to improve the move and resize functionality
    this.parentElement.addEventListener('mouseup', this.mouseupHandler)
    this.parentElement.addEventListener('mouseleave', this.mouseleaveHandler)
    this.parentElement.addEventListener('mousemove', this.mousemoveHandler)
  }

  mousedown (event) {
    // Get the original target (probably does not work in Edge)
    switch (event.composedPath()[0]) {
      case this.buttonMinimize:
        break
      case this.buttonEnlarge:
        this.toggleEnlarge()
        break
      case this.buttonClose:
        this.closeWindow()
        break
      case this.header:
      case this.windowTitle:
      case this.windowButtons:
        this.prevClientX = event.clientX
        this.prevClientY = event.clientY
        this.isMoving = true
        break
      case this:
        // Border was clicked
        this.prevClientX = event.clientX
        this.prevClientY = event.clientY
        this.isResizing = true

        // Determine which side was clicked
        this.sideClicked = []
        if (event.offsetX < 0) {
          this.sideClicked.push('left')
        }
        if (event.offsetX > this.clientWidth) {
          this.sideClicked.push('right')
        }
        if (event.offsetY < 0) {
          this.sideClicked.push('top')
        }
        if (event.offsetY > this.clientHeight) {
          this.sideClicked.push('bottom')
        }
        break
    }
  }

  mouseup (event) {
    this.isMoving = false
    this.isResizing = false
  }

  mouseleave (event) {
    this.isMoving = false
    this.isResizing = false
  }

  mousemove (event) {
    if (this.isMoving) {
      this.moveWindow(event)
    } else if (this.isResizing) {
      this.resizeWindow(event)
    }
  }

  moveWindow (event) {
    // Calculate how much the pointer has moved since last event and move window accordingly
    const dX = event.clientX - this.prevClientX

    // Make sure the window does not go outside their parent element
    let newPosX = Math.min(dX + this.offsetLeft, this.parentElement.offsetWidth + this.parentElement.offsetLeft - this.offsetWidth)
    newPosX = Math.max(newPosX, this.parentElement.offsetLeft)

    this.setLeftPixels(newPosX)
    this.prevClientX = event.clientX

    const dY = event.clientY - this.prevClientY
    let newPosY = Math.min(dY + this.offsetTop, this.parentElement.offsetHeight + this.parentElement.offsetTop - this.offsetHeight)
    newPosY = Math.max(newPosY, this.parentElement.offsetTop)
    this.setTopPixels(newPosY)
    this.prevClientY = event.clientY
  }

  resizeWindow (event) {
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
  }

  toggleEnlarge () {
    if (this.previousPosition) {
      this.setTopPixels(this.previousPosition.top)
      this.setLeftPixels(this.previousPosition.left)
      this.setWidthPixels(this.previousPosition.width)
      this.setHeightPixels(this.previousPosition.height)
      this.previousPosition = null
    } else {
      this.previousPosition = {
        top: this.offsetTop,
        left: this.offsetLeft,
        width: this.offsetWidth,
        height: this.offsetHeight
      }

      this.setTopPixels(this.parentElement.offsetTop)
      this.setLeftPixels(this.parentElement.offsetLeft)
      this.setWidthPixels(this.parentElement.clientWidth)
      this.setHeightPixels(this.parentElement.clientHeight)
    }
  }

  closeWindow () {
    this.parentElement.removeChild(this)
  }

  setLeftPixels (integer) {
    this.style.left = integer + 'px'
  }

  setTopPixels (integer) {
    this.style.top = integer + 'px'
  }

  setWidthPixels (integer) {
    this.style.width = integer + 'px'
  }

  setHeightPixels (integer) {
    this.style.height = integer + 'px'
  }

  setTitle (title) {
    this.windowTitle.textContent = title
  }

  setContent (element) {
    this.main.appendChild(element)

    // Bug: this sets the windows size, not the actual content size
    // Setting the content size does not work with current css rules
    const prefferedWidth = element.getAttribute('data-preffered-width')
    if (prefferedWidth) {
      this.style.width = prefferedWidth
    }

    const prefferedHeight = element.getAttribute('data-preffered-height')
    if (prefferedHeight) {
      this.style.height = prefferedHeight
    }
  }
}

window.customElements.define('rl-pwd-window', RlPwdWindow)
