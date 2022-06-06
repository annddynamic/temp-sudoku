import logo from "./logo.svg";
import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const Ref = useRef(null);

  // // The state for our timer
  const [timer, setTimer] = useState("00:00:00");

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  // const startTimer = (e) => {
  //   let { total, hours, minutes, seconds } = getTimeRemaining(e);
  //   if (total >= 0) {
  //     // update the timer
  //     // check if less than 10 then we need to
  //     // add '0' at the begining of the variable
  //     setTimer(
  //       (hours > 9 ? hours : "0" + hours) +
  //         ":" +
  //         (minutes > 9 ? minutes : "0" + minutes) +
  //         ":" +
  //         (seconds > 9 ? seconds : "0" + seconds)
  //     );
  //   }
  // };

  // const clearTimer = (e) => {
  //   // If you adjust it you should also need to
  //   // adjust the Endtime formula we are about
  //   // to code next
  //   setTimer("00:00:10");

  //   // If you try to remove this line the
  //   // updating of timer Variable will be
  //   // after 1000ms or 1sec
  //   if (Ref.current) clearInterval(Ref.current);
  //   const id = setInterval(() => {
  //     startTimer(e);
  //   }, 1000);
  //   Ref.current = id;
  // };

  // const getDeadTime = () => {
  //   let deadline = new Date();

  //   // This is where you need to adjust if
  //   // you entend to add more time
  //   deadline.setSeconds(deadline.getSeconds() + 10);
  //   return deadline;
  // };

  // useEffect(() => {
  //   clearTimer(getDeadTime());
  // }, []);

  // // Another way to call the clearTimer() to start
  // // the countdown is via action event from the
  // // button first we create function to be called
  // // by the button
  // const onClickReset = () => {
  //   clearTimer(getDeadTime());
  // };

  // const [matrix, setMatrix] = useState(Array(9).fill(Array(9)))
  const [matrix, setMatrix] = useState([
    [
      { v: 0, isClicked: true },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
    ],
    [
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
    ],
    [
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
    ],
    [
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
    ],
    [
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
    ],
    [
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: null, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
    ],
    [
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
    ],
    [
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
    ],
    [
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
      { v: 0, isClicked: false },
    ],
  ]);
  console.log(matrix);

  const select = (a , b) => {
    clearPreviousSelectedCell()
    selectCell(a,b)
  };

  const clearPreviousSelectedCell = ()=>{
    let newState=[]
    for(let i=0; i<matrix.length; i++){
      for(let j=0; j<matrix.length; j++){
        if(matrix[i][j].isClicked){
          matrix[i][j].isClicked=!matrix[i][j].isClicked
        }
      }
      newState.push(matrix[i])
    }
    setMatrix(newState)
  }

  const selectCell= (a, b)=>{
    let newState=[]
    for(let i=0; i<matrix.length; i++){
      if(i===a){
        for(let j=0; j<matrix.length; j++){
          if(j ===b){
            matrix[i][j].isClicked=!matrix[i][j].isClicked
          }
        }
      }
      newState.push(matrix[i])
    }
    setMatrix(newState)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <button>Reset</button>
          <span>{timer}</span>
        </div>
      </header>
      <Container>
        <Row className="p-5 ">
          <Col>
            <Row style={{ cursor: "pointer" }} xs={1} md={9}>
              {matrix.map((row, i) => {
                return (
                  <Col key={i}>
                    <Row md={9}>
                      {row.map((column, j) => {
                        return (
                          <Col
                            onClick={() => select(i, j)}
                            key={j}
                            className={`andi ${column.isClicked ? "clicked" : ""}`}
                          >
                            {column.v}
                          </Col>
                        );
                      })}
                    </Row>
                  </Col>
                );
              })}
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
