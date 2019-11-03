/**
 * @author Robin Larsson <robin_rtl@hotmail.com>
 * Last modified: 2019-11-3
 */

const RlQuizCss = /* css */ `
:host {
    display: inline-block;
    font-size: 100%;
    font-family: "Lucida Console", monospace;
    background: darkgrey;
    width: 100%;
    height: 100%;
    min-width: 20rem;
}

header {
    text-align: center;
}

#title {
    font-size: 3rem;
    margin: 1rem 1rem 0;
    padding: 1rem;
    border-bottom: 0.25rem black double;
}

table {
    width: 100%;
    margin-bottom: 1rem;
    border-collapse: separate;
    border-spacing: 2rem 0.5rem;
}

th {
    border-bottom: 0.2rem double black;
}

td {
    width: 50%;
    font-size: 1rem;
}

main {
    padding: 0 2rem 2rem;
    font-size: 1.5rem;
    text-align: center;
}

input {
    display: inline-block;
    margin-bottom: 1rem;
}

label {
    word-break: break-all;
}

#username, #time-left {
    padding-left: 10%;
    padding-right: 10%;
    background: lightgrey;
    border: inset 0.5rem black;
    overflow: hidden;
}

#radio-container {
    text-align: left;
    padding-left: 1rem;
    margin-bottom: 1rem;
}

input[type='text'] {
    border: 0.2rem solid black;
    width: 50%;
    padding: 0.2rem;
}

input[type='radio'] {
}

input[type='submit'] {
    color: white;
    background: black;
    font-size: 1rem;
    border: 0.2rem solid black;
    padding: 0.5rem;
    width: 50%;
    transition-duration: 0.3s;
}

input[type='submit']:hover {
    color: black;
    background: white;
}
`

export default RlQuizCss
