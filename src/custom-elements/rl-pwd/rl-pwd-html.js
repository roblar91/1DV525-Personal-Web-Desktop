/**
 * @author Robin Larsson <robin_rtl@hotmail.com>
 * Last modified: 2019-11-3
 */

const RlPwdHtml = /* html */ `
<header>
</header>
<main>
    <div id="window-container">
    </div>
    <div id="main-menu">
    </div>
    <div id="overflow-container">
    </div>
</main>
<div id="taskbar">
    <div class="align-left">
        <button id="main-menu-button">
            <img src="./resources/rl-pwd/icon.png" alt="">
            <p>Menu</p>
        </button>
        <div id="running-app-container">
        </div>
        <button id="overflow-button">
            <p>+</p>
        </button>
    </div>
    <div class="align-right">
        <rl-clock></rl-clock>
    </div>
</div>
`

/** The basic HTML intended to be inserted into 'rl-pwd' */
export default RlPwdHtml
