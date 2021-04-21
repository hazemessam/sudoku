const solveBtn = document.querySelector('button.solve');
const resetBtn = document.querySelector('button.reset');
let numbersMatrix = new Array(9);

for (let row = 0; row < 9; row++)
    numbersMatrix[row] = new Array(9);

// Fetch input from table to the memory
const fetchInput = () => {
    for (let row = 0; row < 9; row++)
        for (let col = 0; col < 9; col++) {
            el = document.querySelector(`#row-${row} #col-${col}`);
            numbersMatrix[row][col] = parseInt(el.innerText);
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
        numbersMatrix = solvedMatrix;
    } catch (err) {
        console.log(err);
    }
}

// Copy the matrix from the memory to the table
const showOutput = () => {
    for (let row = 0; row < 9; row++)
        for (let col = 0; col < 9; col++) {
            el = document.querySelector(`#row-${row} #col-${col}`);
            el.innerText = numbersMatrix[row][col];
        }
}


solveBtn.addEventListener('click', (e) => {
    fetchInput();
    // solvePuzzle();
    // showOutput();
    console.log(numbersMatrix);
});

// TODO
resetBtn.addEventListener('click', (e) => {

});