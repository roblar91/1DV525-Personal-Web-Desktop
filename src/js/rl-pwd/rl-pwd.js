class RlPwd extends window.HTMLElement {
  constructor () {
    super()
    console.log('Hello from RlPwd')
  }
}

window.customElements.define('rl-pwd', RlPwd)
