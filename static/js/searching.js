const url = location.origin

document.addEventListener('DOMContentLoaded', (event) => {
    // const url = document.location.href;
    const divide = document.querySelector('#alltables');
    table = createNewTable()
    divide.appendChild(table)
    forPageOnload(url, 0, 10);
    const search = document.querySelector('#searching');
    search.addEventListener('click', generateData);
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
    table.style = 'width: 100%, border-collapse: collapse;';
    const head = document.createElement('thead');
    head.style = 'padding: 1em; border: 1px solid #ddd;'
    if (mediaQuery.matches) {
        table.style = 'font-size: 0.8em;'
        head.style = 'padding: 0.5em;'
    }
    const headRow = document.createElement('tr')
    headRow.style = ' background-color: #f0f0f0;';
    const tableAttr = ['name', 'type', 'Level', 'size', 'Link'];
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

function deleteTableAttributes() {
    const table = document.querySelector('bookTable');
    table.delete()
}

function createRows(val, ele) {
    const mediaQuery = window.matchMedia('(max-width:600px)');
    element = document.createElement(ele);
    newRow = document.createElement('td');
    newRow.style = 'text-align: center; padding: 1em;'
    if (mediaQuery.matches) {
        newRow.style = 'padding: 0.5em;';
    }
    element.textContent = val.toUpperCase();
    newRow.appendChild(element);
    return newRow
}

function forPageOnload(hostname, offset, limit) {
    console.log(hostname);
    const table = document.querySelector(".booktable");
    const newButton = createNumbering([limit, offset]);
    fetch(`${hostname}/firsttime`, {
        method: 'GET',
        headers: {
            'limit': limit, 'offset': offset,
            "Content-Type": "application/json"
        }
    }).then(response => {
        if (response.ok) {
            console.log(response.status, response.body)
            return response.json()
        }
        throw new Error(`Http Error! Status: ${response.json()}`);
    }).then(data => {
        data = data.data;
        for (let index = 0; index < data.length; index++) {
            const headRow = document.createElement('tr')
            const element = data[index];
            Object.keys(element).forEach(key => {
                // console.log(element[key])
                if (key != 'e') {
                    const newRow = createRows(element[key], 'p');
                } else {
                    const newRow = createRows('Download', 'a');
                    newRow.firstChild.setAttribute('href', element[key]);
                }
                console.log(newRow);
                headRow.appendChild(newRow);
                table.appendChild(headRow);
            });
        }
    }).catch(error => {
        console.error(error);
    })
}


function generateData(url, search) {
    for (let index = 0; index < 2; index++) {
        const alltables = document.querySelector('#alltables');
        alltables.childNodes.forEach(node => {
            alltables.removeChild(node);
        })

    }
    const divide = document.querySelector('#alltables');
    table = createNewTable()
    divide.appendChild(table)
    // fetch(`${url}/search`, {
    //     method: "POST",
    //     body: JSON.stringify({ value: search }),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         const answer = document.getElementById('answer');
    //         answer.style.display = 'block';
    //         const senti = document.getElementById('sentiment');
    //         senti.style.display = 'block';
    //         document.getElementById("sentiment").innerHTML = `This comment is ${data.answer}`;
    //     })
    //     .catch(error => console.error(error));
}


const createNumbering = (numbering) => {
}

