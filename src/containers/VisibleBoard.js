import { connect } from 'react-redux'
import { changeColor,
         getInitialBoard,
         handleResize,
         mouseDown,
         mouseMove,
         mouseUpOne,
         mouseUpTwo,
         mouseUpThree
       } from '../actions'
import Board from '../components/Board'

const mapStateToProps = (state) => ({
  board: state.colors,
  camera: state.camera
})

const mapDispatchToProps = {
  onBoardClick: changeColor,
  getBoard: getInitialBoard,
  handleResize: handleResize,
  mouseDown: mouseDown,
  mouseMove: mouseMove,
  mouseUpOne: mouseUpOne,
  mouseUpTwo: mouseUpTwo,
  mouseUpThree: mouseUpThree
}

const VisibleBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default VisibleBoard
