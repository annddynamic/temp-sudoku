import logo from "./logo.svg";
import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import Sudoku, { randomGenerator } from "./sudoku";

function App() {
  const [cords, setCords] = useState([]);

  useEffect(() => {
    Sudoku.newGame();
    setBoard(Sudoku.getSolvedBoard());
    setMatrix(Sudoku.getUnsolvedBoard());
    setLifes(5);
  }, []);

  const [matrix, setMatrix] = useState([]);
  const [board, setBoard] = useState([]);
  const [lifes, setLifes] = useState();

  // // console.log(matrix);
  // let cords =[]
  const select = (a, b) => {
    console.log(a, b);
    setCords([a, b]);
  };

  console.log(board, matrix);
  const appendToSolvedSudoku = (a, b, number) => {
    let newState = [];
    for (let i = 0; i < matrix.length; i++) {
      if (i === a) {
        for (let j = 0; j < matrix.length; j++) {
          if (j === b) {
            matrix[i][j] = number;
          }
        }
      }
      newState.push(matrix[i]);
    }
    setMatrix(newState);
  };


  function arraysAreIdentical(arr1, arr2) {
    for (var x = 0; x < arr1.length; x++) {
      //Iterate through all elements in second array
      for (var y = 0; y < arr2.length; y++) {
       
        if (arr1[x][0] == arr2[y][0] && arr1[x][1] == arr2[y][1]) {
          console.log("Bac u kry!")
          // setShow(true)
          // setError("Mut e ki bo");
        }
      }
    }
  }
  // initialize numbers array
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  const nita = (number) => {
    console.log(typeof cords, cords);
    //check lifes
    // check if cordinates are set
    if (cords.length === 2) {
      // check if correct
      if (board[cords[0]][cords[1]] === number) {
        appendToSolvedSudoku(cords[0], cords[1], number);
        if (arraysAreIdentical(matrix, board)) {
          console.log("AAAAAAA");
        }
      } else {
        // tell user wrong answer
        if (lifes > 1) {
          setLifes((prevState) => prevState - 1);
          return;
        }
        // game over
        console.log("e hupe lojen");
        setShow(true)
        setError("Mut e ki bo");
        
        // start new game
      
      }
    } else {
      // tell user to select box
     
    }
  };
  const newGame = ( ) => {
    Sudoku.newGame();
    setBoard(Sudoku.getSolvedBoard());
    setMatrix(Sudoku.getUnsolvedBoard());
    setLifes(5);
  }

  const [show, setShow] = useState(false);
	const [error, setError] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <button>Reset</button>
        </div>
      </header>
      <Container>
        <div>Lifes left: {lifes} out of 5</div>
        <Row className="p-5 ">
          <Col>
            <Row
              style={{ cursor: "pointer", border: "1px solid #61dafb" }}
              xs={1}
              md={9}
            >
              {matrix.map((row, i) => {
                return (
                  <Col key={i}>
                    <Row md={9}>
                      {row.map((column, j) => {
                        return (
                          <Col
                            onClick={() => select(i, j)}
                            key={j}
                            className={`${
                              cords[0] === i && cords[1] === j
                                ? "clicked"
                                : "default"
                            }`}
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
              <Button className="form-control" onClick={newGame}>New Game</Button>
              <Row md={3}>
                {numbers.map((number) => {
                  return (
                    <Col
                      onClick={() => nita(number)}
                      key={number}
                      className="moves"
                    >
                      {number}
                    </Col>
                  );
                })}
              </Row>
              <Alert show={show} variant="danger">
                <Alert.Heading>{error}</Alert.Heading>
              </Alert>     
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
