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

function getBoxPos(playerPos, direction) {
  let x, y;
  switch (direction) {
    case "up":
      y = playerPos.y - 1;
      x = playerPos.x;
      break;
    case "right":
      y = playerPos.y;
      x = playerPos.x + 1;
      break;
    case "down":
      y = playerPos.y + 1;
      x = playerPos.x;
      break;
    case "left":
      y = playerPos.y;
      x = playerPos.x - 1;
      break;
  }

  return {
    y,
    x,
    above: grid[y - 1][x],
    right: grid[y][x + 1],
    below: grid[y + 1][x],
    left: grid[y][x - 1],
  }
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
      } else if (playerPos.above === "$") {
        push("up", playerPos, grid);
      }
      break;
    case "s":
      if (playerPos.below === " ") {
        grid[playerY][playerX] = " ";
        grid[playerY + 1][playerX] = "@";
      } else if (playerPos.below === "$") {
        push("down", playerPos, grid);
      }
      break;
    case "a":
      if (playerPos.left === " ") {
        grid[playerY][playerX] = " ";
        grid[playerY][playerX - 1] = "@";
      } else if (playerPos.left === "$") {
        push("left", playerPos, grid);
      }
      break;
    case "d":
      if (playerPos.right === " ") {
        grid[playerY][playerX] = " ";
        grid[playerY][playerX + 1] = "@";
      } else if (playerPos.right === "$") {
        push("right", playerPos, grid);
      }
      break;
  }
  redraw(grid);
}

function push(direction, playerPos, grid) {
  const boxPos = getBoxPos(playerPos, direction);
  let boxY = boxPos.y;
  let boxX = boxPos.x;
  switch (direction) {
    case "up":
      if (boxPos.above === " ") {
        grid[boxY][boxX] = "@";
        grid[boxY - 1][boxX] = "$";
        grid[boxY + 1][boxX] = " ";
      }
      break;
    case "down":
      if (boxPos.below === " ") {
        grid[boxY][boxX] = "@";
        grid[boxY + 1][boxX] = "$";
        grid[boxY -1][boxX] = " ";
      }
      break;
    case "left":
      if (boxPos.left === " ") {
        grid[boxY][boxX] = "@";
        grid[boxY][boxX - 1] = "$";
        grid[boxY][boxX + 1] = " ";
      }
      break;
    case "right":
      if (boxPos.right === " ") {
        grid[boxY][boxX] = "@";
        grid[boxY][boxX + 1] = "$";
        grid[boxY][boxX - 1] = " ";
      }
      break;
  }
}

window.addEventListener("keydown", (e) => {
  move(e, grid);
});

draw(grid);
const x = findPlayer(grid);
