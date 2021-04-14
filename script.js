'use strict';
//First window -- name and modal window//
const playerName = prompt('Please enter your name');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

document.querySelector('.modalH1').textContent = `Hi ${playerName}`;

//close modal function
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//clickable items(close button, overlay and escape button) for closing modal window
document.querySelector('.btn--close').addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key == 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Main game functionability//
//Initialization of array
let mat = Array(9)
  .fill()
  .map(() => Array(9).fill(0));

const solveBtn = document.querySelector('.btn--solve');
const resetBtn = document.querySelector('.btn--reset');
const input = document.querySelectorAll('input');

//recursion and backtracking to solve sudoku
function canPlace(mat, i, j, n, num) {
  //row and column check
  for (let x = 0; x < n; x++) {
    if (mat[x][j] == num || mat[i][x] == num) {
      return false;
    }
  }
  let rn = Math.sqrt(n);
  let sx = Math.floor(i / rn) * rn;
  let sy = Math.floor(j / rn) * rn;
  //box check
  for (let x = sx; x < sx + rn; x++) {
    for (let y = sy; y < sy + rn; y++) {
      if (mat[x][y] == num) {
        return false;
      }
    }
  }
  return true;
}
function solve(mat, i, j, n) {
  //base case
  if (i == n) {
    //print or store
    for (let q = 0; q < n; q++) {
      for (let r = 0; r < n; r++) {
        document.querySelector(`.box--${q}${r}`).value = mat[q][r];
      }
      //console.log(...mat[q]);
    }
    return true;
  }
  //case row end
  if (j == n) {
    return solve(mat, i + 1, 0, n);
  }
  //skip the pre-filled cells
  if (mat[i][j] != 0) {
    return solve(mat, i, j + 1, n);
  }
  //recursive case
  //fill the current cells with postive options
  for (let num = 1; num <= n; num++) {
    if (canPlace(mat, i, j, n, num)) {
      mat[i][j] = num;
      let CouldbeSolve = solve(mat, i, j + 1, n);
      if (CouldbeSolve) {
        return true;
      }
    }
  }
  mat[i][j] = 0;
  return false;
}
function canPlaceInitialCheck(mat, i, j, n, num) {
  //row and column check
  for (let x = 0; x < n; x++) {
    if (x != i && x != j && (mat[x][j] == num || mat[i][x] == num)) {
      return false;
    }
  }
  let rn = Math.sqrt(n);
  let sx = Math.floor(i / rn) * rn;
  let sy = Math.floor(j / rn) * rn;
  //box check
  for (let x = sx; x < sx + rn; x++) {
    for (let y = sy; y < sy + rn; y++) {
      if (x != i && y != j && mat[x][y] == num) {
        return false;
      }
    }
  }
  return true;
}
const check = function (mat) {
  let f = 1;
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      let number = mat[i][j];
      if (
        number != 0 &&
        (number < 1 ||
          number > 9 ||
          !canPlaceInitialCheck(mat, i, j, 9, number))
      ) {
        f = 0;
        document.querySelector(`.box--${i}${j}`).style.color =
          'rgb(251, 255, 10)';
      }
    }
  }
  if (f) {
    return true;
  } else {
    return false;
  }
};

//solve button
let s = 1;
solveBtn.addEventListener('click', function () {
  if (s) {
    //change input text color back to normal
    for (let i = 0; i < input.length; i++) {
      input[i].style.color = '#eee';
    }
    //getting input from users
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        let number = Number(document.querySelector(`.box--${i}${j}`).value);
        mat[i][j] = number;
      }
    }
    if (check(mat)) {
      //coloring the border of user inputs
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (mat[i][j] != 0) {
            document.querySelector(`.box--${i}${j}`).style.border =
              '6px solid #c7365f';
          }
        }
      }
      solve(mat, 0, 0, 9);
      s = 0;
    } else {
      alert(`Wrong INPUT!! (yellow highlighted text)
Please enter a number between 1 and 9
                  Or
There already exist a same number in row or column or 3x3 respected matrix
`);
    }
  }
});

//reset button
resetBtn.addEventListener('click', function () {
  //array initialized to 0
  mat = Array(9)
    .fill()
    .map(() => Array(9).fill(0));

  //input fields and border back to normal
  for (let i = 0; i < input.length; i++) {
    input[i].value = '';
    input[i].style.border = '4px solid #eee';
  }

  s = 1;
});

//themes button
const theme1 = document.querySelector('.btn--theme00');
const theme2 = document.querySelector('.btn--theme01');
const themeDefault = document.querySelector('.btn--theme02');
const body = document.querySelector('body');
const main = document.querySelector('main');
const header = document.querySelector('.headerH1');

//theme1
theme1.addEventListener('click', function () {
  body.style.backgroundImage = `url('bg2.jpg')`;
  main.style.backgroundColor = 'rgba(27, 27, 27, 0.89)';
  header.style['-webkit-text-stroke'] = '0.1mm black';
  main.style.boxShadow = '0 3rem 5rem rgba(0, 0, 0, 0.637)';
});
//theme2
theme2.addEventListener('click', function () {
  body.style.backgroundImage =
    'linear-gradient(to top left, #753682 0%, #bf2e34 100%)';
  header.style['-webkit-text-stroke'] = '';
  main.style.backgroundColor = 'rgba(27, 27, 27, 0.212)';
  main.style.boxShadow = '0 3rem 5rem rgba(0, 0, 0, 0.25)';
});
//theme default
themeDefault.addEventListener('click', function () {
  body.style.backgroundImage = `url('bg.jpg')`;
  main.style.backgroundColor = 'rgba(27, 27, 27, 0.35)';
  header.style['-webkit-text-stroke'] = '';
  main.style.boxShadow = '0 3rem 5rem rgba(255, 0, 0, 0.25)';
});
