import logo from "./logo.svg";
import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sudoku, { randomGenerator } from "./sudoku";

function App() {

  const [cords, setCords] = useState([])




  // let board = [
  //   [0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0],
  //   [0,0,0,0,0,0,0,0,0],
  // ]


  // Sudoku.fillDiagonal(board)
  // Sudoku.solveBoard(board)

  // var solvedSudoku = [];

  // for (var i = 0; i < board.length; i++)
  //     solvedSudoku[i] = board[i].slice();
  
  
  // Sudoku.removeKDigits(30, solvedSudoku)
  // console.log(board)

  // for(let i=0; i<9; i++){
  //   for(let j=0; j<9; j++){
  //     if(solvedSudoku[i][j]===0){
  //       solvedSudoku[i][j]=null
  //     }
  //   }
  // }
  useEffect(()=>{
    // console.log("useeffect")
    let arr =Sudoku.newGame()

    setBoard(arr[0])
    setMatrix(arr[1])
  },[])

  const [matrix, setMatrix]= useState([])
  const [board, setBoard]= useState([])
  console.log(matrix, board)
 
  // // console.log(matrix);
  // let cords =[]
  const select = (a , b) => {
    console.log(a,b)
    setCords([a,b])
    // setSelectedCell([a,b])
    // clearPreviousSelectedCell()
    // selectCell(a,b)
  };

  // const clearPreviousSelectedCell = ()=>{
  //   let newState=[]
  //   for(let i=0; i<matrix.length; i++){
  //     for(let j=0; j<matrix.length; j++){
  //       if(matrix[i][j].isClicked){
  //         matrix[i][j].isClicked=!matrix[i][j].isClicked
  //       }
  //     }
  //     newState.push(matrix[i])
  //   }
  //   setMatrix(newState)
  // }

  const appendToSolvedSudoku= (a, b, number)=>{

    let newState=[]
    for(let i=0; i<matrix.length; i++){
      if(i===a){
        for(let j=0; j<matrix.length; j++){
          if(j ===b){
            matrix[i][j]=number          }
        }
      }
      newState.push(matrix[i])
    }
    setMatrix(newState)
  }


  // initialize numbers array
  const[numbers, setNumbers]= useState(
    [1,2,3,4,5,6,7,8,9]
  )

  const nita = (number)=>{
    console.log(typeof cords, cords)
    // check if cordinates are set
    if( cords.length === 2){
      // check if correct
      if(board[cords[0]][cords[1]]===number){
        
        appendToSolvedSudoku(cords[0], cords[1], number)
      }else{
        // tell user wrong answer
        console.log('ba')
      }
    }else{
      // tell user to select box
      console.log('gabim')
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <button>Reset</button>
        </div>
      </header>
      <Container>
        <Row className="p-5 ">
          <Col>
            <Row style={{ cursor: "pointer", border:"1px solid #61dafb" }} xs={1} md={9}>
              {matrix.map((row, i) => {
                return (
                  <Col  key={i}>
                    <Row  md={9}>
                      {row.map((column, j) => {
                        return (
                          <Col
                            onClick={() => select(i, j)}
                            key={j}
                            className={`${ cords[0] ===i  && cords[1]===j? "clicked" : "default"}`}
                          >
                            {column}
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col>
              <Container>
                <Button className="form-control">New Game</Button>
                <Row md={3}>
                  {numbers.map((number)=>{
                    return(
                      <Col onClick={()=>nita(number)} key={number} className="moves">
                        {number}
                      </Col>
                    )
                  })}
                </Row>
              </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
