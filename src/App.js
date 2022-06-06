import logo from "./logo.svg";
import "./App.css";
import React, { useState, useRef, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const Ref = useRef(null);

  // The state for our timer
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

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      // update the timer
      // check if less than 10 then we need to
      // add '0' at the begining of the variable
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    }
  };

  const clearTimer = (e) => {
    // If you adjust it you should also need to
    // adjust the Endtime formula we are about
    // to code next
    setTimer("00:00:10");

    // If you try to remove this line the
    // updating of timer Variable will be
    // after 1000ms or 1sec
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    // This is where you need to adjust if
    // you entend to add more time
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  // Another way to call the clearTimer() to start
  // the countdown is via action event from the
  // button first we create function to be called
  // by the button
  const onClickReset = () => {
    clearTimer(getDeadTime());
  };


  // const [matrix, setMatrix] = useState(Array(9).fill(Array(9)))
  const [matrix, setMatrix] = useState(
    [
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0]
    ]
  )
  console.log(matrix)
  
  const andi =(s)=>{
    console.log(s)
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <button onClick={onClickReset}>Reset</button>
          <span>{timer}</span>
        </div>
      </header>
      <Container>
        <Row className="p-5 ">
          <Col>
            <Row xs={1} md={3}>
              {matrix.map((array, index)=>{
                return (
                  <Col key={index} onClick={(()=>andi(index))}>
                    <Row md={3}>
                      {array.map((subarray, subindex)=>{
                        return(
                          <Col key={subindex} className="andi">{subarray}</Col>
                        )
                      })}
                    </Row>
                  </Col>
                )
              })}
              {/* <Col>
                <Row md={3}>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                </Row>
              </Col>
              <Col>
                <Row md={3}>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                </Row>
              </Col>
              <Col>
                <Row md={3}>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                </Row>
              </Col>
              <Col>
                <Row md={3}>
                  <Col className=" andi">1</Col>
                  <Col className=" andi">1</Col>
                  <Col className=" andi">1</Col>
                  <Col className=" andi">1</Col>
                  <Col className=" andi">1</Col>
                  <Col className=" andi">1</Col>
                  <Col className=" andi">1</Col>
                  <Col className=" andi">1</Col>
                  <Col className=" andi">1</Col>
                </Row>
              </Col>
              <Col>
                <Row md={3}>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                </Row>
              </Col>
              <Col>
                <Row md={3}>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                </Row>
              </Col>
              <Col>
                <Row md={3}>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                </Row>
              </Col>
              <Col>
                <Row md={3}>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                </Row>
              </Col>
              <Col>
                <Row md={3}>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                  <Col className="andi">1</Col>
                </Row>
              </Col> */}
            </Row>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
