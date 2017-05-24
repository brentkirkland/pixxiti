var initial_state = {
  points: parseInt(localStorage['myKey'], 10) || 0,
  simpleBomb: false,
  megaBomb: false,
  bot: false,
  botArray: [],
  botI: undefined,
  botJ: undefined,
  placeI: undefined,
  placeJ: undefined,
  botArrayText: '',
  botStatus: 'waiting',
  botError: '',
  placed: false
}

const powers = (state = initial_state, action) => {
  var new_state = state;
  switch (action.type) {
    case 'GIVE_POINT':
      new_state.points += action.points
      new_state.placed = !new_state.placed
      localStorage['myKey'] = parseInt(localStorage['myKey'], 10) + action.points
      return Object.assign({}, new_state)
    case 'SELECT_SIMPLE_BOMB':
      new_state.simpleBomb = !new_state.simpleBomb
      return Object.assign({}, new_state)
    case 'SELECT_MEGA_BOMB':
      new_state.megaBomb = !new_state.megaBomb
      return Object.assign({}, new_state)
    case 'ACTIVATE_BOT':
      new_state.botStatus = 'activating'
      return Object.assign({}, new_state)
    case 'UPDATE_BOT_I':
      new_state.botI = action.payload
      return Object.assign({}, new_state)
    case 'UPDATE_BOT_J':
      new_state.botJ = action.payload
      return Object.assign({}, new_state)
    case 'UPDATE_BOT_ARRAY_TEXT':
      new_state.botArrayText = action.payload
      return Object.assign({}, new_state)
    case 'BOT_ERROR':
      new_state.botError = action.payload
      return Object.assign({}, new_state)
    case 'UPDATE_PLACE':
      if (action.bot) {
        var points = 0;
        for (var i = 0; i < new_state.botArray.length; i++) {
          for (var j = 0; j < new_state.botArray[i].length; j++) {
            points += 1
          }
        }
        if (action.i === 69) {
            new_state.points += points
        }
        new_state.botStatus = 'waiting'
        new_state.bot = false
        new_state.botArray = []
        new_state.botArrayText = ''
        new_state.botI = undefined
        new_state.botJ = undefined
        new_state.placeI = undefined
        new_state.placeJ = undefined
        new_state.botError = ''
      } else {
        new_state.placeI = action.i
        new_state.placeJ = action.j
      }
      return Object.assign({}, new_state)
    case 'START_BOT':
      new_state.botArray = action.payload
      new_state.botError = ''
      new_state.botStatus = 'active'
      new_state.bot = true
      console.log('hi', new_state, action.payload)
      return Object.assign({}, new_state)
    case 'DEACTIVATE_BOT':
      new_state.botStatus = 'waiting'
      new_state.bot = false
      new_state.botArray = []
      new_state.botArrayText = ''
      new_state.botI = undefined
      new_state.botJ = undefined
      new_state.placeI = undefined
      new_state.placeJ = undefined
      new_state.botError = ''
      return Object.assign({}, new_state)
    default:
      return state;
  }
}

export default powers
