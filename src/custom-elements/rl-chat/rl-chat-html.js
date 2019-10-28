const html = /* html */ `
<header>
    <div class="align-left">
        <button id="change-username-button" title="Change username">
            E
        </button>
        <div id="header-username"></div>
    </div>
    <div class="align-right">
        <div id="header-current-channel"></div>
    </div>
</header>
<main>
    <div id="channel-list">
        <div id="add-remove-channel">
            <button id="add-channel-button" title="Add channel">
                +
            </button>
            <button id="remove-channel-button" title="Remove channel">
                -
            </button>
        </div>
        <div id="channels">
        </div>
    </div>
    <div id="chat">
        <div id="messages">
        </div>
        <form id="chat-form">
            <input id="chat-input-text" type="text">
            <input id="chat-input-submit" type="submit" value="Send">
        </form>
    </div>
</main>

<div id="popup-overlay">
    <div id="popup-content">
    </div>
</div>
`

/** The basic HTML intended to be inserted into 'rl-chat' */
export default html
