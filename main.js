const level = "#######|#     #|#     #|# @$. #|#     #|#     #|#######";

const VALIDKEYS = ["w", "a", "s", "d"];

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
  let x, y;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (isPlayer(grid[i][j])) {
        y = i;
        x = j;
        break;
      }
    }
  }

  return {
    y,
    x,
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
    x,
    y,
    above: grid[y - 1][x],
    right: grid[y][x + 1],
    below: grid[y + 1][x],
    left: grid[y][x - 1],
  };
}

function move(direction, grid) {
  const key = direction.key;
  playerPos = findPlayer(grid);

  const { y: playerY, x: playerX } = playerPos;

  let newPlayerY = playerY;
  let newPlayerX = playerX;

  switch (key) {
    case "w":
      if (isMovable(playerPos.above)) {
        newPlayerY--;
      } else if (isBox(playerPos.above)) {
        return push("up", playerPos, grid);
      } else {
        return;
      }
      break;
    case "s":
      if (isMovable(playerPos.below)) {
        newPlayerY++;
      } else if (isBox(playerPos.below)) {
        return push("down", playerPos, grid);
      } else {
        return;
      }
      break;
    case "a":
      if (isMovable(playerPos.left)) {
        newPlayerX--;
      } else if (isBox(playerPos.left)) {
        return push("left", playerPos, grid);
      } else {
        return;
      }
      break;
    case "d":
      if (isMovable(playerPos.right)) {
        newPlayerX++;
      } else if (isBox(playerPos.right)) {
        return push("right", playerPos, grid);
      } else {
        return;
      }
      break;
  }

  // Update the grid
  // Moves player to where the box was
  grid[newPlayerY][newPlayerX] = isGoal(grid[newPlayerY][newPlayerX])
    ? "+"
    : "@";
  // Empties the space left behind
  grid[playerY][playerX] = isGoal(grid[playerY][playerX]) ? "." : " ";

  redraw(grid);
}

function push(direction, playerPos, grid) {
  const boxPos = getBoxPos(playerPos, direction);
  const { y: boxY, x: boxX } = boxPos;

  let newBoxY = boxY;
  let newBoxX = boxX;

  switch (direction) {
    case "up":
      if (isMovable(boxPos.above)) {
        newBoxY--;
      } else {
        return;
      }
      break;
    case "down":
      if (isMovable(boxPos.below)) {
        newBoxY++;
      } else {
        return;
      }
      break;
    case "left":
      if (isMovable(boxPos.left)) {
        newBoxX--;
      } else {
        return;
      }
      break;
    case "right":
      if (isMovable(boxPos.right)) {
        newBoxX++;
      } else {
        return;
      }
      break;
  }

  // Update the grid
  // Moves player to where the box was
  grid[boxY][boxX] = isGoal(grid[boxY][boxX]) ? "+" : "@";
  // Moves box to its new destination
  grid[newBoxY][newBoxX] = isGoal(grid[newBoxY][newBoxX]) ? "*" : "$";
  // Empties the space left behind
  grid[playerPos.y][playerPos.x] = isGoal(grid[playerPos.y][playerPos.x])
    ? "."
    : " ";

  redraw(grid);
}

function isGoal(cell) {
  return cell === "." || cell === "+" || cell === "*";
}

function isMovable(cell) {
  return cell === " " || cell === ".";
}

function isBox(cell) {
  return cell === "$" || cell === "*";
}

function isPlayer(cell) {
  return cell === "@" || cell === "+";
}

window.addEventListener("keydown", (e) => {
  if (VALIDKEYS.includes(e.key)) {
    move(e, grid);
  }
});

draw(grid);
