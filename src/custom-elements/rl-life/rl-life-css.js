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
    box-sizing: border-box;
    justify-content: left;
}

.header-section {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: row;
    height: 100%;
    border-right: solid 0.1rem #656370;
    box-sizing: border-box;
    white-space: nowrap;
    font-size: 0.8rem;
    min-width: 0;
    border-bottom: ridge 0.2rem #656370;
}

button {
    width: 100%;
    height: 100%;
    border: none;
    background: none;
    color: white;
    padding: 0.4rem;
    text-align: left;
    overflow: hidden;
}

button:hover {
    background: #45434D;
}

button:active {
    background: #656370;
}

.menu {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 2rem;
    left: 0;
    box-sizing: border-box;
    background-color: #231C41;
    border-left: ridge 0.2rem #656370;
    border-right: ridge 0.2rem #656370;
    border-bottom: ridge 0.2rem #656370;
}

.menu-item {
    height: 2rem;
    white-space: nowrap;
    font-size: 0.8rem;
    min-width: 0;
    width: 6rem;
    border-top: solid 0.1rem #656370;
    box-sizing: border-box;
}

#set-state-section:hover #set-state-menu {
    display: flex;
}

#auto-play-speed-section:hover #auto-play-speed-menu {
    display: flex;
}

#auto-expand-section:hover #auto-expand-menu {
    display: flex;
}

main {
    justify-content: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 0;
    flex: 1;
}

.cell-row {
    justify-content: center;
    display: flex;
    flex-direction: row;
    min-height: 0;
}

.cell {
    width: 2rem;
    height: 2rem;
    min-width: 0;
    min-height: 0;
    background-color: white;
    border: 1px grey solid;
}

.alive {
    background-color: black !important;
}

.active {
    border: 0.2rem ridge yellow !important;
}
`

/** The basic CSS intended to be inserted into 'rl-life' */
export default _rlLifeCss
