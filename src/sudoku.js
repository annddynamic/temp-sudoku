
const Sudoku = (function () {


    const GRIDSIZE=9;
    let board=[]
    let unSolvedBoard=[]

      
    function newGame(difficulty){

        board = [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
        ]

        fillDiagonal(board)

        solveBoard(board)
        
        for (var i = 0; i < board.length; i++){
            unSolvedBoard[i] = board[i].slice();
        }
          
          
        removeKDigits(difficulty, unSolvedBoard)
        
        for(let i=0; i<9; i++){
            for(let j=0; j<9; j++){
                if(unSolvedBoard[i][j]===0){
                    unSolvedBoard[i][j]=null
                }
            }
        }

    }

    function getSolvedBoard(){
        return board
    }

    function getUnsolvedBoard(){
        return unSolvedBoard
    }
   
    function randomNumberGenerator(n) {
        return  Math.floor(Math.random()*n+1)
    }

    function unUsedInBox(rowStart, colStart, num, board){
        for(let i =0; i<3; i++){
            for(let j =0; j<3; j++){
                if(board[rowStart+i][colStart+j]===num){
                    return false
                }
            }   
        }
        return true
    }

    function fillBox(row, col, board){
        let num
        for(let i =0; i<3; i++){
            for(let j =0; j<3; j++){
               do{
                  num=randomNumberGenerator(GRIDSIZE)  
               }while(!unUsedInBox(row, col, num, board))

               board[row+i][col+j]= num
            }   
        }
    }

    function fillDiagonal(board){
        for (let i=0; i<9; i+=3){
            fillBox(i,i,board)
        }
    }

    // check ====
    function isNumberInRow(board, number, row){
        for(let i=0; i<GRIDSIZE; i++){
            if(board[row][i]===number){
                return true
            }
        }
        return false
    }

    // check ====
    function isNumberInColumn(board, number, column){
        for(let i=0; i<GRIDSIZE; i++){
            if(board[i][column]===number){
                return true
            }
        }
        return false
    }

    function isNumberInBox(board, number, row, column){
        let localBoxRow = row-row%3
        let localBoxColumn = column-column%3

        for(let i=localBoxRow; i<localBoxRow+3; i++){
            for(let j=localBoxColumn; j<localBoxColumn+3; j++){
                if(board[i][j]===number){
                    return true
                }
            }
        }

        return false
    }

    function isValidPlacement(board, number, row, column){
        return  !isNumberInBox(board,number,row,column)&&
                !isNumberInRow(board,number,row) &&
                !isNumberInColumn(board,number,column)
    }

    function solveBoard(board) {
        for (let row = 0; row < GRIDSIZE; row++) {
            for (let column = 0; column < GRIDSIZE; column++) {
                if (board[row][column] == 0) {
                    for (let numberToTry = 1; numberToTry <= GRIDSIZE; numberToTry++) {
                        if (isValidPlacement(board, numberToTry, row, column)) {
                            board[row][column] = numberToTry;
                            if (solveBoard(board)) {
                                return true;
                            }
                            else {
                                board[row][column] = 0;
                            }
                        }
                    }
                    return false;
                }
            }
        }
        return true;
    }

    function removeKDigits(k, board)
    {
        let count = k;
        while (count != 0)
        {
            let cellId = randomNumberGenerator(GRIDSIZE*GRIDSIZE)-1;
 
            // System.out.println(cellId);
            // extract coordinates i  and j
            let i = Math.floor(cellId/GRIDSIZE);
            let j = cellId%9;
            if (j != 0)
                j = j - 1;
 
            // System.out.println(i+" "+j);
            if (board[i][j] != 0)
            {
                count--;
                board[i][j] = 0;
            }
        }
    }

    return {
       newGame,
       getSolvedBoard,
       getUnsolvedBoard
    };
})();

export default Sudoku;
