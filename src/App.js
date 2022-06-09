import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Alert, Dropdown } from "react-bootstrap";
import Sudoku from "./sudoku";

function App() {
  /*
  
    ******  DIFFICULTY  ******

    Beginner: Find 30 numbers
    Rookie: Find 45 numbers
    Medium: Find 50 numbers
    Hard: Find 58 numbers
    Legendary: Find 65 numbers
  
  */

  useEffect(() => {
    // Start new Game with beginner difficulty
    Sudoku.newGame(30);
    setBoard(Sudoku.getSolvedBoard());
    setMatrix(Sudoku.getUnsolvedBoard());
    setCurrentDifficulty(30);
    setToFind(30);
    setLives(5);
    setShow(false);
  }, []);

  const [matrix, setMatrix] = useState([]);
  const [board, setBoard] = useState([]);
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [cords, setCords] = useState([]);
  const [toFind, setToFind] = useState();
  const [lives, setLives] = useState();
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [guess, setGuess] = useState("danger");
  const [currentDifficulty, setCurrentDifficulty] = useState();

  function appendToMatrix(row, column, number) {
    let newState = [];
    for (let i = 0; i < matrix.length; i++) {
      if (i === row) {
        for (let j = 0; j < matrix.length; j++) {
          if (j === column) {
            matrix[i][j] = number;
          }
        }
      }
      newState.push(matrix[i]);
    }
    setMatrix(newState);
  }

  function notify(message, guess) {
    setShow(true);
    setMessage(message);
    setGuess(guess);
  }

  function play(number) {
    //check lives
    if (lives !== 0) {
      // check if cordinates are set
      if (cords.length > 0) {
        //check if cell is valid to insert number
        if (matrix[cords[0]][cords[1]] === null) {
          //check if correct
          if (board[cords[0]][cords[1]] === number) {
            // notify user guess correct
            notify("Correct!", "success");

            appendToMatrix(cords[0], cords[1], number);
            setToFind((prevState) => prevState - 1);
            if (toFind === 1) {
              // Game is won, notify user
              notify("Congratulations, you solved the sudoku!", "success");
            }
          } else {
            // tell user wrong answer
            notify("Wrong!", "danger");
            if (lives > 1) {
              setLives((prevState) => prevState - 1);
            } else {
              // game over, notify user
              setLives((prevState) => prevState - 1);
              notify("You lost! Try again!", "danger");
            }
          }
        } else {
          // notify user to select box
          notify("Select an empty box in order to play!", "danger");
        }
      } else {
        // notify user to select empty box
        notify("Select an empty box in order to play!", "danger");
      }
    }
  }

  function newGame(currentDifficulty) {
    Sudoku.newGame(currentDifficulty);
    setToFind(currentDifficulty);
    setBoard(Sudoku.getSolvedBoard());
    setMatrix(Sudoku.getUnsolvedBoard());
    setLives(5);
    setShow(false);
  }

  function changeDifficulty(difficulty) {
    setCurrentDifficulty(difficulty);
    newGame(difficulty);
    setShow(false);
  }

  const onMatrixClick = (i, j) => {
    if (matrix[i][j] !== null) {
      notify("This field is set!", "danger");
      setCords([]);
    } else {
      notify("", "");
      setCords([i, j]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Lives left: {lives} out of 5</h2>
        <div>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Change difficulty
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => changeDifficulty(30)}>
                Beginner
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeDifficulty(45)}>
                Rookie
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeDifficulty(50)}>
                Medium
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeDifficulty(58)}>
                Hard
              </Dropdown.Item>
              <Dropdown.Item onClick={() => changeDifficulty(65)}>
                Legendary
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
      <Container>
        <Row className=" p-5 ">
          <Col className="  pr-5 mr-5 ">
            <Row
              style={{
                cursor: "pointer",
                border: "1px solid cornflowerblue ",
                borderLeft: "2px solid black",
                borderBottom: "2px solid black",
              }}
              xs={1}
              md={9}
            >
              {matrix.map((row, i) => {
                console.log(row, i);
                return (
                  <Col key={i} className={i % 3 === 0 ? "matrixCol" : ""}>
                    <Row md={9} className="">
                      {row.map((column, j) => {
                        return (
                          <Col
                            onClick={() => onMatrixClick(i, j)}
                            key={j}
                            className={
                              cords[0] === i && cords[1] === j
                                ? "clicked matrixRow "
                                : "default matrixRow"
                            }
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
          {/* <Col md={1}></Col> */}
          <Col md={{ span: 5, offset: 2 }}>
            <Container>
              <Button
                className="form-control mb-3"
                onClick={() => newGame(currentDifficulty)}
              >
                New Game
              </Button>

              <Row
                sm={9}
                // className="box"
              >
                {numbers.map((number) => {
                  return (
                    <Col
                      onClick={() => play(number)}
                      key={number}
                      className="moves"
                    >
                      <p className="boxText">{number}</p>
                    </Col>
                  );
                })}
              </Row>
            </Container>
          </Col>
        </Row>
        <Alert className="mt-5" show={show} variant={guess}>
          <Alert.Heading>{message}</Alert.Heading>
        </Alert>
      </Container>
    </div>
  );
}

export default App;
