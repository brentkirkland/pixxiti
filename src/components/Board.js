import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';

import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyAOvr3TtSVo9YkPz-q8Z3IeTvWdPsoFzjI",
    authDomain: "pixxiti.firebaseapp.com",
    databaseURL: "https://pixxiti.firebaseio.com",
    projectId: "pixxiti",
    storageBucket: "pixxiti.appspot.com",
    messagingSenderId: "612470212917"
  };

class Board extends Component {

  componentDidMount () {
    firebase.initializeApp(config);

    var state = firebase.database().ref('pixel');
    state.on('value', function(snapshot) {
      this.props.onBoardClick(snapshot.val().c, snapshot.val().y, snapshot.val().x)
      return snapshot.val()
    }, this)
  }

  build_divs () {
    return this.props.board.map(this.handle_divs, this);
  }

  handle_divs (o, i) {
    var j = i;

    function handleClick(i,j,o,e) {
      e.preventDefault();
      var new_color = 0;
      if (o !== 15) {
        new_color = o + 1;
      }
      this.props.onBoardClick(new_color, j, i)
      firebase.database().ref('pixel').set({
        x: i,
        y: j,
        c: new_color
      });
    }

    function bb (o, i) {
      if (o === 0) {
        return <div className="Bottom_0" key={'b' + i} onClick={(handleClick.bind(this, i, j, o))}/>
      } else if (o === 1) {
        return <div className="Bottom_1" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else if (o === 2) {
        return <div className="Bottom_2" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else if (o === 3) {
        return <div className="Bottom_3" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else if (o === 4) {
        return <div className="Bottom_4" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else if (o === 5) {
        return <div className="Bottom_5" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else if (o === 6) {
        return <div className="Bottom_6" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else if (o === 7) {
        return <div className="Bottom_7" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else if (o === 8) {
        return <div className="Bottom_8" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else if (o === 9) {
        return <div className="Bottom_9" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else if (o === 10) {
        return <div className="Bottom_10" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else if (o === 11) {
        return <div className="Bottom_11" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else if (o === 12) {
        return <div className="Bottom_12" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      }  else if (o === 13) {
        return <div className="Bottom_13" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else if (o === 14) {
        return <div className="Bottom_14" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      } else {
        return <div className="Bottom_15" key={'b' + i} onClick={handleClick.bind(this, i, j, o)}/>
      }
    }
    return <div className="Top" key={'t'+ i}>{o.map(bb, this)}</div>
  }

  render() {
    return (
      <div className="App">
        {this.build_divs()}
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.object.isRequired,
  onBoardClick: PropTypes.func.isRequired
}

export default Board;
