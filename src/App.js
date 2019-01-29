import React, { Component } from 'react';

import moves from './data/moves_0.json';
import map from './data/map_0.json';

import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      player: map.startPos,
    }
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
        let child = " ";
        if (this.isMine(x, y)) {
          child = "mine";
        } else if (this.isExit(x, y)) {
          child = "exit";
        } else if (this.isPlayerPos(x, y)) {
          child = "turtle";
        }


        gridChildren.push(<span className="grid-item" data-x={x} data-y={y}>{child}</span>);
      }
      gridChildren.push(<div/>)
    }

    return gridChildren;
  }

  render() {

    console.log(moves);
    console.log(map);


    const gridChildren = this.generateGrid();

    return (
      <div className="table-holder">
        {gridChildren}
      </div>
    );
  }
}

export default App;
