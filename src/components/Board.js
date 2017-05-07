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

  componentWillMount () {
    this.setState({
      drawable: false
    })
  }

  componentDidMount () {
    firebase.initializeApp(config);
    this.getBoard()
    var state = firebase.database().ref('pixel');
    state.on('value', function(snapshot) {
      console.log('hi!')
      console.log(snapshot.val().c)
      this.props.onBoardClick(snapshot.val().c, snapshot.val().y, snapshot.val().x)
      return snapshot.val()
    }, this)
    this.renderASquare()
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  componentDidUpdate () {
    this.renderASquare()
  }

  handleResize () {
    this.props.handleResize(window.innerWidth, window.innerHeight)
  }

  getBoard () {
    fetch('https://us-central1-pixxiti.cloudfunctions.net/getData')
    .then(res => res.json())
    .then(json => {
        this.props.getBoard(json);
    })
  }

  renderASquare () {
    var ctx = this.refs.canvas.getContext("2d");
    var x;
    if (this.props.board.length === 10000) {
      x = new ImageData(this.props.board, 50, 50)
    } else {
      x = new ImageData(50, 50)
    }
    ctx.putImageData(x,0,0)
  }

  mouseDown (e) {
    var bld = this.props.camera.transX*this.props.camera.zoom + this.props.camera.width/2 - 50*this.props.camera.zoom/2
    var i = Math.floor((e.clientX - bld)/this.props.camera.zoom)
    var btd = this.props.camera.transY*this.props.camera.zoom + this.props.camera.height/2 - 50*this.props.camera.zoom/2
    var j = Math.floor((e.clientY - btd)/this.props.camera.zoom)
    this.props.mouseDown(true, e.clientX, e.clientY)
    // tell firebase about the good news
    if (this.props.camera.drawable && !this.props.camera.moveable) {
      this.props.onBoardClick(15, j, i)
      firebase.database().ref('pixel').set({
        x: i,
        y: j,
        c: 15
      });
      console.log('set')
    }
    return true
  }

  mouseMove (e) {
    if (this.props.camera.moveable) {
      var transX = this.props.camera.prevX + (e.clientX - this.props.camera.startX) / this.props.camera.zoom
      var transY = this.props.camera.prevY + (e.clientY - this.props.camera.startY) / this.props.camera.zoom
      this.props.mouseMove(transX, transY)
    }
  }

  mouseUp (e) {
    if (this.props.camera.transX === this.props.camera.prevX
      && this.props.camera.transY === this.props.camera.prevY
      && e.button === 0
      && this.props.camera.moveable
      && this.props.camera.zoom === 4) {
      var bld = this.props.camera.transX*this.props.camera.zoom + this.props.camera.width/2 - 50*this.props.camera.zoom/2
      var btd = this.props.camera.transY*this.props.camera.zoom + this.props.camera.height/2 - 50*this.props.camera.zoom/2
      var prevX = -1*(e.clientX - bld - 100)/4
      var prevY = -1*(e.clientY - btd - 100)/4
      var transX = -1*(e.clientX - bld - 100)/4
      var transY = -1*(e.clientY - btd - 100)/4
      this.props.mouseUpOne(40, false, prevX, prevY, transX, transY)
    } else if (e.button === 2) {
      this.props.mouseUpTwo(4, false, this.props.camera.transX, this.props.camera.transY)
    } else {
      this.props.mouseUpThree(false, this.props.camera.transX, this.props.camera.transY)
    }

  }

  onContextMenu (e) {
    e.preventDefault();
  }

  render_draw_button () {
    if (this.state.drawable) {
      return (
        <div className="draw_button_active" onMouseDown={this.activate_draw.bind(this)}>
          <h4>Draw</h4>
        </div>
      )
    } else if (this.props.camera.zoom === 40) {
      return (
        <div className="draw_button" onMouseDown={this.activate_draw.bind(this)}>
          <h4>Draw</h4>
        </div>
      )
    } else {
      return (
        <div className="draw_button_dead">
          <h4>Draw</h4>
        </div>
      )
    }
  }

  activate_draw () {
    this.setState({
      drawable: !this.state.drawable
    })
  }

  render() {
    return (
      <div className="pixxiti">
      <div className="draw">
        <div className="App-header">
          <h2>Pixxiti</h2>
        </div>
        {this.render_draw_button ()}
      </div>
      <div className="pixxiti-container" style={{height: this.props.camera.height, width: this.props.camera.width}}>
          <div className="pixxiti-viewer"
            style={{flex: '0 0 50px', transform: 'scale(' + this.props.camera.zoom + ',' + this.props.camera.zoom + ')'}}>
            <div className="pixxiti-camera"
              style={{transform: 'translate(' + this.props.camera.transX + 'px,'+ this.props.camera.transY + 'px)'}}
              onMouseDown={this.mouseDown.bind(this)}
              onMouseUp={this.mouseUp.bind(this)}
              onMouseLeave={this.mouseUp.bind(this)}
              onContextMenu={this.onContextMenu.bind(this)}
              onMouseMove={this.mouseMove.bind(this)}>
              <canvas ref="canvas" height={50} width={50}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.object.isRequired,
  camera: PropTypes.object.isRequired,
  handleResize: PropTypes.func.isRequired,
  onBoardClick: PropTypes.func.isRequired,
  getBoard: PropTypes.func.isRequired,
  mouseDown: PropTypes.func.isRequired,
  mouseMove: PropTypes.func.isRequired,
  mouseUpOne: PropTypes.func.isRequired,
  mouseUpTwo: PropTypes.func.isRequired,
  mouseUpThree: PropTypes.func.isRequired
}

export default Board;
