import { connect } from 'react-redux'
import { changeColor } from '../actions'
import Board from '../components/Board'

const mapStateToProps = (state) => ({
  board: state.colors
})

const mapDispatchToProps = {
  onBoardClick: changeColor
}

const VisibleBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board)

export default VisibleBoard
