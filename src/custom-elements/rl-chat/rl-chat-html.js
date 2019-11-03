/**
 * @author Robin Larsson <robin_rtl@hotmail.com>
 * Last modified: 2019-11-3
 */

const html = /* html */ `
<header>
    <div class="align-left">
        <button id="change-username-button" title="Change username">
            <img src="./resources/rl-chat/edit.png" alt="">
        </button>
        <div id="header-username"></div>
    </div>
    <div class="align-right">
    </div>
</header>
<main>
    <div id="channel-list">
        <div id="channel-bar">
            <p>Channels</p>
            <button id="add-channel-button" title="Add channel">
                <img src="./resources/rl-chat/plus.png" alt="">
            </button>
            <button id="remove-channel-button" title="Remove channel">
                <img src="./resources/rl-chat/minus.png" alt="">
            </button>
        </div>
        <div id="channels">
        </div>
    </div>
    <div id="chat">
        <div id="messages">
        </div>
        <form id="chat-form">
            <input id="chat-input-text" type="text" autocomplete="off">
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
