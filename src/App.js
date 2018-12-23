import React, { Component } from 'react';
import './App.css';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      turn: 'X',
      gameEnded:false,
      board: Array(9).fill(''),
      totalMoves: 0,
      winner: undefined,
      result: undefined
    }
  }
  

  onBoardClicked = (e)=> {
  
    let {board} = this.state;
    const squareIndex = e.target.dataset.square;

    if(this.state.gameEnded && this.state.winner) {
      alert('Winner is ' + this.state.winner)
      return;
    }

    if(this.state.totalMoves === 9) {
      alert('Game Completed')
      return;
    }

    if(board[squareIndex] !== '') {
      return;
    }


    e.target.innerText = this.state.turn;
    board[squareIndex] = this.state.turn;
    

    this.setState({

      turn: this.state.turn === 'X' ? 'O' : 'X',
      board,
      totalMoves: (this.state.totalMoves+1)
    })

    this.checkGameFinished();
  }

  checkGameFinished = ()=> {

    const {board} = this.state;

    var obj = this.checkWinner(board)
    if(obj.isWon) {
      this.setState({
        gameEnded: true,
        winner: obj.winner,
        result: 'Winner is ' + obj.winner
      })
      setTimeout(()=> {
        alert('Winner is ' + this.state.winner)
        return;
      },1); 
    }

    if(!obj.isWon && this.state.totalMoves === 9) {
      this.setState({
        gameEnded: true,
        result: 'Match Drawn'
      })
    }
    

  }

  checkWinner = (board)=> {

    var winMoves = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 4, 8], [2, 4, 6],
      [0, 3, 6], [1, 4, 7], [2, 5, 8]
    ]

    for( var i in winMoves) {
      if( board[winMoves[i][0]] !== '' && (board[winMoves[i][0]] === board[winMoves[i][1]] && board[winMoves[i][0]] === board[winMoves[i][2]])) {
        return {'isWon': true, 'winner':board[winMoves[i][0]]};
      }
    }
    return {'isWon': false, 'winner':undefined};
  }

  render() {
    return (
      <div className="game">
        <div className="head">
          TIC-TAC-TOE
        </div>
        <div className="board" onClick={this.onBoardClicked}>
          <div className="square" data-square="0"></div>
          <div className="square" data-square="1"></div>
          <div className="square" data-square="2"></div>
          <div className="square" data-square="3"></div>
          <div className="square" data-square="4"></div>
          <div className="square" data-square="5"></div>
          <div className="square" data-square="6"></div>
          <div className="square" data-square="7"></div>
          <div className="square" data-square="8"></div>
        </div>
      </div>
    );
  }
}

export default App;
