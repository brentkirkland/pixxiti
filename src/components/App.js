import React, { Component } from 'react';
import './App.css';
import VisibleBoard from '../containers/VisibleBoard'

class App extends Component {

  render() {
    return (
      <div className="App">
        <VisibleBoard/>
      </div>
    );
  }
}

export default App;
