import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import * as firebase from "firebase";
import VisibleColorPicker from '../containers/VisibleColorPicker'
import VisiblePowers from '../containers/VisiblePowers'

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
    // var arr = []
    // for(var i = 0; i < 50; i++) {
    //   var arrs = []
    //   for (var j = 0; j < 50; j++) {
    //     arrs.push(0)
    //   }
    //   arr.push(arrs)
    // }
    // this.props.getBoard(arr);
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
      var bld = this.props.camera.transX*this.props.camera.zoom + this.props.camera.width/2 - 50*this.props.camera.zoom/2
      var btd = this.props.camera.transY*this.props.camera.zoom + this.props.camera.height/2 - 50*this.props.camera.zoom/2
      var prevX = -1*(e.clientX - bld - 100)/4
      var prevY = -1*(e.clientY - btd - 100)/4
      var transX = -1*(e.clientX - bld - 100)/4
      var transY = -1*(e.clientY - btd - 100)/4
      this.props.mouseUpOne(40, false, prevX, prevY, transX, transY)
      this.props.changeDrawable()
    } else if (e.button === 2 && this.props.camera.zoom === 40) {
      this.props.mouseUpTwo(4, false, this.props.camera.transX, this.props.camera.transY)
      this.props.changeDrawable()
    } else {
      if (this.props.camera.transX === this.props.camera.prevX
      && this.props.camera.transY === this.props.camera.prevY
      && this.props.draw.color !== -1) {
        bld = this.props.camera.transX*this.props.camera.zoom + this.props.camera.width/2 - 50*this.props.camera.zoom/2
        var i = Math.floor((e.clientX - bld)/this.props.camera.zoom)
        btd = this.props.camera.transY*this.props.camera.zoom + this.props.camera.height/2 - 50*this.props.camera.zoom/2
        var j = Math.floor((e.clientY - btd)/this.props.camera.zoom)
        if (this.props.draw.drawable && this.props.camera.moveable) {
          var a, b
          if (this.props.powers.megaBomb) {
            for (a = i - 7; a < i + 8; a++) {
              for (b = j - 7; b < j + 8; b++) {

                this.props.onBoardClick(this.props.draw.color, b, a)

                firebase.database().ref('pixel').set({
                  x: a,
                  y: b,
                  c: this.props.draw.color
                });

                this.updateBoard(a+1, b+1, this.props.draw.color + 1)
              }
            }
            this.props.selectMegaBomb()
          } else if (this.props.powers.simpleBomb) {
            for (a = i - 2; a < i + 3; a++) {
              for (b = j - 2; b < j + 3; b++) {

                this.props.onBoardClick(this.props.draw.color, b, a)

                firebase.database().ref('pixel').set({
                  x: a,
                  y: b,
                  c: this.props.draw.color
                });

                this.updateBoard(a+1, b+1, this.props.draw.color + 1)
              }
            }
            this.props.selectSimpleBomb()
          } else {
            this.props.onBoardClick(this.props.draw.color, j, i)
            firebase.database().ref('pixel').set({
              x: i,
              y: j,
              c: this.props.draw.color
            });
            this.updateBoard(i+1, j+1, this.props.draw.color + 1)
          }
        }
      }
      this.props.mouseUpThree(false, this.props.camera.transX, this.props.camera.transY)
    }
  }

  updateBoard (j, i, c) {
    this.props.givePoint();
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
          <VisiblePowers/>
      </div>
      <div className="pixxiti-container" style={{height: this.props.camera.height, width: this.props.camera.width}}>
          <div className="pixxiti-viewer"
            style={{flex: '0 0 50px', transform: 'scale(' + this.props.camera.zoom + ',' + this.props.camera.zoom + ')'}}>
            <div className={this.get_camera_css()}
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
        <VisibleColorPicker/>
      </div>
    );
  }
}

Board.propTypes = {
  board: PropTypes.object.isRequired,
  camera: PropTypes.object.isRequired,
  draw: PropTypes.object.isRequired,
  powers: PropTypes.object.isRequired,
  handleResize: PropTypes.func.isRequired,
  onBoardClick: PropTypes.func.isRequired,
  getBoard: PropTypes.func.isRequired,
  mouseDown: PropTypes.func.isRequired,
  mouseMove: PropTypes.func.isRequired,
  mouseUpOne: PropTypes.func.isRequired,
  mouseUpTwo: PropTypes.func.isRequired,
  mouseUpThree: PropTypes.func.isRequired,
  changeDrawable: PropTypes.func.isRequired,
  givePoint: PropTypes.func.isRequired,
  selectSimpleBomb: PropTypes.func.isRequired,
  selectMegaBomb: PropTypes.func.isRequired
}

export default Board;
