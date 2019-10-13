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

    // todo: should be set in parent
    this.setTop(40)
    this.setLeft(40)

    this.addEventListener('mousedown', this.mousedownHandler)
    this.addEventListener('mouseup', this.mouseupHandler)
    this.addEventListener('mouseleave', this.mouseleaveHandler)
    this.addEventListener('mousemove', this.mousemoveHandler)
  }

  mousedown (event) {
    console.log('mousedown')

    // todo: check if border or header was clicked
    this.prevClientX = event.clientX
    this.prevClientY = event.clientY
    this.isMoving = true
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

    if (this.isResizing) {

    } else if (this.isMoving) {
      // Calculate how much the pointer has moved since last event and move window accordingly
      const dX = event.clientX - this.prevClientX
      const wX = parseInt(this.style.left, 10)
      this.setLeft(wX + dX)
      this.prevClientX = event.clientX

      const dY = event.clientY - this.prevClientY
      const wY = parseInt(this.style.top, 10)
      this.setTop(wY + dY)
      this.prevClientY = event.clientY
    }
  }

  setLeft (integer) {
    this.style.left = integer + 'px'
  }

  setTop (integer) {
    this.style.top = integer + 'px'
  }
}

window.customElements.define('rl-pwd-window', RlPwdWindow)
