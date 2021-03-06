import { connect } from 'react-redux'
import { changeColor,
         getInitialBoard,
         handleResize,
         mouseDown,
         mouseMove,
         mouseUpOne,
         mouseUpTwo,
         mouseUpThree,
         changeDrawable,
         givePoint,
         selectSimpleBomb,
         selectMegaBomb,
         deactivateBot,
         updateBotI,
         updateBotJ,
         updateBotArrayText,
         botError,
         startBot,
         updatePlaceIJ,
         botLoaded,
       } from '../actions'
import Board from '../components/Board'

const mapStateToProps = (state) => ({
  board: state.colors,
  camera: state.camera,
  draw: state.draw,
  powers: state.powers
})

const mapDispatchToProps = {
  onBoardClick: changeColor,
  getBoard: getInitialBoard,
  handleResize: handleResize,
  mouseDown: mouseDown,
  mouseMove: mouseMove,
  mouseUpOne: mouseUpOne,
  mouseUpTwo: mouseUpTwo,
  mouseUpThree: mouseUpThree,
  changeDrawable: changeDrawable,
  givePoint: givePoint,
  selectSimpleBomb: selectSimpleBomb,
  selectMegaBomb: selectMegaBomb,
  deactivateBot: deactivateBot,
  updateBotI: updateBotI,
  updateBotJ: updateBotJ,
  updateBotArrayText: updateBotArrayText,
  botError: botError,
  startBot: startBot,
  updatePlaceIJ: updatePlaceIJ,
  botLoaded: botLoaded
}

const VisibleBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default VisibleBoard
