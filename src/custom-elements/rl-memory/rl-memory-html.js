const html = /* html */ `
<header>
    <div class="header-section">
    <p>Hits: <span id="hits"></span></p>
    <p>Misses: <span id="misses"></span></p>
    </div>

    <div class="header-section">
    <label for="columns">Columns</label>
    <select id="columns">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4" selected="selected">4</option>
    </select>
    </div>

    <div class="header-section">
    <label for="rows">Rows</label>
    <select id="rows">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4" selected="selected">4</option>
    </select>
    </div>

    <div class="header-section">
    <button id="resetbutton">Reset</button>
    </div>
</header>

<main>
</main>
`

/** The basic HTML intended to be inserted into 'rl-memory' */
export default html
