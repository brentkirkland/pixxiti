import { connect } from 'react-redux'
import { changeColor,
         getInitialBoard,
         handleResize,
         mouseDown,
         mouseMove,
         mouseUpOne,
         mouseUpTwo,
         mouseUpThree,
         changeDrawable
       } from '../actions'
import Board from '../components/Board'

const mapStateToProps = (state) => ({
  board: state.colors,
  camera: state.camera,
  draw: state.draw
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
  changeDrawable: changeDrawable
}

const VisibleBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default VisibleBoard
