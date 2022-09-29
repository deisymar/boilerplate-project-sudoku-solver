const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();;

suite('Unit Tests', () => {
  let puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
  test('Logic handles a valid puzzle string of 81 characters', (done) => {
    assert.equal(solver.validate(puzzleString), true);
    done();
  })
  
  test('Logic handles a puzzle string with invalid characters (not 1-9 or .)', (done) => {
    let invalidPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..i.47...8..1..16....926914.37.'
    assert.equal(solver.validate(invalidPuzzle).error, 'Invalid characters in puzzle');
    done();
  })

  test('Logic handles a puzzle string that is not 81 characters in length', (done) => {
    let invalidPuzzle = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.3.'
    assert.equal(solver.validate(invalidPuzzle).error, 'Expected puzzle to be 81 characters long');
    done();
  })

  test('Logic handles a valid row placement', (done) => {
    let row = 'A'
    let col = 1
    let value = 3
    assert.equal(solver.checkRowPlacement(puzzleString, row, col, value), true)
    done();
  })

  test('Logic handles an invalid row placement', (done) => {
    let row = 'a'
    let col = 2
    let value = 1
    assert.equal(solver.checkRowPlacement(puzzleString, row, col, value), false)
    done();
  })

  test('Logic handles a valid column placement', (done) => {
    let row = 'd'
    let col = 1
    let value = 5
    assert.equal(solver.checkColPlacement(puzzleString, row, col, value), true)
    done();
  })

  test('Logic handles an invalid column placement', (done) => {
    let row = 'c'
    let col = 1
    let value = 1
    assert.equal(solver.checkColPlacement(puzzleString, row, col, value), false)
    done();
  })

  test('Logic handles a valid region (3x3 grid) placement', (done) => {    
    let row = 'A'
    let col = 1
    let value = 3
    assert.equal(solver.checkRegionPlacement(puzzleString, row, col, value), true)
    done();
  })

  test('Logic handles an invalid region (3x3 grid) placement', (done) => {
    let row = 'f'
    let col = 2
    let value = 6
    assert.equal(solver.checkRegionPlacement(puzzleString, row, col, value), false)
    done();
  })

  test('Valid puzzle strings pass the solver', (done) => {
    let solution = '135762984946381257728459613694517832812936745357824196473298561581673429269145378'
    assert.equal(solver.solve(puzzleString), solution)
    done();
  })

  test('Invalid puzzle strings fail the solver', (done) => {
    const invalidPuzzle = '..9..5.1.8434....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..';
    assert.equal(solver.solve(invalidPuzzle),false);
    done();
  })

  test('Solver returns the expected solution for an incomplete puzzle', (done) => {
    let puzzle = '..839.7.575.....964..1.......16.29846.9.312.7..754.....62..5.78.8...3.2...492...1'
    let solution = '218396745753284196496157832531672984649831257827549613962415378185763429374928561'
    assert.equal(solver.solve(puzzle), solution)
    done();
  })

});
