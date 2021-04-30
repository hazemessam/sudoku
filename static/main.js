const solveBtn = document.querySelector('button.solve');
const resetBtn = document.querySelector('button.reset');
let numbersMatrix = new Array(9);

for (let row = 0; row < 9; row++)
    numbersMatrix[row] = new Array(9);

// Fetch input from table to the memory
const fetchInput = () => {
    for (let row = 0; row < 9; row++)
        for (let col = 0; col < 9; col++) {
            const el = document.querySelector(`#row-${row} #col-${col}`);
            if (el.textContent != '') {
                numbersMatrix[row][col] = parseInt(el.textContent);
                el.style.backgroundColor = '#eee';
            } else numbersMatrix[row][col] = null;
        }
}

// Send the matrix to the backend and get the solved matrix to the memory
const solvePuzzle = async () => {
    const apiUrl = 'http://localhost:5000/solve';
    const payload = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({matrix: numbersMatrix})
    }
    const res = await fetch(apiUrl, payload);
    const data = await res.json();
    try {
        const solvedMatrix = data.matrix;
        for (let row = 0; row < 9; row++)
            for (let col = 0; col < 9; col++)
                numbersMatrix[row][col] = solvedMatrix[row][col];
    } catch (err) {
        console.log(err);
    }
}

// Copy the matrix from the memory to the table
const showOutput = () => {
    for (let row = 0; row < 9; row++)
        for (let col = 0; col < 9; col++) {
            const el = document.querySelector(`#row-${row} #col-${col}`);
            el.innerText = numbersMatrix[row][col];
        }
}


solveBtn.addEventListener('click', async (e) => {
    fetchInput();
    await solvePuzzle();
    showOutput();
    e.target.disabled = true;
    console.log(numbersMatrix);
});

resetBtn.addEventListener('click', (e) => {
    location.reload()
});
