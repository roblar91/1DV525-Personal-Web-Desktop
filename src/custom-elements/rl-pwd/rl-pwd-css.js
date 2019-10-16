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
    background-position: center center;
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
    max-width: 100%;
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

.main-menu-item img, .running-app-item img {
    display: flex;
    flex: 0 1;
    margin-right: 1rem;
    border-radius: 0.2rem;
    height: 80%;
}

.align-left {
    flex: 1 0;
    display: flex;
    align-items: center;
    justify-content: left;
    height: 100%;
}

.align-right {
    display: flex;
    flex: 0 0;
    align-items: center;
    justify-content: right;
    height: 100%;
}

#main-menu-button {
    height: 80%;
    width: 4rem;
    font-size: 0.8rem;
    color: white;
    background-color: #1e1f21;
    border: 0.1rem #9da6a5 inset;
    margin-left: 0.2rem;
    box-sizing: content-box;
}

#main-menu-button:hover, .main-menu-item:hover, .running-app-item:hover {
    color: #1e1f21;
    background-color: darkgrey;
}

#main-menu-button:active, .main-menu-item:active, .running-app-item:active {
    background-color: white;
}

#running-app-container {
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: left;
}

.running-app-item {
    display: flex;
    font-size: 0.8rem;
    margin-left: 0.2rem;
    flex: 0 1 8rem;
    height: 80%;
    color: white;
    background-color: #1e1f21;
    align-items: center;
    justify-content: left;
    border: 0.1rem #9da6a5 inset;
    overflow: hidden;
    box-sizing: content-box;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

rl-clock {
    margin-left: 0.2rem;
    color: white;
    text-align: center;
    padding: 0.2rem;
    font-size: 0.8rem;
}

`

export default rlPwdCss
