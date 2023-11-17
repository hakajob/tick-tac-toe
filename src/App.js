import React, { useState, useEffect } from 'react';
import './static/style/main.css';
import Square from './components/Square';

function App() {
  const [squares, setSquares] = useState(Array(9).fill(""));
  const [turn, setTurn] = useState("X");
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const w = checkWinner();
    if (w != null) {
      setWinner(w);
    } else if (checkEndTheGame()) {
      setWinner("Tie");
    }
  // eslint-disable-next-line
  }, [squares])

  const checkEndTheGame = () => {
    for (let square of squares) {
      if (!square) return false;
    }
    return true;
  };

  const checkWinner = () => {
    const combos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combo of combos) {
      const [a, b, c] = combo;
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const updateSquares = (index) => {
    if (winner != null) {
      return;
    }
    setSquares((prev) => prev.map((el, i) => (i !== index ? el : turn)));
    setTurn(turn === 'X' ? 'O' : 'X');
  }

  const handleReset = () => {
    setSquares((prev) => prev.map(() => { return ""; }));
    setWinner(null);
    setTurn('X');
  }

  return (
    <>
      <div>
        <div className="status">{winner == null ? `Next player: ${turn}` : winner !== "Tie" ? `Winner: ${winner}` : winner}</div>
        <div className="board">
          {squares.map((square, index) =>
            <Square key={index} squareIndex={index} updateSquares={updateSquares} squareClassName={square} />
          )}
        </div>
        <button className="reset" onClick={() => handleReset()}>Reset</button>
      </div>
    </>
  )
}
export default App