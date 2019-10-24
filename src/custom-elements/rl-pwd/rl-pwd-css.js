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
    overflow: hidden;
    position: relative;
}

button {
    display: flex;
    align-items: center;
    justify-content: left;
    color: white;
    background-color: #1e1f21;
    border: 0.1rem #9da6a5 inset;
    box-sizing: content-box;
    overflow: hidden;
}

button:hover {
    color: #1e1f21;
    background-color: darkgrey;
}

button:active {
    background-color: white;
}

img {
    display: flex;
    flex: 0 1;
    border-radius: 0.2rem;
    height: 80%;
    pointer-events: none;
    margin-right: 0.5rem;
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
    z-index: 10000;
}

.main-menu-item {
    height: 2rem;
    margin-bottom: 0.3rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}

#overflow-container {
    flex-direction: column;
    display: flex;
    flex: 0 1;
    background-color: black;
    position: absolute;
    bottom: 2.6rem;
    right: 0.3rem;
    box-sizing: content-box;
    border: 0.3rem ridge #9da6a5;
    align-items: center;
    justify-content: center;
    padding: 0.2rem 0.2rem 0.2rem 0;
    z-index: 10000;
}

#overflow-button {
    height: 80%;
    width: 1rem;
    font-size: 1rem;
    margin-left: 0.2rem;
    justify-content: center;
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
    margin-left: 0.2rem;
}

#running-app-container {
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    justify-content: left;
}

.running-app-item {
    font-size: 0.8rem;
    margin-left: 0.2rem;
    height: 1.5rem;
    width: 7rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    opacity: 0.5;
}

rl-clock {
    margin-left: 0.2rem;
    color: white;
    text-align: center;
    padding: 0.2rem;
    font-size: 0.8rem;
}

.active-window {
    opacity: 1;
}
`

/** The basic CSS intended to be inserted into 'rl-pwd' */
export default rlPwdCss
