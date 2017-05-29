// Minesweeper

function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

var grid;
var cols;
var rows;
var w = 20;
var over = false;
var again;
t=0;

var totalbombs = prompt('Сколько бомб?', 10);
var dunno = prompt('Какая ширина?', 10);
var bombsleft = totalbombs

if (totalbombs > dunno*dunno) {
setTimeout('alert("Введи нормально!")', 30);
setTimeout (function() { window.location.reload(); } , 40);
}

window.onload = function() {
  document.getElementById('bombs').innerHTML = "Осталось " + bombsleft + " бомб";
  document.getElementById('timer').innerHTML = 'Ваше время: ' + t + ' сек.';
}


var win = dunno*dunno-totalbombs;
var nucleus = 0;


function setup() {
  createCanvas(dunno*20+1, dunno*20+1);
  cols = floor(width / w);
  rows = floor(height / w);
  grid = make2DArray(cols, rows);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
    }
  }


  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }


  for (var n = 0; n < totalbombs; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];

    options.splice(index, 1);
    grid[i][j].bomb = true;
  }


  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countbombs();
    }
  }

}



function gamewin() {
if (nucleus==win) {
over = true;
setTimeout('alert("You won in " + t + " seconds!")', 30);
setTimeout (function() { var again = confirm("Еще раз?"); if (again==true) { window.location.reload(); } }, 40);
}
 }

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].bomb) {
      grid[i][j].revealed = true;
    }
    }
  }
over = true;
setTimeout('alert("Game over")', 30);
setTimeout (function() { var again = confirm("Еще раз?"); if (again==true) { window.location.reload(); } }, 40);
//reset();
}


function newgame() {
confirm("Еще раз?");
if (confirm) {
window.location.reload();
}
}



function mousePressed() {
if (mouseButton == LEFT) { 
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY) && !grid[i][j].flagged) {
        grid[i][j].reveal();
        
        

        if (grid[i][j].bomb) {
          gameOver();
        }

      }
    }
  }
}
if (mouseButton == RIGHT) { 
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)) {
	grid[i][j].flag();

      }
    }
  }
}
}

function start_timer()
    {
    if (over !== true) {
    document.getElementById('timer').innerHTML = 'Ваше время: ' + t + ' сек.';
    t++;
    setTimeout("start_timer()", 1000);  
}        
}

function bombs_count()
    {
    document.getElementById('bombs').innerHTML = 'Осталось ' + bombsleft + ' бомб';       
}

function draw() {
  background(255);
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}