/**
 * A custom HTML element that displays a clock and the date.
 * The clock updates automatically every second.
 *
 * @class RlClock
 * @extends {window.HTMLElement}
 */
class RlClock extends window.HTMLElement {
  connectedCallback () {
    this._updateTime()
  }

  _updateTime () {
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
    ${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}
    `
    setTimeout(() => this._updateTime(), 1000)
  }
}

window.customElements.define('rl-clock', RlClock)
