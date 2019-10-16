const RlPwdWindowCss = /* css */ `
:host {
    user-select: none;
    display: flex;
    flex-direction: column;
    flex: 1;
    position: absolute;
    width: 30rem;
    height: 24rem;
    min-width: 7rem;
    min-height: 7rem;
    background-color: black;
    border: double 0.4rem #9da6a5;
    box-sizing: border-box;
    cursor: move;
}

header {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 1.5rem;
    color: white;
    background-color: #1e1f21;
    cursor: grab;
    padding: 0.2rem;
    box-sizing: border-box;
    border-bottom: solid 0.1rem #9da6a5;
    align-items: center;
}

#window-icon {
    display: flex;
    flex: 0 1 auto;
    border-radius: 0.2rem;
    height: 80%;
    min-width: 0;
    margin-right: 0.5rem;
    pointer-events: none;
}

#window-title {
    flex: 1;
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
}

#window-buttons {
    display: flex;
    flex: 0 0 auto;
    height: 100%;
    align-items: center;
    justify-content: right;
}

header button {
    display: inline-block;
    height: 1.1rem;
    width: 1.1rem;
    padding: 0.2rem;
    font-size: 0.5rem;
    color: white;
    background-color: #1e1f21;
    border: 0.1rem #9da6a5 inset;
    margin-left: 0.2rem;
}

header button:hover {
    color: #1e1f21;
    background-color: lightgrey;
}

header button:active {
    background-color: white;
}

main {
    display: flex;
    flex: 1;
    width: 100%;
    background-color: black;
    cursor: default;
    overflow: hidden;
}
`

export default RlPwdWindowCss
