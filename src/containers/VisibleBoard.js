import { connect } from 'react-redux'
import { changeColor, getInitialBoard } from '../actions'
import Board from '../components/Board'

const mapStateToProps = (state) => ({
  board: state.colors
})

const mapDispatchToProps = {
  onBoardClick: changeColor,
  getBoard: getInitialBoard
}

const VisibleBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default VisibleBoard
