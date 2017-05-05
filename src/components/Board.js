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
    this.setState(
      {
        width: window.innerWidth,
        height: window.innerHeight,
        transX: 0,
        transY: 0,
        prevX: 0,
        prevY: 0,
        movable: false,
        zoom: 4,
        drawable: false,
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
    // console.log(this.state.width/2 - 50*this.state.zoom/2)
    // if (Math.abs(this.state.transX) > this.state.height || Math.abs(this.state.transY) > 80) {
    //   this.setState({
    //     transX: 0,
    //     transY: 0,
    //     startX: 0,
    //     startY: 0,
    //     prevX: 0,
    //     prevY: 0,
    //     moveable: false
    //   })
    // }
    this.renderASquare()
  }

  handleResize () {
    this.setState(
      {
        width: window.innerWidth,
        height: window.innerHeight
      })
  }

  getBoard () {
    // var j;
    fetch('https://us-central1-pixxiti.cloudfunctions.net/getData')
    .then(res => res.json())
    .then(json => {
        // console.log(json);
        this.props.getBoard(json);
    })
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
    // // console.log(e)
    // // console.log(e.clientX)
    // // console.log(e.clientY)
    // console.log(e.clientX, e.clientY, 'hi')
    // console.log(this.state.zoom/2*50 + e.clientX - this.state.width/2,this.state.zoom/2*50 +  e.clientY  - this.state.height/2)
    // console.log('new',this.state.transX*4 - this.state.zoom/2*50 + e.clientX - this.state.width/2,this.state.zoom/2*50 +  e.clientY  - this.state.height/2)
    // // console.log(this.state.transY*4)
    //
    // console.log('current width: ', this.state.width)
    // console.log('box size: 200px (50 * 4)')
    // console.log('center page/box is', this.state.width/2)
    // console.log('left box is', this.state.width/2 - 50*this.state.zoom/2)
    var bld = this.state.transX*this.state.zoom + this.state.width/2 - 50*this.state.zoom/2
    // console.log('box left distance', bld)
    // console.log('new', e.clientX - bld)
    // console.log('center', -1*(e.clientX - bld - 100)/4)
    // console.log('i', Math.floor((e.clientX - bld)/this.state.zoom))
    var i = Math.floor((e.clientX - bld)/this.state.zoom)
    //
    // console.log('current width: ', this.state.height)
    // console.log('box size: 200px (50 * 4)')
    // console.log('center page/box is', this.state.height/2)
    // console.log('left box is', this.state.height/2 - 50*this.state.zoom/2)
    var btd = this.state.transY*this.state.zoom + this.state.height/2 - 50*this.state.zoom/2
    // console.log('box left distance', btd)
    // console.log('new', e.clientY - btd)
    // console.log('center', -1*(e.clientY - btd - 100)/4)
    // console.log('j', Math.floor((e.clientY - btd)/this.state.zoom))
    var j = Math.floor((e.clientY - btd)/this.state.zoom)
    //

    this.setState({moveable: true, startX: e.clientX, startY: e.clientY, i: i, j: j})

    if (this.state.drawable && !this.state.moveable) {
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
    if (this.state.moveable) {
      this.setState(
        {
          transX: this.state.prevX + ( e.clientX - this.state.startX) / this.state.zoom,
          transY: this.state.prevY + (e.clientY - this.state.startY) / this.state.zoom,
        })
    }
  }

  mouseUp (e) {
    // console.log(this.state.prevX, this.state.transX)
    if (this.state.transX === this.state.prevX && this.state.transY === this.state.prevY && e.button === 0 && this.state.moveable && this.state.zoom === 4) {
      var bld = this.state.transX*this.state.zoom + this.state.width/2 - 50*this.state.zoom/2
      var btd = this.state.transY*this.state.zoom + this.state.height/2 - 50*this.state.zoom/2
      this.setState(
        {
          zoom: 40,
          moveable: false,
          prevX: -1*(e.clientX - bld - 100)/4,
          prevY: -1*(e.clientY - btd - 100)/4,
          transX: -1*(e.clientX - bld - 100)/4,
          transY: -1*(e.clientY - btd - 100)/4
        })
    } else if (e.button === 2) {
      // console.log('hi?')
      this.setState(
        {
          zoom: 4,
          moveable: false,
          prevX: this.state.transX,
          prevY: this.state.transY,
          drawable: false
        })
    } else {
      this.setState(
        {
          moveable: false,
          prevX: this.state.transX,
          prevY: this.state.transY
        })
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
    } else if (this.state.zoom === 40) {
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
    console.log('yo')
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
      <div className="pixxiti-container" style={{height: this.state.height, width: this.state.width}}>
          <div className="pixxiti-viewer"
            style={{flex: '0 0 50px', transform: 'scale(' + this.state.zoom + ',' + this.state.zoom + ')'}}>
            <div className="pixxiti-camera"
              style={{transform: 'translate(' + this.state.transX + 'px,'+ this.state.transY + 'px)'}}
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
  onBoardClick: PropTypes.func.isRequired,
  getBoard: PropTypes.func.isRequired
}

export default Board;
