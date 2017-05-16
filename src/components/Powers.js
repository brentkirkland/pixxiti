import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';

class Powers extends Component {

  selectSimpleSelector () {
    console.log("selecting")
    if(this.props.powers.points >= 50) {

      this.props.selectSimpleBomb()
      this.props.givePoint(-75)
    }

  }

  selectMegaSelector () {
    console.log("selecting")
    if(this.props.powers.points >= 500){
      this.props.selectMegaBomb()
      this.props.givePoint(-725)
    }
  }
  
  render () {
    return (
      <div className="Powers">
        <div onMouseDown={this.selectSimpleSelector.bind(this)} className="Selector">Simple Bomb</div>
        <div onMouseDown={this.selectMegaSelector.bind(this)} className="Selector">Mega Bomb</div>
        <div className="Points">{this.props.powers.points}</div>
      </div>
    )
  }
}

Powers.propTypes = {
  powers: PropTypes.object.isRequired,
  selectSimpleBomb: PropTypes.func.isRequired,
  selectMegaBomb: PropTypes.func.isRequired,
  givePoint: PropTypes.func.isRequired
}

export default Powers;
