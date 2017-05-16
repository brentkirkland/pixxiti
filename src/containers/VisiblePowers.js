import { connect } from 'react-redux'
import { selectSimpleBomb,
		 selectMegaBomb,
		 givePoint
	  		 } from '../actions'
import Powers from '../components/Powers'

const mapStateToProps = (state) => ({
  powers: state.powers
})

const mapDispatchToProps = {
  selectSimpleBomb : selectSimpleBomb,
  selectMegaBomb: selectMegaBomb,
  givePoint: givePoint
}

const VisiblePowers = connect(
  mapStateToProps,
  mapDispatchToProps
)(Powers)

export default VisiblePowers
