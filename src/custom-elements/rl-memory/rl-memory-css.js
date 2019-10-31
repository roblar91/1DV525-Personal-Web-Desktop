const css = /* css */ `
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
    height: 2rem;
    background-color: lightgrey;
    margin-bottom: 1rem;
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
  
  game-card {
    width: 6rem;
    height: 6rem;
  }
`

/** The basic CSS intended to be inserted into 'rl-memory' */
export default css
