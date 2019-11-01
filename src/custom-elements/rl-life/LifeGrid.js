/**
 * A class respresenting an instance of game of life.
 *
 * @export
 * @class LifeGrid
 */
export class LifeGrid {
  constructor () {
    this._autoExpand = false
  }

  /**
   * Sets the state of this game to the provided two-dimensional
   * array. The outer array holds rows of cells, which should be
   * either 0 or 1, representing a dead or alive cell respectively.
   *
   * @param {number[][]} arr
   * @memberof LifeGrid
   */
  setState (arr) {
    this._state = arr
  }

  /**
   * Returns a clone of this games current state.
   *
   * @returns {number[][]}
   * @memberof LifeGrid
   */
  getState () {
    return [...this._state]
  }

  /**
   * Randomizes the state of this game.
   *
   * @param {number} rows
   * @param {number} columns
   * @param {number} aliveRatio The ratio of cells that will be generated alive
   * @memberof LifeGrid
   */
  randomizeState (rows, columns, aliveRatio) {
    const state = []
    for (let i = 0; i < rows; i++) {
      const row = []

      for (let p = 0; p < columns; p++) {
        let cell = 0

        if (Math.random() < aliveRatio) {
          cell = 1
        }

        row.push(cell)
      }

      state.push(row)
    }

    this.setState(state)
  }

  /**
   * Advance the state of this game.
   *
   * @memberof LifeGrid
   */
  advanceState () {
    // todo
  }

  /**
   * Prints a formatted string representing the current state to the console.
   *
   * @param {boolean} compact If false extra whitespace will be added to keep a better aspect ratio
   * @memberof LifeGrid
   */
  printState (compact) {
    let outString = ''

    this._state.forEach(row => {
      row.forEach(cell => {
        if (cell === 1) {
          outString += '#'
        } else {
          outString += '.'
        }

        if (!compact) {
          outString += '  '
        }
      })

      outString += '\n'
    })

    console.log(outString)
  }

  /**
   * If auto expand is true, the grid size will increase if cells
   * would be born out of index.
   *
   * @param {boolean} bool
   * @memberof LifeGrid
   */
  setAutoExpand (bool) {
    this._autoExpand = bool
  }

  /**
   * Returns true if auto expand is enabled.
   *
   * @returns {boolean}
   * @memberof LifeGrid
   */
  isAutoExpand () {
    return this._autoExpand
  }
}
