import React, { Component } from 'react';

import map from './data/map_0.json';

import movesLose from './data/moves_0.json';
import movesWin from './data/moves_1.json';
import movesUnfinished from './data/moves_2.json';

import './App.css';

class App extends Component {

  constructor() {
    super();
  
    this.orientations = ["n", "e", "s", "w"];

    // We need to clone the starting position here and below via JSON so that
    // we do not modify the initial state
    this.state = {
      player: JSON.parse(JSON.stringify(map.startPos)),
      moves: JSON.parse(JSON.stringify(movesWin)),
      gameState: "inProgress",
    }

    this.initialiseInterval();
  }

  initialiseInterval() {
    clearTimeout(this.interval);

    // Move the turtle every X milliseconds according to this interval,
    // and save the interval to clear later
    this.interval = setInterval(() => {
      this.moveTurtle();
    }, 1000);
  }

  reset(movesType) {
    let moves;

    if (movesType === "win") {
      moves = movesWin;
    } else if (movesType === "lose") {
      moves = movesLose;
    } else {
      moves = movesUnfinished;
    }

    this.initialiseInterval();

    this.setState({
      player: JSON.parse(JSON.stringify(map.startPos)),
      moves: JSON.parse(JSON.stringify(moves)),
      gameState: "inProgress",
    })
  }

  moveTurtle() {
    // if we have run out of moves, then we lose
    if (!this.state.moves.length) {
      this.setState({
        gameState: "incomplete",
      });

      return;
    }

    const player = this.state.player;

    // Working from the first move always, we will remove this element later
    const moves = this.state.moves;

    player = this.applyMove(player, moves[0]);

    // Use the new position to check if we're on a mine, or at an exit.
    // If we are, then update the game state
    if (this.isMine(player.x, player.y)) {
      this.setState({
        gameState: "dead", // :( 
      });

      clearInterval(this.interval);
    } else if (this.isExit(player.x, player.y)) {
      this.setState({
        gameState: "win", // :)
      });

      clearInterval(this.interval);
    }
    // TODO: Maybe an out of bounds check?

    // We're done with this move, so remove it from the start of the array for next time
    // this function is called.
    moves.shift();

    this.setState({
      player,
      moves,
    })
  }


  applyMove(player, move) {
    if (move === "m") {
      // Move the turtle based on his orientation
      switch (player.orientation) {
        case "n":
          player.y = player.y - 1;

          break;
        case "e":
          player.x = player.x + 1;

          break;
        case "s":
          player.y = player.y + 1;

          break;
        case "w":
          player.x = player.x - 1;

          break;
      }
    } else if (move === "r") {
      // Find orientation and assign next one in the list, wrapping around if needed
      // This gets the current index of the current orientation of the turtle, adds 1, and
      // mods it by the length of the orientation in case it goes off the end of the array.  
      player.orientation = this.orientations[
        (this.orientations.indexOf(player.orientation) + 1) % this.orientations.length
      ];
    }

    return player;
  }


  isMine(x, y) {
    for (let i = 0; i < map.mines.length; i++) {
      if (map.mines[i].x === x && map.mines[i].y === y) {
        return true;
      }
    }

    return false;
  }


  isExit(x, y) {
    return map.exitPos.x === x && map.exitPos.y === y;
  }


  isPlayerPos(x, y) {
    return this.state.player.x === x && this.state.player.y === y
  }


  generateGrid() {
    const gridChildren = [];

    for (let y = 0; y < map.size.y; y++) {
      for (let x = 0; x < map.size.x; x++) {
        let child = [];
        // These give a React warning, but I suspect this is a bug in React.
        // I will file a bug report for this.
        if (this.isMine(x, y)) {
          child.push(<img src="mine.jpg"/>);
        }
        if (this.isExit(x, y)) {
          child.push(<img src="exit.png"/>);
        }
        if (this.isPlayerPos(x, y)) {
          child.push(<img className={this.state.player.orientation} src="turtle.png"/>);
        }


        gridChildren.push(<span key={x + "," + y} className="grid-item">{child}</span>);
      }
      gridChildren.push(<div key={"break" + y}/>)
    }

    return gridChildren;
  }

  render() {
    const gridChildren = this.generateGrid();

    let overlay;
    switch (this.state.gameState) {
      case "dead":
        overlay = <div className="overlay dead">ded :,(</div>;
        break;
      case "win":
        overlay = <div className="overlay win">winrar :)))</div>;
        break;
      case "incomplete":
        overlay = <div className="overlay dead">Out of juice :,(</div>;
        break; 
    }

    return (
      <div>
        <div className="table-holder">
          {gridChildren}
          {overlay}
        </div>

        <button onClick={() => this.reset("win")}>Win</button>
        <button onClick={() => this.reset("lose")}>Lose</button>
        <button onClick={() => this.reset("unfinished")}>Don't finish</button>
      </div>
    );
  }
}

export default App;
