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

    // These values should be updated after creation by the parent to handle overlapping windows
    this.setTop(this.parentElement.offsetTop)
    this.setLeft(this.parentElement.offsetLeft)

    this.updateMainHeight()

    this.addEventListener('mousedown', this.mousedownHandler)

    // These event handlers are added to the parent in order to improve the move and resize functionality
    this.parentElement.addEventListener('mouseup', this.mouseupHandler)
    this.parentElement.addEventListener('mouseleave', this.mouseleaveHandler)
    this.parentElement.addEventListener('mousemove', this.mousemoveHandler)
  }

  mousedown (event) {
    console.log('mousedown')

    switch (event.originalTarget) {
      case this.header:
        this.prevClientX = event.clientX
        this.prevClientY = event.clientY
        this.isMoving = true
        break
      case this:
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
    console.log('mouseup')

    this.isMoving = false
    this.isResizing = false
  }

  mouseleave (event) {
    console.log('mouseleave')

    this.isMoving = false
    this.isResizing = false
  }

  mousemove (event) {
    console.log('mousemove')

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
    let newPosX = Math.min(dX + this.offsetLeft, this.parentElement.offsetWidth - this.clientWidth)
    newPosX = Math.max(newPosX, this.parentElement.offsetLeft)
    this.setLeft(newPosX)
    this.prevClientX = event.clientX

    const dY = event.clientY - this.prevClientY
    let newPosY = Math.min(dY + this.offsetTop, this.parentElement.offsetHeight - this.clientHeight)
    newPosY = Math.max(newPosY, this.parentElement.offsetTop)
    this.setTop(newPosY)
    this.prevClientY = event.clientY
  }

  resizeWindow (event) {
    // Calculate how much the pointer has moved since last event
    const dX = event.clientX - this.prevClientX
    const dY = event.clientY - this.prevClientY

    // Resize based on which side was clicked
    this.sideClicked.forEach(side => {
      switch (side) {
        case 'top':
          this.setTop(this.offsetTop + dY)
          this.setHeight(this.offsetHeight - dY)
          break
        case 'bottom':
          this.setHeight(this.offsetHeight + dY)
          break
        case 'right':
          this.setWidth(this.offsetWidth + dX)
          break
        case 'left':
          this.setLeft(this.offsetLeft + dX)
          this.setWidth(this.offsetWidth - dX)
          break
      }
    })

    this.prevClientX = event.clientX
    this.prevClientY = event.clientY
    this.updateMainHeight()
  }

  setLeft (integer) {
    this.style.left = integer + 'px'
  }

  setTop (integer) {
    this.style.top = integer + 'px'
  }

  setWidth (integer) {
    this.style.width = integer + 'px'
  }

  setHeight (integer) {
    this.style.height = integer + 'px'
  }

  // This function updates the size of the main content
  // This has to be done manually since the window bar has a fixed size
  updateMainHeight () {
    const h = this.clientHeight - this.header.clientHeight
    this.main.style.height = h + 'px'
  }
}

window.customElements.define('rl-pwd-window', RlPwdWindow)
