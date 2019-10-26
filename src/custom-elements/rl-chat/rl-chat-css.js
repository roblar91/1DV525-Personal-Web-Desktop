const css = /* css */ `
:host {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}

header {
    flex: 0 0 2rem;
    background-color: yellow;
}

main {
    display: flex;
    flex: 1 1;
    flex-direction: row;
    background-color: blue;
    overflow: hidden;
}

#channels {
    flex: 0 0 8rem;
    background-color: green;
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
`

/** The basic CSS intended to be inserted into 'rl-chat' */
export default css
