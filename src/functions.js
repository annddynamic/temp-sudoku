
const Sudoku = (function () {
    const GRIDSIZE=9;

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

    return {
       randomNumberGenerator,
    };
})();

export default Sudoku;
