const puzzle = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
];

function generateSudoku() {
  const container = document.getElementById("sudoku");
  container.innerHTML = "";

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const input = document.createElement("input");
      input.maxLength = 1;

      if (puzzle[row][col] !== 0) {
        input.value = puzzle[row][col];
        input.disabled = true;
        input.classList.add("fixed");
      }

      input.dataset.row = row;
      input.dataset.col = col;

      input.addEventListener("input", () => {
        if (!/^[1-9]$/.test(input.value)) {
          input.value = "";
        }
      });

      container.appendChild(input);
    }
  }
}

function checkSudoku() {
  const inputs = document.querySelectorAll("#sudoku input");
  inputs.forEach(input => input.classList.remove("error"));

  let grid = [];

  for (let i = 0; i < 9; i++) {
    grid[i] = [];
    for (let j = 0; j < 9; j++) {
      const index = i * 9 + j;
      grid[i][j] = parseInt(inputs[index].value) || 0;
    }
  }

  // checar linhas e colunas
  for (let i = 0; i < 9; i++) {
    let rowSet = new Set();
    let colSet = new Set();

    for (let j = 0; j < 9; j++) {
      let rowVal = grid[i][j];
      let colVal = grid[j][i];

      if (rowVal && rowSet.has(rowVal)) {
        markError(i, j);
      }
      rowSet.add(rowVal);

      if (colVal && colSet.has(colVal)) {
        markError(j, i);
      }
      colSet.add(colVal);
    }
  }
}

function markError(row, col) {
  const index = row * 9 + col;
  document.querySelectorAll("#sudoku input")[index].classList.add("error");
}

generateSudoku();
