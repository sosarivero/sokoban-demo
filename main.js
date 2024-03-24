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

draw(grid);
