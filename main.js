const level = "#######|#     #|#     #|# @$. #|#     #|#     #|#######";

const grid = level.split("|").map((row) => row.split(""));
console.log(grid);

function draw(grid) {
  const htmlGrid = document.createElement("div");
  htmlGrid.id = "sokobanScreen";
  for (row of grid) {
    const htmlRow = document.createElement("div");
    htmlRow.classList.add("row");
    for (cell of row) {
      const htmlCell = document.createElement("div");
      htmlCell.textContent = cell;
      htmlCell.classList.add("cell");
      htmlRow.appendChild(htmlCell);
    }
    htmlGrid.appendChild(htmlRow);
  }
  document.body.appendChild(htmlGrid);
}

function findPlayer(grid) {
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    if (row.includes("@")) {
      const x = row.indexOf("@");
      console.log(y);
      return [y, x];
    }
  }
  // If player not found, return null
  return null;
}

draw(grid);
const x = findPlayer(grid);
console.log(x);
