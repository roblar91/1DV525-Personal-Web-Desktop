const rlPwdCss = /* css */ `
:host {
    display: flex;
    flex-direction: column;
    font-size: 100%;
    font-family: monospace;
    background:  black;
    background-image: url('/resources/rl-pwd/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    border: 0.3rem ridge #9da6a5;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

main {
    display: flex;
    width: 100%;
    flex: 1;
}

#taskbar {
    display: flex;
    width: 100%;
    height: 2rem;
    background-color: black;
    border-top: 0.3rem ridge #9da6a5;
}
`

export default rlPwdCss
