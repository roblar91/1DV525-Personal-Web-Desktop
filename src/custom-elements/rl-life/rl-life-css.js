const _rlLifeCss = /* css */ `
:host, button {
    font-family: monospace;
    font-size: 100%;
}

:host {
    background-color: white;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

header {
    display: flex;
    flex-direction: row;
    width: 100%;
    background-color: #070416;
    color: white;
    height: 2rem;
    border-bottom: ridge 0.2rem #656370;
    box-sizing: border-box;
    justify-content: space-evenly;
}

.header-section {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    height: 100%;
    border-right: solid 0.1rem #656370;
    box-sizing: border-box;
    padding: 0.2rem;
    white-space: nowrap;
    font-size: 0.8rem;
    min-width: 0;
    overflow: hidden;
}

button {
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    color: white;
    padding: 0;
    text-align: left;
}

button:hover {
    background: #45434D;
}

button:active {
    background: #656370;
}

main {
    width: 100%;
    flex: 1;
}
`

/** The basic CSS intended to be inserted into 'rl-life' */
export default _rlLifeCss
