const level = "#######|#     #|#     #|# @$. #|#     #|#     #|#######";

const grid = level.split("|").map((row) => row.split(""));

function draw(grid) {
  const htmlGrid = document.createElement("div");
  htmlGrid.id = "sokobanScreen";
  for (row of grid) {
    // Creates rows
    const htmlRow = document.createElement("div");
    htmlRow.classList.add("row");
    for (cell of row) {
      const htmlCell = document.createElement("div");
      // Attaches the element symbol to the cell div.
      htmlCell.textContent = cell;
      htmlCell.classList.add("cell");
      // Appends the cell to the row
      htmlRow.appendChild(htmlCell);
    }
    // Appends the row to the grid
    htmlGrid.appendChild(htmlRow);
  }
  // Appends the grid to the HTML body
  document.body.appendChild(htmlGrid);
}

function clear() {
  const htmlGrid = document.querySelector("#sokobanScreen");
  document.body.removeChild(htmlGrid);
}

function redraw(newGrid) {
  clear();
  draw(newGrid);
}

function findPlayer(grid) {
  for (let y = 0; y < grid.length; y++) {
    const row = grid[y];
    if (row.includes("@")) {
      const x = row.indexOf("@");
      return [y, x];
    }
  }
  // If player not found, return null
  return null;
}

function move(direction, grid) {
  const playerPos = findPlayer(grid);
  let playerY = playerPos[0];
  let playerX = playerPos[1];

  const key = direction.key;
  switch (key) {
    case "w":
      if (grid[playerY - 1][playerX] === " ") {
        grid[playerY][playerX] = " ";
        grid[playerY - 1][playerX] = "@";
      }
      break;
    case "s":
      if (grid[playerY + 1][playerX] === " ") {
        grid[playerY][playerX] = " ";
        grid[playerY + 1][playerX] = "@";
      }
      break;
    case "a":
      if (grid[playerY][playerX - 1] === " ") {
        grid[playerY][playerX] = " ";
        grid[playerY][playerX - 1] = "@";
      }
      break;
    case "d":
      if (grid[playerY][playerX + 1] === " ") {
        grid[playerY][playerX] = " ";
        grid[playerY][playerX + 1] = "@";
      }
      break;
  }
  redraw(grid);
}

window.addEventListener("keydown", (e) => {
  move(e, grid);
});

draw(grid);
const x = findPlayer(grid);
