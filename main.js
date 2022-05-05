'use strict';

const assert = require('assert');
const { Console } = require('console');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  // your code here
  let hints = [];
  let duplicates = [];
  let guessarr = guess.split('')
  let solutionarr = solution.split('')

  guessarr.forEach((guess,index) => {
    if (guessarr === solutionarr) {
          hints.push('full');
          duplicates.push(guess);
    }
  }) 
  
 
  guessarr.forEach((guess,index) => {
      if (!duplicates.includes(guess) && solution.includes(guess)) {
        hints.push("half");
      }
  })
   console.log(hints)
  return hints;
}

const mastermind = (guess) => {
 solution = 'abcd'; // Comment this out to generate a random solution
  // your code here
   let attempts = 0;


  if (guess === solution) {
    console.log('You guessed it!')
  } else{
    generateHint(guess);
    attempts += 1;
      if ( attempts >= 10) {
         console.log ("sorry game over");
       return;
      }
      
    }
console.log (attempts);
}


const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}