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
    setLifes(5);
    setShow(false);
  }, []);

  const [matrix, setMatrix] = useState([]);
  const [board, setBoard] = useState([]);
  const [numbers, setNumbers] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [cords, setCords] = useState([]);
  const [toFind, setToFind] = useState();
  const [lifes, setLifes] = useState();
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
    //check lifes
    if (lifes !== 0) {
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
            if (lifes > 1) {
              setLifes((prevState) => prevState - 1);
            } else {
              // game over, notify user
              setLifes((prevState) => prevState - 1);
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
    setLifes(5);
    setShow(false);
  }

  function changeDifficulty(difficulty) {
    setCurrentDifficulty(difficulty);
    newGame(difficulty);
    setShow(false);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Lifes left: {lifes} out of 5</h2>
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
        <Alert className="mt-5" show={show} variant={guess}>
          <Alert.Heading>{message}</Alert.Heading>
        </Alert>
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
                            onClick={() => setCords([i, j])}
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
              <Button
                className="form-control "
                onClick={() => newGame(currentDifficulty)}
              >
                New Game
              </Button>
              <Row md={3}>
                {numbers.map((number) => {
                  return (
                    <Col
                      onClick={() => play(number)}
                      key={number}
                      className="moves"
                    >
                      {number}
                    </Col>
                  );
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
