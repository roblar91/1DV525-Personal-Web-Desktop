const RlPwdWindowCss = /* css */ `
:host {
    display: inline-block;
    position: absolute;
    width: 30rem;
    height: 24rem;
    min-width: 4rem;
    min-height: 4rem;
    background-color: black;
    border: double 0.5rem darkgrey;
    box-sizing: border-box;
    cursor: move;
}

header {
    user-select: none;
    display: table;
    width: 100%;
    height: 1.5rem;
    background-color: red;
    cursor: grab;
    padding: 0.2rem;
    box-sizing: border-box;
}

header p {
    display: table-cell;
    margin: 0;
    height: 1.1rem;
}

header button {
    display: table-cell;
    height: 1.1rem;
    width: 1.1rem;
    padding: 0;
}

#window-buttons {
    text-align: right;
}

main {
    display: block;
    width: 100%;
    background-color: yellow;
    cursor: default;
}
`

export default RlPwdWindowCss
