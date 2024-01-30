import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
	return (
	  <button className="square" onClick={props.onClick}>
		{props.value}
	  </button>
	);
  }

  class Board extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		squares: Array(9).fill(null),
		history: Array(8).fill(Array(9).fill(null)),
		xNext: true,
		moves: 0,
	  };
	}

	handleClick(i) {
	  	const squares = this.state.squares.slice();
		const history = this.state.history.slice();
		const moves = this.state.moves;	
		history[moves+1] = squares;
		console.log(history);
		console.log(moves);
	  	if (calculateWinner(squares) || squares[i]) {
      		return;
		}
	  	squares[i] = this.state.xNext ? 'X' : 'O';
	  	this.setState({squares: squares, history: history, xNext: !this.state.xNext, moves: moves+1});
	}

	handleBack() {
		const moves = this.state.moves;
		const history = this.state.history;
		const local_squares = history.at(moves-1);
		history[moves-1] = new Array(9).fill(null);
		console.log(moves);
		this.setState({squares: local_squares, history: this.state.history, xNext: this.state.xNext, moves: moves-1});
	}

	renderSquare(i) {
	  return (
		<Square
		  value={this.state.squares[i]}
		  onClick={() => this.handleClick(i)}
		/>
	  );
	}
  
	render() {
		const winner = calculateWinner(this.state.squares);
		let status;
		if ( winner) {
			status = 'Winner: ' + winner;
		} else {
	  		status = 'Next player: ' + (this.state.xNext ? 'X' : 'O');
		}

	  return (
		<div>
		  <div className="status">{status}
			<button className='menueButton' onClick={() => {this.setState({squares: Array(9).fill(null), xNext: true, })}}>Reset</button>
			<button className='menueButton' onClick={() => this.handleBack()}>Back</button>
		</div>
		  <div className="board-row">
			{this.renderSquare(0)}
			{this.renderSquare(1)}
			{this.renderSquare(2)}
		  </div>
		  <div className="board-row">
			{this.renderSquare(3)}
			{this.renderSquare(4)}
			{this.renderSquare(5)}
		  </div>
		  <div className="board-row">
			{this.renderSquare(6)}
			{this.renderSquare(7)}
			{this.renderSquare(8)}
		  </div>
		</div>
	  );
	}
  }
  
  class Game extends React.Component {
	render() {
	  return (
		<div className="game">
		  <div className="game-board">
			<Board />
		  </div>
		  <div className="game-info">
			<div>{/* status */}</div>
			<ol>{/* TODO */}</ol>
		  </div>
		</div>
	  );
	}
  }

  function calculateWinner(squares) {
	const lines = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6],
	];
	for (let i = 0; i < lines.length; i++) {
	  const [a, b, c] = lines[i];
	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a];
	  }
	}
	return null;
  }
  
  // ========================================
  
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<Game />);