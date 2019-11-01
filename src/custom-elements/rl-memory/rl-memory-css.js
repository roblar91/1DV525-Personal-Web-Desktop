const css = /* css */ `
:host, button {
  font-size: 100%;
  font-family: serif;
}

:host {
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: white;
  align-items: center;
  justify-content: top;
  white-space: nowrap;
}

header {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 3rem;
  background-color: lightgrey;
  padding: 0.2rem;
}

.header-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}

p {
  margin: 0;
}

main {
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
  justify-content: center;
  text-align: center;
}

.card-row {
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
}

game-card {
  flex: 1;
  height: 100%;
}

#win-message {
  font-size: 2rem;
}
`

/** The basic CSS intended to be inserted into 'rl-memory' */
export default css
