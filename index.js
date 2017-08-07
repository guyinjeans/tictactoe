const readline = require('readline');

class TicTacToe {
  constructor() {
    this.board = new Board();
    this.turn = true;
    this.winner = undefined;
  }
  
  update() {
    const player = this.turn ? 'Player 1' : 'Player 2';
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    this.render();
    rl.question(`${player}, where would you like to play your piece\n`, (answer) => {
      const location = answer.split(' ').map( n => parseInt(n));
      if (this.board.placePiece( this.turn ? 'x' : 'o', ...location )) {
        this.turn = !this.turn;
      };
      rl.close();
      this.winner = this.board.checkState();
      if (!this.winner) { 
        this.update(); 
      } else {
        console.log(`${player} has won the game!`)
      }
    })
  }

  render() {
    console.log(
      this.board.state.map( row => row.join('|')).join( '\n' + ('-').repeat(this.board.state.length * 2 - 1) + '\n')
    )
  }

  start() {
    this.update()
  }

}

class Board {

  constructor() {
    this.state = Array(3).fill().map(()=>Array(3).fill(' '));
  }

  placePiece(p, x, y) {
    if (x < this.state.length && y < this.state.length) {
      if (this.state[y][x] === ' ') {
        this.state[y][x] = p;
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
    
  }

  checkState() {
    const cols = [];
    const majorDiag = [];
    const minorDiag = [];

    //generate columns
    for (let i = 0; i < this.state[0].length; i++) {
      cols[i] = cols[i] || [];
      for(let j = 0; j < this.state.length; j++) {
        cols[i][j] = this.state[j][i];
      }
    }

    //generate diags
    for (let i = 0; i < this.state.length; i++) {
      majorDiag.push( this.state[i][i] );
      minorDiag.push( this.state[this.state.length - (i + 1)][i])
    }

    //check rows, return string if match
    for (let i = 0; i < this.state.length; i++) {
      if (this.state[i].every(p => p === p[0] && (p !== ' '))) { return this.state[i][0]; }
    }

    //check cols, return string if match
    for (let i = 0; i < cols.length; i++) {
      console.log(cols[i].every(p => (p === cols[i][0]) && (p !== ' ')))
      if (cols[i].every(p => (p === cols[i][0]) && (p !== ' '))) { return cols[i][0]; }
    }

    //check diags, return string if match
    if (majorDiag.every( p => p === majorDiag[0] && (p !== ' '))) { return majorDiag[0]; }
    if (minorDiag.every( p => p === minorDiag[0] && (p !== ' '))) { return minorDiag[0]; }

    return;

  }

}

let t = new TicTacToe();
t.start();
