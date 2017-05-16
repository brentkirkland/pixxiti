var initial_state = { points: 5000, simpleBomb: false, megaBomb: false }

const powers = (state = initial_state, action) => {
  var new_state = state;
  switch (action.type) {
    case 'GIVE_POINT':
      new_state.points += action.points
      return Object.assign({}, new_state)
    case 'SELECT_SIMPLE_BOMB':
      new_state.simpleBomb = !new_state.simpleBomb
      return Object.assign({}, new_state)
    case 'SELECT_MEGA_BOMB':
      new_state.megaBomb = !new_state.megaBomb
      return Object.assign({}, new_state)
    default:
      return state;
  }
}

export default powers
