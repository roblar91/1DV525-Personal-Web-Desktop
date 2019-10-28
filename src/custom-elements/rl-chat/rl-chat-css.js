const css = /* css */ `
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
    background-color: yellow;
    align-items: center;
    justify-content: left;
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
    background-color: blue;
    overflow: hidden;
}

#channel-list {
    flex: 0 0 8rem;
    background-color: green;
    padding: 0.2rem;
}

#add-remove-channel {
    display: flex;
    flex-direction: row;
    height: 1.5rem;
    align-items: center;
    justify-content: space-evenly;
}

#add-remove-channel button {
    flex: 0 1;
    height: 100%;
}

#channels button {
    display: flex;
    height: 1.5rem;
    width: 100%;
    overflow: hidden;
    margin-top: 0.2rem;
    align-items: center;
    justify-content: left;
    border: double 0.2rem black;
}

.active-channel {
    border: solid 0.2rem yellow !important;
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
    overflow-y: scroll;
}

.message {
    position: relative;
    flex: 0 1;
    background-color: yellow;
    margin: 0.5rem 0.5rem 0;
    display: flex;
    flex-direction: row;
    min-height: min-content;
    padding: 1rem;
    scroll-margin-bottom: 1rem;
    border-radius: 0.2rem;
}

.message .sender {
    position: absolute;
    top: -0.2em;
    left: -0.2rem;
    padding: 0 0.2rem;
    overflow: hidden;
    border-radius: 0.2rem;
    background-color: skyblue;
}

.message .data {
    flex: 1;
    word-break: break-word;
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
    flex: 0 1;
    background: rgba(255, 255, 255, 1);
    padding: 2rem;
}
`

/** The basic CSS intended to be inserted into 'rl-chat' */
export default css
