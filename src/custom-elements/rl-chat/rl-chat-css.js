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
    overflow-y: hidden;
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
    overflow-y: scroll;
}

.message {
    flex: 0 1;
    background-color: purple;
    margin: 0.5rem 0.5rem 0;
    display: flex;
    flex-direction: row;
}

.message .username {
    flex: 1 1 2rem;
    height: 3rem;
}

.message .data {
    flex: 1 1 2rem;
    height: 3rem;
}

#chat-form {
    padding: 0.5rem;
    flex: 0;
    height: 2rem;
}
`

export default css
