const RlPwdWindowCss = /* css */ `
:host {
    display: inline-block;
    position: absolute;
    width: 30rem;
    height: 24rem;
    min-width: 5rem;
    min-height: 5rem;
    background-color: black;
    border: double 0.4rem darkgrey;
    box-sizing: border-box;
    cursor: move;
}

header {
    user-select: none;
    display: table;
    width: 100%;
    height: 1.5rem;
    color: white;
    background-color: #1e1f21;
    cursor: grab;
    padding: 0.2rem;
    box-sizing: border-box;
    overflow: hidden;
}

header button {
    display: inline-block;
    height: 1.1rem;
    width: 1.1rem;
    padding: 0.2rem;
    font-size: 0.5rem;
    color: white;
    background-color: #1e1f21;
    border: 0.1rem darkgrey inset;
}

header button:hover {
    color: #1e1f21;
    background-color: lightgrey;
}

#window-title {
    display: table-cell;
    height: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
}

#window-buttons {
    display: table-cell;
    height: 100%;
    text-align: right;
    min-width: 5rem;
}

main {
    display: block;
    width: 100%;
    background-color: black;
    cursor: default;
}
`

export default RlPwdWindowCss
