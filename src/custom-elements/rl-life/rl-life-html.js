const _rlLifeHtml = /* html */ `
<header>
    <div id="set-state-section" class="header-section">
        <button id="set-state-button">
            Set state
        </button>
        <div id="set-state-menu" class="menu">
            <div class="menu-item">
                <button id="random-state-button">
                    Random
                </button>
            </div>
            <div class="menu-item">
                <button id="load-state-button">
                    Load
                </button>
            </div>
        </div>
    </div>

    <div class="header-section">
        <button id="next-state-button">
            Next state
        </button>
    </div>

    <div class="header-section">
        <button id="auto-play-button">
            Auto play
        </button>
    </div>

    <div id="auto-play-speed-section" class="header-section">
        <button id="auto-play-speed-button">
            Auto play speed
        </button>
        <div id="auto-play-speed-menu" class="menu">
            <div class="menu-item">
                <button id="speed-slow-button">
                    Slow
                </button>
            </div>
            <div class="menu-item">
                <button id="speed-average-button" class="active">
                    Average
                </button>
            </div>
            <div class="menu-item">
                <button id="speed-fast-button">
                    Fast
                </button>
            </div>
        </div>
    </div>

    <div id="auto-expand-section" class="header-section">
        <button id="auto-expand-button">
            Auto expand
        </button>
        <div id="auto-expand-menu" class="menu">
            <div class="menu-item">
                <button id="auto-expand-true-button">
                    True
                </button>
            </div>
            <div class="menu-item">
                <button id="auto-expand-false-button" class="active">
                    False
                </button>
            </div>
        </div>
    </div>

    <div class="header-section">
        <button id="console-print-button">
            Print to console
        </button>
    </div>
</header>

<main>
</main>
`

/** The basic HTML intended to be inserted into 'rl-life' */
export default _rlLifeHtml
