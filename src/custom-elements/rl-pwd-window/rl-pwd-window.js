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
    } else if (this.isResizing) {
      // Calculate how much the pointer has moved since last event and resize window accordingly
      const dX = event.clientX - this.prevClientX
      this.setWidth(this.offsetWidth + dX)
      this.prevClientX = event.clientX

      const dY = event.clientY - this.prevClientY
      this.setHeight(this.offsetHeight + dY)
      this.prevClientY = event.clientY

      this.updateMainHeight()
    }
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
