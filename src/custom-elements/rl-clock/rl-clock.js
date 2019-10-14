export class RlClock extends window.HTMLElement {
  connectedCallback () {
    this.updateTime()
  }

  updateTime () {
    const date = new Date()
    let hours = date.getHours()
    let minutes = date.getMinutes()

    if (hours < 10) {
      hours = '0' + hours
    }
    if (minutes < 10) {
      minutes = '0' + minutes
    }

    this.innerHTML = /* html */ `
    ${hours}:${minutes}
    <br>
    ${date.getFullYear()}/${date.getMonth()}/${date.getDay()}
    `
    setTimeout(() => this.updateTime(), 1000)
  }
}

window.customElements.define('rl-clock', RlClock)
