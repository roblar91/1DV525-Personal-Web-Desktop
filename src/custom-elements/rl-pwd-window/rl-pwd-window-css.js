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
    display: block;
    width: 100%;
    height: 1.5rem;
    background-color: red;
    cursor: grab;
}

main {
    display: block;
    width: 100%;
    background-color: yellow;
    cursor: default;
}
`

export default RlPwdWindowCss
