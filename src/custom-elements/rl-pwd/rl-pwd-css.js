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
    width: 12rem;
    background-color: black;
    position: absolute;
    bottom: 2.6rem;
    left: 0.3rem;
    box-sizing: content-box;
    border: 0.3rem ridge #9da6a5;
    padding: 0.5rem 0.5rem 0.2rem 0.5rem;
}

.main-menu-item {
    display: flex;
    height: 2rem;
    color: white;
    background-color: #1e1f21;
    align-items: center;
    justify-content: left;
    border: 0.1rem solid #9da6a5;
    overflow: hidden;
    margin-bottom: 0.3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

.main-menu-item img {
    display: inline-block;
    margin-right: 1rem;
    border-radius: 0.2rem;
    height: 80%;
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

#main-menu-button:hover, .main-menu-item:hover {
    color: #1e1f21;
    background-color: darkgrey;
}

#main-menu-button:active, .main-menu-item:active {
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
