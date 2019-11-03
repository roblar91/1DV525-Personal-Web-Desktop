/**
 * @author Robin Larsson <robin_rtl@hotmail.com>
 * Last modified: 2019-11-3
 */

/**
 * A class respresenting an instance of game of life.
 *
 * @export
 * @class LifeGame
 */
export class LifeGame {
  constructor () {
    this._autoExpand = false
    this._rules = {
      breedMinNeighbours: 3,
      breedMaxNeighbours: 3,
      stayAliveMinNeighbours: 2,
      stayAliveMaxNeighbours: 3
    }
  }

  /**
   * Sets the state of this game to the provided two-dimensional
   * array. The outer array holds rows of cells, which should be
   * either 0 or 1, representing a dead or alive cell respectively.
   *
   * @param {number[][]} arr
   * @memberof LifeGame
   */
  setState (arr) {
    this._state = arr
    this._rowCount = arr.length
    this._columnCount = arr[0].length
  }

  /**
   * Returns a clone of this games current state.
   *
   * @returns {number[][]}
   * @memberof LifeGame
   */
  getState () {
    return [...this._state]
  }

  /**
   * Returns the number of rows in the current state.
   *
   * @returns {number}
   * @memberof LifeGame
   */
  getRowCount () {
    return this._rowCount
  }

  /**
   * Returns the number of columns in the current state.
   *
   * @returns {number}
   * @memberof LifeGame
   */
  getColumnCount () {
    return this._columnCount
  }

  /**
   * Returns the cell at the specified position. Trying to access a cell
   * out of index will return a 0.
   *
   * @param {number} row Row number, starting at 0
   * @param {number} column Column number, starting at 0
   * @returns {number} 1 for a live cell, 0 for a dead cell
   * @memberof LifeGame
   */
  getCellAt (row, column) {
    let state
    try {
      state = this._state[row][column]

      // JavaScript only throws an error when the outer array is out of range for some reason so we have to check the type
      if (typeof state === 'undefined') {
        state = 0
      }
    } catch {
      state = 0
    }

    return state
  }

  /**
   * Returns the sum of all alive neighbours of the cell at the specified position.
   *
   * @param {number} row
   * @param {number} column
   * @returns {number}
   * @memberof LifeGame
   */
  getNeighbourCount (row, column) {
    let count = 0

    // NW
    count += this.getCellAt(row - 1, column - 1)

    // N
    count += this.getCellAt(row - 1, column)

    // NE
    count += this.getCellAt(row - 1, column + 1)

    // W
    count += this.getCellAt(row, column - 1)

    // E
    count += this.getCellAt(row, column + 1)

    // SW
    count += this.getCellAt(row + 1, column - 1)

    // S
    count += this.getCellAt(row + 1, column)

    // SE
    count += this.getCellAt(row + 1, column + 1)

    return count
  }

  /**
   * Randomizes the state of this game.
   *
   * @param {number} rows
   * @param {number} columns
   * @param {number} aliveRatio The ratio of cells that will be generated alive
   * @memberof LifeGame
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
   * @memberof LifeGame
   */
  advanceState () {
    const newState = []

    if (this._autoExpand) {
      this._expandGrid()
    }

    for (let rowIndex = 0; rowIndex < this.getRowCount(); rowIndex++) {
      const row = []

      for (let columnIndex = 0; columnIndex < this.getColumnCount(); columnIndex++) {
        const aliveNeighbours = this.getNeighbourCount(rowIndex, columnIndex)

        let cell

        if (this.getCellAt(rowIndex, columnIndex) === 1) {
          // Cell is currently alive
          if (aliveNeighbours >= this._rules.stayAliveMinNeighbours && aliveNeighbours <= this._rules.stayAliveMaxNeighbours) {
            cell = 1
          } else {
            cell = 0
          }
        } else {
          // Cell is currently dead
          if (aliveNeighbours >= this._rules.breedMinNeighbours && aliveNeighbours <= this._rules.breedMaxNeighbours) {
            cell = 1
          } else {
            cell = 0
          }
        }

        row.push(cell)
      }
      newState.push(row)
    }

    this.setState(newState)
  }

  /**
   * Prints a formatted string representing the current state to the console.
   *
   * @param {boolean} compact If false extra whitespace will be added to keep a better aspect ratio
   * @memberof LifeGame
   */
  printState (compact) {
    let outString = ''

    this._state.forEach(row => {
      row.forEach(cell => {
        if (cell === 1) {
          outString += 'O'
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
   * @memberof LifeGame
   */
  setAutoExpand (bool) {
    this._autoExpand = bool
  }

  /**
   * Returns true if auto expand is enabled.
   *
   * @returns {boolean}
   * @memberof LifeGame
   */
  isAutoExpand () {
    return this._autoExpand
  }

  /**
   * Returns a new grid which is a clone of the provided grid but with added padding.
   * The padding consists of a line of dead cells and it is applied to the specified edge.
   *
   * @param {string} edge Valid options are 'top', 'bottom', 'left', 'right', 'all'
   * @returns {number[][]}
   * @memberof LifeGame
   */
  padGrid (state, edge) {
    const newState = []

    if (edge === 'top' || edge === 'all') {
      const emptyRow = []

      for (let i = 0; i < state[0].length; i++) {
        emptyRow.push(0)
      }

      newState.push(emptyRow)
    }

    for (let i = 0; i < state.length; i++) {
      newState.push(state[i])
    }

    if (edge === 'bottom' || edge === 'all') {
      const emptyRow = []

      for (let i = 0; i < state[0].length; i++) {
        emptyRow.push(0)
      }

      newState.push(emptyRow)
    }

    if (edge === 'left' || edge === 'all') {
      newState.forEach(row => {
        row.unshift(0)
      })
    }

    if (edge === 'right' || edge === 'all') {
      newState.forEach(row => {
        row.push(0)
      })
    }

    return newState
  }

  _expandGrid () {
    // Add a new line of dead cells to any edge where there are live cells
    let expandTop = false
    let expandBottom = false
    let expandLeft = false
    let expandRight = false

    for (let columnIndex = 0; columnIndex < this.getColumnCount(); columnIndex++) {
      if (this.getCellAt(0, columnIndex) === 1) {
        expandTop = true
      }
      if (this.getCellAt(this.getRowCount() - 1, columnIndex) === 1) {
        expandBottom = true
      }
    }

    for (let rowIndex = 0; rowIndex < this.getRowCount(); rowIndex++) {
      if (this.getCellAt(rowIndex, 0) === 1) {
        expandLeft = true
      }
      if (this.getCellAt(rowIndex, this.getColumnCount() - 1) === 1) {
        expandRight = true
      }
    }

    let newState = this.getState()

    if (expandTop) {
      newState = this.padGrid(newState, 'top')
    }
    if (expandBottom) {
      newState = this.padGrid(newState, 'bottom')
    }
    if (expandLeft) {
      newState = this.padGrid(newState, 'left')
    }
    if (expandRight) {
      newState = this.padGrid(newState, 'right')
    }

    this.setState(newState)
  }
}
