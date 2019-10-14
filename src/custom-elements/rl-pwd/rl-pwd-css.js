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
    flex-direction: column;
    justify-content: center;
    align-items: left;
    width: 100%;
    height: 2rem;
    background-color: black;
    border-top: 0.3rem ridge #9da6a5;
}

#menu-button {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex: 1;
    width: 4rem;
    padding: 0.2rem;
    margin: 0.1rem;
    font-size: 0.8rem;
    color: white;
    background-color: #1e1f21;
    border: 0.1rem #9da6a5 inset;
}

#menu-button:hover {
    color: #1e1f21;
    background-color: lightgrey;
}

#menu-button:active {
    background-color: white;
}

`

export default rlPwdCss
