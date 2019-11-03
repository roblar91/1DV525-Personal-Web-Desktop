/**
 * @author Robin Larsson <robin_rtl@hotmail.com>
 * Last modified: 2019-11-3
 */

const css = /* css */ `

:host, button, form, chat-channel, chat-message {
    font-size: 100%;
    font-family: serif;
}

:host {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

header {
    display: flex;
    flex-direction: row;
    flex: 0 0 2rem;
    background-color: darkgrey;
    align-items: center;
    justify-content: left;
    font-size: 1.2rem;
}

#change-username-button {
    margin-left: 0.3rem;
    margin-right: 0.3rem;
}

button {
    margin: 0;
    padding: 0;
    background-color: transparent;
    border: 0.1rem outset black;
    flex: 0 1;
    height: min-content;
}

button:active {
    border-style: inset;
}

img {
    display: block;
}

.align-left {
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: left;
}

.align-right {
    display: flex;
    flex: 1;
    height: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: right;
}

main {
    display: flex;
    flex: 1 1;
    flex-direction: row;
    background-color: white;
    overflow: hidden;
}

#channel-list {
    flex: 0 0 8rem;
    background-color: lightgrey;
    padding: 0.2rem;
}

#channel-bar {
    font-size: 0.8rem;
    border-bottom: 0.1rem solid;
    display: flex;
    flex-direction: row;
    height: 1.5rem;
    align-items: center;
    justify-content: space-evenly;
}

chat-channel {
    display: flex;
    flex: 0 1 1.5rem;
    width: 100%;
    overflow: hidden;
    margin-top: 0.2rem;
    align-items: center;
    justify-content: left;
    border: none;
}

.active-channel {
    border: solid 0.1rem black !important;
    color: white !important;
    background-color: black !important;
    padding: 0.2rem !important;
    font-size: 1.1rem !important;
}

#chat {
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: hidden;
}

#messages {
    display: flex;
    flex: 1;
    background-color: white;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
}

chat-message {
    display: flex;
    flex-direction: column;
    flex: 0 1;
    margin: 0.5rem 0.5rem 0;
    min-height: min-content;
    padding: 0.5rem 1rem 0.5rem;
    scroll-margin-bottom: 1rem;
    border-radius: 0.2rem;
}

#chat-form {
    display: flex;
    flex-direction: row;
    padding: 0.5rem;
    flex: 0;
    height: 2rem;
}

#chat-input-text {
    flex: 1 1;
}

#chat-input-submit {
    flex: 0;
}

#popup-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    visibility: hidden;
}

#popup-content {
    display: flex;
    flex-direction: column;
    flex: 0 1;
    background: rgba(255, 255, 255, 1);
    padding: 2rem;
    min-width: 10rem;
    justify-content: space-evenly;
    align-items: space-evenly;
}

#popup-form {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: space-evenly;
}

#popup-buttons {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: space-evenly;
}
`

/** The basic CSS intended to be inserted into 'rl-chat' */
export default css
