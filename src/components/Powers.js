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

  renderSimpleBomb () {
    if (this.props.powers.points < 50) {
      return (
        <div className="Selector-no-points">
          <p className="bombTitle">Small</p>
          <p className="bombPoints">50 pts</p>
        </div>
      )
    } else if (this.props.powers.simpleBomb) {
      return (
        <div onMouseDown={this.selectSimpleSelector.bind(this)} className="Selector-active">
          <p className="bombTitle">Small</p>
          <p className="bombPoints">50 pts</p>
        </div>
      )
    } else {
      return (
        <div onMouseDown={this.selectSimpleSelector.bind(this)} className="Selector">
          <p className="bombTitle">Small</p>
          <p className="bombPoints">50 pts</p>
        </div>
      )
    }
  }

  renderMegaBomb () {
    if (this.props.powers.points < 500) {
      return (
        <div className="Selector-no-points">
          <p className="bombTitle">Mega</p>
          <p className="bombPoints">500 pts</p>
        </div>
      )
    } else if (this.props.powers.megaBomb) {
      return (
        <div onMouseDown={this.selectMegaSelector.bind(this)} className="Selector-active">
          <p className="bombTitle">Mega</p>
          <p className="bombPoints">500 pts</p>
        </div>
      )
    } else {
      return (
        <div onMouseDown={this.selectMegaSelector.bind(this)} className="Selector">
          <p className="bombTitle">Mega</p>
          <p className="bombPoints">500 pts</p>
        </div>
      )
    }
  }

  renderBotButton () {
    if (!this.props.powers.bot) {
      return (
        <div className="BotButton" onMouseDown={this.getBot.bind(this)}>
          <p className="bombTitle">Bot</p>
          <p className="bombPoints">??? pts</p>
        </div>
      )
    } else {
      return (
        <div className="BotButton-active" onMouseDown={this.getBot.bind(this)}>
          <p className="bombTitle">Bot</p>
          <p className="bombPoints">??? pts</p>
        </div>
      )
    }
  }

  getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  gamble () {
    if (this.props.powers.points >=100) {
      this.props.givePoint(-100)
      var r = this.getRandomArbitrary(0, 1000)
      if (r > 98*10) {
        this.props.givePoint(1001)
      } else if (r > 94*10) {
        this.props.givePoint(501)
      } else if (r > 90*10) {
        this.props.givePoint(301)
      } else if (r > 80*10) {
        this.props.givePoint(152)
      }
    }
  }

  rendeerBotStatus () {
    return (
      <div className="botStatus">
        <p className="bombPoints">Bot Status</p>
        <p className="bombTitle">{this.props.powers.botStatus}</p>
      </div>
    )
  }

  getBot () {
    if (this.props.powers.botStatus === "waiting") {
      this.props.activateBot()
    } else {

    }
  }

  renderSpin() {
    if (this.props.powers.points < 100) {
      return (
        <div className="Selector-no-points">
          <p className="bombTitle">Spin</p>
          <p className="bombPoints">100 pts</p>
        </div>
      )
    } else {
      return (
        <div onMouseDown={this.gamble.bind(this)} className="Gamble">
          <p className="bombTitle">Spin</p>
          <p className="bombPoints">100 pts</p>
        </div>
      )
    }
  }

  render () {
    return (
      <div className="Powers">
        {this.rendeerBotStatus()}
        {this.renderBotButton()}
        {/*<div className="ExtraTime">
          <p className="bombTitle">-1 min</p>
          <p className="bombPoints">250 pts</p>
        </div>*/}
        {this.renderSpin()}
        {this.renderSimpleBomb()}
        {this.renderMegaBomb()}
        <div className="Points">
          <h3 className="totalPoints">{this.props.powers.points}</h3>
          <p  className="totalSub">pts</p>
        </div>
      </div>
    )
  }
}

Powers.propTypes = {
  powers: PropTypes.object.isRequired,
  selectSimpleBomb: PropTypes.func.isRequired,
  selectMegaBomb: PropTypes.func.isRequired,
  givePoint: PropTypes.func.isRequired,
  activateBot: PropTypes.func.isRequired
}

export default Powers;
