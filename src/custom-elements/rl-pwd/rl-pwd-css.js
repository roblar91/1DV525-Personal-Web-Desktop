const rlPwdCss = /* css */ `
:host {
    user-select: none;
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
    flex-direction: row;
    justify-content: center;
    width: 100%;
    height: 2rem;
    background-color: black;
    border-top: 0.3rem ridge #9da6a5;
}

#main-menu {
    flex-direction: column;
    display: none;
    width: 10rem;
    background-color: yellow;
    position: absolute;
    bottom: 2.6rem;
    left: 0.3rem;
}

.main-menu-item {
    display: flex;
    height: 2rem;
    margin: 0.2rem;
    background-color: green;
    align-items: center;
    justify-content: center;
}

.align-left {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: left;
}

.align-right {
    display: flex;
    align-items: center;
    justify-content: right;
}

#main-menu-button {
    width: 4rem;
    padding: 0.2rem;
    margin: 0.1rem;
    font-size: 0.8rem;
    color: white;
    background-color: #1e1f21;
    border: 0.1rem #9da6a5 inset;
}

#main-menu-button:hover {
    color: #1e1f21;
    background-color: lightgrey;
}

#menu-button:active {
    background-color: white;
}

rl-clock {
    color: white;
    text-align: center;
    padding: 0.2rem;
    font-size: 0.8rem;
}

`

export default rlPwdCss
