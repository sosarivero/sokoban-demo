const level = `
###################
#####   ###########
#####$  ###########
#####  $###########
###  $ $ ##########
### # ## ##########
#   # ## #####  ..#
# $  $          ..#
##### ### #@##  ..#
#####     #########
###################
`;

const VALIDKEYS = ["w", "a", "s", "d"];

const grid = level.split("\n").map((row) => row.split(""));

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
      switch (cell) {
        case "@":
          htmlCell.classList.add("player");
          break;
        case " ":
          htmlCell.classList.add("floor");
          break;
        case "$":
          htmlCell.classList.add("box");
          break;
        case ".":
          htmlCell.classList.add("goal");
          break;
        case "#":
          htmlCell.classList.add("wall");
          break;
        case "*":
          htmlCell.classList.add("box-on-goal");
          break;
        case "+":
          htmlCell.classList.add("player-on-goal");
          break;
      }
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
  // Checks if the grid is solved
  checkIfSolved(grid);
}

function findPlayer(grid) {
  let playerX, playerY;

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (isPlayer(grid[y][x])) {
        playerY = y;
        playerX = x;
        break;
      }
    }
  }

  return {
    y: playerY,
    x: playerX,
    above: grid[playerY - 1][playerX],
    right: grid[playerY][playerX + 1],
    below: grid[playerY + 1][playerX],
    left: grid[playerY][playerX - 1],
  };
}

function getBoxPos(playerPos, direction) {
  let boxX = playerPos.x;
  let boxY = playerPos.y;

  switch (direction) {
    case "up":
      boxY--;
      break;
    case "down":
      boxY++;
      break;
    case "right":
      boxX++;
      break;
    case "left":
      boxX--;
      break;
  }

  return {
    y: boxY,
    x: boxX,
    above: grid[boxY - 1][boxX],
    below: grid[boxY + 1][boxX],
    right: grid[boxY][boxX + 1],
    left: grid[boxY][boxX - 1],
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
    case "d":
      if (isMovable(playerPos.right)) {
        newPlayerX++;
      } else if (isBox(playerPos.right)) {
        return push("right", playerPos, grid);
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

function checkIfSolved(grid) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === "$") {
        return false;
      }
    }
  }
  console.log("CLEAR!");
  return true;
}

draw(grid);
