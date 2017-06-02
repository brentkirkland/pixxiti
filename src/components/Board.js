import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import * as firebase from "firebase";
import VisibleColorPicker from '../containers/VisibleColorPicker'
import VisiblePowers from '../containers/VisiblePowers'
import Loader from 'halogen/GridLoader';

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
    setInterval(this.doBotThings.bind(this), 2000)
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
        var str = json.str;
        this.props.getBoard(str);
    })
    // var arr = []
    // for(var i = 0; i < 200; i++) {
    //   var arrs = []
    //   for (var j = 0; j < 200; j++) {
    //     arrs.push(0)
    //   }
    //   arr.push(arrs)
    // }
    // this.props.getBoard(arr);
  }

  renderASquare () {
    var ctx = this.refs.canvas.getContext("2d");
    var x;
    if (this.props.board.length ===160000) {
      x = new ImageData(this.props.board, 200, 200)
    } else {
      x = new ImageData(200, 200)
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
      var bld = this.props.camera.transX*this.props.camera.zoom + this.props.camera.width/2 - 200*this.props.camera.zoom/2
      var btd = this.props.camera.transY*this.props.camera.zoom + this.props.camera.height/2 - 200*this.props.camera.zoom/2
      var prevX = -1*(e.clientX - bld - 400)/4
      var prevY = -1*(e.clientY - btd - 400)/4
      var transX = -1*(e.clientX - bld - 400)/4
      var transY = -1*(e.clientY - btd - 400)/4
      this.props.mouseUpOne(40, false, prevX, prevY, transX, transY)
      this.props.changeDrawable()
    } else if (e.button === 2 && this.props.camera.zoom === 40) {
      this.props.mouseUpTwo(4, false, this.props.camera.transX, this.props.camera.transY)
      this.props.changeDrawable()
    } else {
      if (this.props.camera.transX === this.props.camera.prevX
      && this.props.camera.transY === this.props.camera.prevY
      && this.props.draw.color !== -1) {
        bld = this.props.camera.transX*this.props.camera.zoom + this.props.camera.width/2 - 200*this.props.camera.zoom/2
        var i = Math.floor((e.clientX - bld)/this.props.camera.zoom)
        btd = this.props.camera.transY*this.props.camera.zoom + this.props.camera.height/2 - 200*this.props.camera.zoom/2
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

  handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
  }

  updateBoard (j, i, c) {
    this.props.givePoint();
    var url = 'https://us-central1-pixxiti.cloudfunctions.net/putData?i=' + i + '&j=' + j + '&c=' + c
    fetch(url).then(this.handleErrors)
    .then(response => console.log(response) )
    .catch(error => console.log(error) );
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

  renderPopUp() {

    if (this.props.board.length !== 160000) {
      return (
        <div className="BackgroundPop" style={{height: this.props.camera.height, width: this.props.camera.width}}>
            <Loader color="#fff" size="16px" margin="4px"/>
        </div>
      )
    } else if (this.props.powers.botStatus === "activating") {
      return (
        <div className="BackgroundPop" style={{height: this.props.camera.height, width: this.props.camera.width}}>
          <div className="Pop"  style={{width: this.props.camera.width/2}}>
            <h2>Hi, I'm Bot</h2>
            <p>I'm not the smartest, but I can help.</p>
            <p>I require 1 pt for each pixel I place. If no one tampered with my work once I finished, I will give all the pts back.</p>
            <h3>Starting Point:</h3>
              <div>
                Row: <input onChange={this.onRowChange.bind(this)} className="inputIndex" type="number"/>
              Column: <input onChange={this.onColumnChange.bind(this)} className="inputIndex" width="30" type="number"/>
              </div>
            <h3>Sequence: </h3>
            <p> There are 16 colors and I only know hex (0-F). Use X to skip a pixel. Seperate new lines by a comma.</p>
            <textarea  onChange={this.onSequenceChange.bind(this)} className="inputSequence" placeholder="0A0A0A0,0A0A000,0AAA080,0A0A0A0,0A0A0A0"/>
            {this.renderBotError()}
            <div className={"popUpButtonDiv"}>
              <div className={"cancelPop"} onMouseDown={this.deactivateBot.bind(this)}>Cancel</div>
              <div className={"activatePop"} onMouseDown={this.onActivate.bind(this)}>Activate</div>
            </div>
          </div>
        </div>
      )
    }
  }

  renderBotError() {
    if (this.props.powers.botError !== "") {
      return (
        <p className="botError">{this.props.powers.botError}</p>
      )

    }
  }

  onRowChange(e) {
    this.props.updateBotI(e.target.value)
  }

  onColumnChange(e) {
    this.props.updateBotJ(e.target.value)
  }

  onSequenceChange(e) {
    this.props.updateBotArrayText(e.target.value)
  }

  onActivate() {
    var error = false;
    var errorStr = ""
    if (this.props.powers.botI >= 0 && this.props.powers.botI < 200) {

    } else {
      errorStr = "Row index needs to be larger than 0 and less than 200. "
      error = true;
    }

    if (this.props.powers.botJ >= 0 && this.props.powers.botJ < 200) {

    } else {
      errorStr += "Column index needs to be larger than 0 and less than 200. "
      error = true;
    }

    var new_plain_str = this.props.powers.botArrayText.toUpperCase().replace(/\s/g, "").split(',');
    if (this.props.powers.botArrayText === "") {
      errorStr += "Needs sequence. "
      error = true;
    } else {

    }

    if (error) {
      this.props.botError(errorStr)
    } else {
      var botArray = []
      for (var i = 0; i < new_plain_str.length; i++) {
        var botInnerArray = []
        for (var j = 0; j < new_plain_str[i].length; j++) {
          if (new_plain_str[i][j] === '0') {
            botInnerArray.push(0)
          } else if (new_plain_str[i][j] === '1') {
            botInnerArray.push(1)
          } else if (new_plain_str[i][j] === '2') {
            botInnerArray.push(2)
          } else if (new_plain_str[i][j] === '3') {
            botInnerArray.push(3)
          } else if (new_plain_str[i][j] === '4') {
            botInnerArray.push(4)
          } else if (new_plain_str[i][j] === '5') {
            botInnerArray.push(5)
          } else if (new_plain_str[i][j] === '6') {
            botInnerArray.push(6)
          } else if (new_plain_str[i][j] === '7') {
            botInnerArray.push(7)
          } else if (new_plain_str[i][j] === '8') {
            botInnerArray.push(8)
          } else if (new_plain_str[i][j] === '9') {
            botInnerArray.push(9)
          } else if (new_plain_str[i][j] === 'A') {
            botInnerArray.push(10)
          } else if (new_plain_str[i][j] === 'B') {
            botInnerArray.push(11)
          } else if (new_plain_str[i][j] === 'C') {
            botInnerArray.push(12)
          } else if (new_plain_str[i][j] === 'D') {
            botInnerArray.push(13)
          } else if (new_plain_str[i][j] === 'E') {
            botInnerArray.push(14)
          } else if (new_plain_str[i][j] === 'F') {
            botInnerArray.push(15)
          } else if (new_plain_str[i][j] === 'X') {
            botInnerArray.push(-1)
          } else {
            botInnerArray.push(0)
          }
        }
        botArray.push(botInnerArray)
      }
    }
    this.props.startBot(botArray)
  }

  doNothing () {

  }

  deactivateBot () {
    this.props.deactivateBot()
  }

  doBotThings () {
    if (this.props.powers.bot && this.props.powers.points > 0) {
      var placeI;
      var placeJ;
      if (this.props.powers.placeI === undefined) {
        placeI = 0;
      } else {
        placeI = this.props.powers.placeI
      }
      if (this.props.powers.placeJ === undefined) {
        placeJ = 0;
      } else {
        placeJ = this.props.powers.placeJ
      }
      var botI = parseInt(this.props.powers.botI, 10) + placeI
      var botJ = parseInt(this.props.powers.botJ, 10) + placeJ

      if (this.props.powers.botArray[placeI][placeJ] !== -1 && this.props.powers.botArray[placeI][placeJ] !== undefined) {
        firebase.database().ref('pixel').set({
          x: botJ,
          y: botI,
          c: this.props.powers.botArray[placeI][placeJ]
        });
        this.props.onBoardClick(this.props.powers.botArray[placeI][placeJ], botI, botJ)
        this.updateBoard(botJ+1, botI+1, this.props.powers.botArray[placeI][placeJ] + 1)
      }

      if (this.props.powers.botArray[placeI][placeJ] !== undefined) {
        this.props.givePoint(-2)
      }

      var iLen = this.props.powers.botArray.length
      if (placeJ + 1 > this.props.powers.botArray[placeI].length) {
        placeI += 1
        placeJ = 0
      } else {
        placeJ += 1
      }

      if (placeI < iLen) {
        this.props.updatePlaceIJ(placeI, placeJ, false)
      } else {
        var untampered = true
        for (var i = 0; i < this.props.powers.botArray.length; i++) {
          for (var j = 0; j < this.props.powers.botArray[i].length; j++) {
            // console.log(this.props.powers.botArray[i][j])
            var ii = parseInt(this.props.powers.botI, 10) + i;
            var jj = parseInt(this.props.powers.botJ, 10) + j;
            const index_i = ii * 4
            const index_j = jj * 4
            var index;
            if (index_i > 0) {
              index = (index_i )*200 + index_j
            } else {
              index = index_i + index_j
            }
            switch (this.props.powers.botArray[i][j]) {
              case 0:
                if (this.props.board[index] === 255 &&
                    this.props.board[index + 1] === 255 &&
                    this.props.board[index + 2] === 255 &&
                    this.props.powers.botArray[i][j] === 0) {

                } else {
                  console.log(this.props.board[index])
                  console.log('tampered', 0)
                  untampered = false
                }
                break;
              case 1:
                if (this.props.board[index] === 228 &&
                    this.props.board[index + 1] === 228 &&
                    this.props.board[index + 2] === 228 &&
                    this.props.powers.botArray[i][j] === 1) {

                } else {
                  console.log(this.props.board[index])
                  console.log('tampered', 1)
                  untampered = false
                }
                break;
              case 2:
                if (this.props.board[index] === 136 &&
                    this.props.board[index + 1] === 136 &&
                    this.props.board[index + 2] === 136 &&
                    this.props.powers.botArray[i][j] === 2) {

                } else {
                  console.log('tampered', 2)
                  untampered = false
                }
                break;
              case 3:
                if (this.props.board[index] === 34 &&
                    this.props.board[index + 1] === 34 &&
                    this.props.board[index + 2] === 34 &&
                    this.props.powers.botArray[i][j] === 3) {

                } else {
                  console.log('tampered', 3)
                  untampered = false
                }
                break;
              case 4:
                if (this.props.board[index] === 255 &&
                    this.props.board[index + 1] === 167 &&
                    this.props.board[index + 2] === 209 &&
                    this.props.powers.botArray[i][j] === 4) {

                } else {
                  console.log('tampered', 4)
                  untampered = false
                }
                break;
              case 5:
                if (this.props.board[index] === 229 &&
                    this.props.board[index + 1] === 0 &&
                    this.props.board[index + 2] === 0 &&
                    this.props.powers.botArray[i][j] === 5) {

                } else {
                  console.log('tampered', 5)
                  untampered = false
                }
                break;
              case 6:
                if (this.props.board[index] === 229 &&
                    this.props.board[index + 1] === 149 &&
                    this.props.board[index + 2] === 0 &&
                    this.props.powers.botArray[i][j] === 6) {

                } else {
                  console.log('tampered', 6)
                  untampered = false
                }
                break;
              case 7:
                if (this.props.board[index] === 160 &&
                    this.props.board[index + 1] === 106 &&
                    this.props.board[index + 2] === 66 &&
                    this.props.powers.botArray[i][j] === 7) {

                } else {
                  console.log('tampered', 7)
                  untampered = false
                }
                break;
              case 8:
                if (this.props.board[index] === 229 &&
                    this.props.board[index + 1] === 217 &&
                    this.props.board[index + 2] === 0 &&
                    this.props.powers.botArray[i][j] === 8) {

                } else {
                  console.log('tampered', 8)
                  untampered = false
                }
                break;
              case 9:
                if (this.props.board[index] === 148 &&
                    this.props.board[index + 1] === 224 &&
                    this.props.board[index + 2] === 68 &&
                    this.props.powers.botArray[i][j] === 9) {

                } else {
                  console.log('tampered', 9)
                  untampered = false
                }
                break;
              case 10:
                if (this.props.board[index] === 2 &&
                    this.props.board[index + 1] === 190 &&
                    this.props.board[index + 2] === 1 &&
                    this.props.powers.botArray[i][j] === 10) {

                } else {
                  console.log('tampered', 10)
                  untampered = false
                }
                break;
              case 11:
                if (this.props.board[index] === 0 &&
                    this.props.board[index + 1] === 211 &&
                    this.props.board[index + 2] === 221 &&
                    this.props.powers.botArray[i][j] === 11) {

                } else {
                  console.log('tampered', 11)
                  untampered = false
                }
                break;
              case 12:
                if (this.props.board[index] === 0 &&
                    this.props.board[index + 1] === 131 &&
                    this.props.board[index + 2] === 199 &&
                    this.props.powers.botArray[i][j] === 12) {

                } else {
                  console.log('tampered', 12)
                  untampered = false
                }
                break;
              case 13:
                if (this.props.board[index] === 0 &&
                    this.props.board[index + 1] === 0 &&
                    this.props.board[index + 2] === 228 &&
                    this.props.powers.botArray[i][j] === 13) {

                } else {
                  console.log('tampered', 13)
                  untampered = false
                }
                break;
              case 14:
                if (this.props.board[index] === 207 &&
                    this.props.board[index + 1] === 110 &&
                    this.props.board[index + 2] === 228 &&
                    this.props.powers.botArray[i][j] === 14) {

                } else {
                  console.log('tampered', 14)
                  untampered = false
                }
                break;
              case 15:
                if (this.props.board[index] === 130 &&
                    this.props.board[index + 1] === 0 &&
                    this.props.board[index + 2] === 128 &&
                    this.props.powers.botArray[i][j] === 15) {

                } else {
                  console.log('tampered', 15)
                  untampered = false
                }
                break;
              default:
                // untampered = false
                break;
            }
          }
        }

        if (untampered) {
          this.props.updatePlaceIJ(69, 69, true)
        } else {
          this.props.updatePlaceIJ(0, 0, true)
        }
      }
    }
  }

  render() {
    return (
      <div className="pixxiti">
      {this.renderPopUp()}
      <div className="top">
        <div className="App-header">
          <h2>Pixxiti</h2>
        </div>
          <VisiblePowers/>
      </div>
      <div className="pixxiti-container" style={{height: this.props.camera.height, width: this.props.camera.width}}>
          <div className="pixxiti-viewer"
            style={{flex: '0 0 200px', transform: 'scale(' + this.props.camera.zoom + ',' + this.props.camera.zoom + ')'}}>
            <div className={this.get_camera_css()}
              style={{transform: 'translate(' + this.props.camera.transX + 'px,'+ this.props.camera.transY + 'px)'}}
              onMouseDown={this.mouseDown.bind(this)}
              onMouseUp={this.mouseUp.bind(this)}
              onMouseLeave={this.mouseUp.bind(this)}
              onContextMenu={this.onContextMenu.bind(this)}
              onMouseMove={this.mouseMove.bind(this)}>
              <canvas ref="canvas" height={200} width={200}/>
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
  selectMegaBomb: PropTypes.func.isRequired,
  deactivateBot: PropTypes.func.isRequired,
  updateBotArrayText: PropTypes.func.isRequired,
  updateBotI: PropTypes.func.isRequired,
  updateBotJ: PropTypes.func.isRequired,
  botError: PropTypes.func.isRequired,
  startBot: PropTypes.func.isRequired,
  updatePlaceIJ: PropTypes.func.isRequired
}

export default Board;
