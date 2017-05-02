import React, { Component } from 'react';
import './App.css';
// import * as firebase from "firebase";
import VisibleBoard from '../containers/VisibleBoard'

// var config = {
//     apiKey: "AIzaSyAOvr3TtSVo9YkPz-q8Z3IeTvWdPsoFzjI",
//     authDomain: "pixxiti.firebaseapp.com",
//     databaseURL: "https://pixxiti.firebaseio.com",
//     projectId: "pixxiti",
//     storageBucket: "pixxiti.appspot.com",
//     messagingSenderId: "612470212917"
//   };

class App extends Component {

  componentDidMount () {
    // firebase.initializeApp(config);

    // firebase.auth().signInAnonymously().catch(function(error) {
    //   // Handle Errors here.
    //   var errorCode = error.code;
    //   var errorMessage = error.message;
    //   // ...
    //   console.log(errorCode, errorMessage);
    // });
    //
    // var str = ''
    // for (var i = 0; i < 1000; i++) {
    // 	for (var j = 0; j < 1000; j++) {
    //     var object = {c: 'A'}
    //     object[i] = i;
    //     object[j] = j;
    //     console.log(object)
    //     firebase.database().ref('pixel_'+i+'_'+j).set({
    //         x: i,
    //         y: j,
    //         c: '0'
    //     });
    //     // str += 'A';
    //     // firebase.database().ref('pixels'+i+j).remove();
    //     // str += 'A';
    // 	}
    // }

    // console.log(str.length)

    // var board = {
    //   "size": 1000,
    //   "time": 10,
    //   "state": str
    // };

    // var state = firebase.database().ref('board/state');
    // state.on('value', function(snapshot) {
    //   // console.log(snapshot.val(), 'hi');
    //   // this.test_one_two();
    //   return snapshot.val()
    // })
    // state.on('value', this.test_one_two)
    // console.log(state);
    //
    //
    // this.test_one_two();

    // str = ''
    // for (i = 0; i < 1000; i++) {
    //   for (j = 0; j < 1000; j++) {
    //     str += 'F'
    //   }
    // }
    //
    // board = {
    //   "size": 1000,
    //   "time": 10,
    //   "state": str
    // };

    // firebase.database().ref('board').set({
    //   size: board.size,
    //   time: board.time,
    //   state: board.state
    // });
    //
    // console.log(this.props)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Pixxiti</h2>
        </div>
        <VisibleBoard/>
      </div>
    );
  }
}

export default App;
