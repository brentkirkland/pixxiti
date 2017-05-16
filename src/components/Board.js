import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import * as firebase from "firebase";
import VisibleColorPicker from '../containers/VisibleColorPicker'

const config = {
    apiKey: "AIzaSyAOvr3TtSVo9YkPz-q8Z3IeTvWdPsoFzjI",
    authDomain: "pixxiti.firebaseapp.com",
    databaseURL: "https://pixxiti.firebaseio.com",
    projectId: "pixxiti",
    storageBucket: "pixxiti.appspot.com",
    messagingSenderId: "612470212917"
  };

class Board extends Component {
  //
  // componentWillMount () {
  //   this.setState({
  //     drawable: false
  //   })
  // }

  componentDidMount () {
    firebase.initializeApp(config);
    this.getBoard()
    var state = firebase.database().ref('pixel');
    state.on('value', function(snapshot) {
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
    if (this.props.board.length === 40000) {
      x = new ImageData(this.props.board, 100, 100)
    } else {
      x = new ImageData(100, 100)
    }
    ctx.putImageData(x,0,0)
  }

  mouseDown (e) {
    this.props.mouseDown(true, e.clientX, e.clientY)
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
      var bld = this.props.camera.transX*this.props.camera.zoom + this.props.camera.width/2 - 100*this.props.camera.zoom/2
      var btd = this.props.camera.transY*this.props.camera.zoom + this.props.camera.height/2 - 100*this.props.camera.zoom/2
      var prevX = -1*(e.clientX - bld - 100)/4
      var prevY = -1*(e.clientY - btd - 100)/4
      var transX = -1*(e.clientX - bld - 100)/4
      var transY = -1*(e.clientY - btd - 100)/4
      this.props.mouseUpOne(40, false, prevX, prevY, transX, transY)
      this.props.changeDrawable()
    } else if (e.button === 2) {
      this.props.mouseUpTwo(4, false, this.props.camera.transX, this.props.camera.transY)
      this.props.changeDrawable()
    } else {
      if (this.props.camera.transX === this.props.camera.prevX
      && this.props.camera.transY === this.props.camera.prevY
      && this.props.draw.color !== -1) {
        bld = this.props.camera.transX*this.props.camera.zoom + this.props.camera.width/2 - 100*this.props.camera.zoom/2
        var i = Math.floor((e.clientX - bld)/this.props.camera.zoom)
        btd = this.props.camera.transY*this.props.camera.zoom + this.props.camera.height/2 - 100*this.props.camera.zoom/2
        var j = Math.floor((e.clientY - btd)/this.props.camera.zoom)
        if (this.props.draw.drawable && this.props.camera.moveable) {
          console.log('fuckkkk')
          this.props.onBoardClick(this.props.draw.color, j, i)
          firebase.database().ref('pixel').set({
            x: i,
            y: j,
            c: this.props.draw.color
          });
          this.updateBoard(i+1, j+1, this.props.draw.color + 1)
        }
      }
      this.props.mouseUpThree(false, this.props.camera.transX, this.props.camera.transY)
    }
  }

  updateBoard (j, i, c) {
    var url = 'https://us-central1-pixxiti.cloudfunctions.net/putData?i=' + i + '&j=' + j + '&c=' + c
    fetch(url)
  }

  onContextMenu (e) {
    e.preventDefault();
  }

  activate_draw () {
    this.props.changeDrawable()
  }

  get_camera_css () {
    if (this.props.draw.color === -1) {
      return "pixxiti-camera-no-cursor"
    } else {
      return "pixxiti-camera"
    }
  }

  render() {
    return (
      <div className="pixxiti">
      <div className="top">
        <div className="App-header">
          <h2>Pixxiti</h2>
        </div>
      </div>
      <div className="pixxiti-container" style={{height: this.props.camera.height, width: this.props.camera.width}}>
          <div className="pixxiti-viewer"
            style={{flex: '0 0 100px', transform: 'scale(' + this.props.camera.zoom + ',' + this.props.camera.zoom + ')'}}>
            <div className={this.get_camera_css()}
              style={{transform: 'translate(' + this.props.camera.transX + 'px,'+ this.props.camera.transY + 'px)'}}
              onMouseDown={this.mouseDown.bind(this)}
              onMouseUp={this.mouseUp.bind(this)}
              onMouseLeave={this.mouseUp.bind(this)}
              onContextMenu={this.onContextMenu.bind(this)}
              onMouseMove={this.mouseMove.bind(this)}>
              <canvas ref="canvas" height={100} width={100}/>
            </div>
          </div>
        </div>
        <VisibleColorPicker/>
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.object.isRequired,
  camera: PropTypes.object.isRequired,
  draw: PropTypes.object.isRequired,
  handleResize: PropTypes.func.isRequired,
  onBoardClick: PropTypes.func.isRequired,
  getBoard: PropTypes.func.isRequired,
  mouseDown: PropTypes.func.isRequired,
  mouseMove: PropTypes.func.isRequired,
  mouseUpOne: PropTypes.func.isRequired,
  mouseUpTwo: PropTypes.func.isRequired,
  mouseUpThree: PropTypes.func.isRequired,
  changeDrawable: PropTypes.func.isRequired
}

export default Board;
