/**
 * @author Robin Larsson <robin_rtl@hotmail.com>
 * Last modified: 2019-11-3
 */

const patterns = []

const glider = `
.O
..O
OOO 
`
patterns.push({
  name: 'Glider',
  pattern: glider
})

const gliderGun = `
........................O
......................O.O
............OO......OO............OO
...........O...O....OO............OO
OO........O.....O...OO
OO........O...O.OO....O.O
..........O.....O.......O
...........O...O
............OO
`
patterns.push({
  name: 'Glider gun',
  pattern: gliderGun
})

const thunderbird = `
OOO

.O
.O
.O
`
patterns.push({
  name: 'Thunderbird',
  pattern: thunderbird
})

/** An array containing some predefined patterns to be used in game of life */
export default patterns
