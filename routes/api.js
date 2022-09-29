'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      const { puzzle, coordinate, value } = req.body;  
      
      let checkedPlacement = solver.checkPlacement(puzzle, coordinate, value); 
     
      if(checkedPlacement != true) {
        return res.json(checkedPlacement);
      } 
      const row = coordinate.split("")[0];
      const column = coordinate.split("")[1];
      let checkedRow = solver.checkRowPlacement(puzzle, row, column, value);
      let checkedColumn = solver.checkColPlacement(puzzle, row, column, value);
      let checkedRegion = solver.checkRegionPlacement(puzzle, row, column, value);
      let conflits = [];
    
      if(checkedRow && checkedColumn && checkedRegion) {        
        return res.json({ valid: true });      
      } else {            
        if(!checkedRow){
          conflits.push("row");
        } 
        if(!checkedColumn){
          conflits.push("column");
        }
        if(!checkedRegion){
          conflits.push("region");
        }
        
        return res.json({ valid: false, conflict: conflits });      
      }         
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      let isValidPuzzle = solver.validate(puzzle);
      if(isValidPuzzle!= true) {
        res.json(isValidPuzzle);
        return;
      }
      
      let solveString = solver.solve(puzzle);
      console.log(solveString);
      if(!solveString) {
        res.json({ error: "Puzzle cannot be solved" });
        return;
      } else {
        res.json({ solution: solveString });
        return;
      }      
    });
};
