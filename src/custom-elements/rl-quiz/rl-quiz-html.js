/**
 * @author Robin Larsson <robin_rtl@hotmail.com>
 * Last modified: 2019-11-3
 */

const RlQuizHtml = /* html */ `
<header>
    <div id="title">RL Quiz</div>
    <table id="name-time-table">
        <tbody>
            <tr>
                <td>Name</td>
                <td>Time left</td>
            </tr>
            <tr>
                <td id="username">&nbsp;</td>
                <td id="time-left">&nbsp;</td>
            </tr>
        </tbody>
    </table>
</header>
<main>
    <div id ="main-output"></div>
    <form id="main-form" autocomplete="off">
    </form>
</main>
`

export default RlQuizHtml
