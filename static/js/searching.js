document.addEventListener('DOMContentLoaded', (event) => {
    // const url = document.location.href;
    const url = location.origin
    console.log(url);
    const divide = document.querySelector('#alltables');
    table = createNewTable()
    divide.appendChild(table)
})

document.querySelector('#searching').addEventListener('click', (event) => {
    event.preventDefault();
    const val = document.querySelector('#staticEmail2');
    console.log(val.value);
})

const createNewTable = () => {
    const mediaQuery = window.matchMedia('(max-width:600px)');
    const table = document.createElement('table')
    table.setAttribute('class', 'booktable');
    table.style = 'width: 100%, border-collapse: collapse; background-color: #f0f0f0';
    const head = document.createElement('thead');
    head.style = 'padding: 1em; border: 1px solid #ddd;'
    if (mediaQuery.matches) {
        table.style = 'font-size: 0.8em;'
        head.style = 'padding: 0.5em;'
    }
    const headRow = document.createElement('tr')
    const tableAttr = ['name', 'type', 'author', 'Link'];
    tableAttr.forEach((val) => {
        newRow = document.createElement('td')
        newRow.style = 'text-align: center; padding: 1em; border: 1px solid #ddd;'
        if (mediaQuery.matches) {
            newRow.style = 'padding: 0.5em;';
        }
        newRow.textContent = val.toUpperCase();
        headRow.appendChild(newRow);
    })
    head.appendChild(headRow);
    table.appendChild(head);
    return table
}

function forPageOnload (hostname) {
    fetch(`${hostname}/firsttime`)
}