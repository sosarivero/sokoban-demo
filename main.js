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
  const y = grid.findIndex((row) => row.includes("@") || row.includes("+"));
  const x = grid[y].includes("@") ? grid[y].indexOf("@") : grid[y].indexOf("+");

  return {
    x,
    y,
    above: grid[y - 1][x],
    right: grid[y][x + 1],
    below: grid[y + 1][x],
    left: grid[y][x - 1],
  };
}

function move(direction, grid) {
  const playerPos = findPlayer(grid);
  let playerY = playerPos.y;
  let playerX = playerPos.x;
  const key = direction.key;

  switch (key) {
    case "w":
      if (playerPos.above === " ") {
        grid[playerY][playerX] = " ";
        grid[playerY - 1][playerX] = "@";
      }
      break;
    case "s":
      if (playerPos.below === " ") {
        grid[playerY][playerX] = " ";
        grid[playerY + 1][playerX] = "@";
      }
      break;
    case "a":
      if (playerPos.left === " ") {
        grid[playerY][playerX] = " ";
        grid[playerY][playerX - 1] = "@";
      }
      break;
    case "d":
      if (playerPos.right === " ") {
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
